// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import OpenZeppelin contracts
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/IAccessControl.sol";
import "@openzeppelin/contracts/access/IAccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface INFTContract {
    function balanceOf(address _user) external view returns (uint256);
}

// MINCHYN Token Contract
// This is a modified version of the original MINCHYN token to work with ICO platform
contract MinchynToken is ERC20, ERC20Burnable, Ownable {
    using SafeMath for uint256;

    INFTContract public nftContract;

    uint256 public constant INITIAL_REWARD = 100 ether;
    uint256 public constant REWARD_RATE = 10 ether;
    uint256 public constant SECONDARY_REWARD_RATE = 5 ether;
    // Monday, April 1, 2032 0:00:00
    uint256 public constant REWARD_END = 1964390400;

    mapping(address => bool) controllers;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public lastUpdate;
    mapping(address => INFTContract) public secondaryContracts;
    address[] public secondaryContractsAddresses;

    event StandardClaimed(address indexed account, uint256 reward);
    event StandardSpent(address indexed account, uint256 amount);
    
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    // Role management mappings
    mapping(bytes32 => mapping(address => bool)) private _roles;
    mapping(bytes32 => bytes32) private _roleAdmins;

    constructor(
        string memory name,
        string memory symbol,
        address _nftContract,
        uint256 totalSupply_
    ) ERC20(name, symbol) {
        _mint(msg.sender, totalSupply_);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(BURNER_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
        setContract(_nftContract);
    }

    // Role management functions
    function _setupRole(bytes32 role, address account) internal {
        _roles[role][account] = true;
    }

    function hasRole(bytes32 role, address account) public view returns (bool) {
        return _roles[role][account];
    }

    function grantRole(bytes32 role, address account) public onlyOwner {
        _roles[role][account] = true;
    }

    function revokeRole(bytes32 role, address account) public onlyOwner {
        _roles[role][account] = false;
    }

    function setContract(address _contract) public onlyOwner {
        nftContract = INFTContract(_contract);
        _setupRole(BURNER_ROLE, _contract); 
    }

    function addSecondaryContract(address _contract) public onlyOwner {
        secondaryContracts[_contract] = INFTContract(_contract);
        secondaryContractsAddresses.push(_contract);
        _setupRole(BURNER_ROLE, _contract);
    }

    function removeSecondaryContract(address _contract) public onlyOwner {
        delete secondaryContracts[_contract];
        uint256 index = 0;
        while (secondaryContractsAddresses[index] != _contract) {
            index++;
        }
        secondaryContractsAddresses[index] = secondaryContractsAddresses[
            secondaryContractsAddresses.length - 1
        ];
        secondaryContractsAddresses.pop();
        _roles[BURNER_ROLE][_contract] = false;
    }

    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    function updateRewardOnMint(address _to, uint256 _amount) external {
        require(msg.sender == address(nftContract), "Not allowed");
        uint256 time = min(block.timestamp, REWARD_END);
        uint256 timerUser = lastUpdate[_to];
        if (timerUser > 0)
            rewards[_to] = rewards[_to].add(
                nftContract
                    .balanceOf(_to)
                    .mul(REWARD_RATE.mul((time.sub(timerUser))))
                    .div(86400)
                    .add(_amount.mul(INITIAL_REWARD))
            );
        else rewards[_to] = rewards[_to].add(_amount.mul(INITIAL_REWARD));
        lastUpdate[_to] = time;
    }

    function updateReward(address _from, address _to) external {
        require(
            msg.sender == address(nftContract) ||
                abi.encodePacked(secondaryContracts[msg.sender]).length > 0,
            "Invalid Contract"
        );
        uint256 time = min(block.timestamp, REWARD_END);
        if (_from != address(0)) {
            uint256 timerFrom = lastUpdate[_from];
            if (timerFrom > 0) {
                rewards[_from] += getPendingReward(_from);
            }
            lastUpdate[_from] = lastUpdate[_from] < REWARD_END
                ? time
                : REWARD_END;
        }

        if (_to != address(0)) {
            uint256 timerTo = lastUpdate[_to];
            if (timerTo > 0) {
                rewards[_to] += getPendingReward(_to);
            }
            lastUpdate[_to] = lastUpdate[_to] < REWARD_END ? time : REWARD_END;
        }
    }

    function getReward(address _to) external {
        require(msg.sender == address(nftContract), "Not allowed");
        uint256 reward = rewards[_to];
        if (reward > 0) {
            rewards[_to] = 0;
            _mint(_to, reward);
            emit StandardClaimed(_to, reward);
        }
    }

    function getTotalClaimable(address _account)
        external
        view
        returns (uint256)
    {
        return rewards[_account] + getPendingReward(_account);
    }

    function getPendingReward(address _account)
        internal
        view
        returns (uint256)
    {
        uint256 time = min(block.timestamp, REWARD_END);
        uint256 secondary = 0;
        if (secondaryContractsAddresses.length > 0) {
            for (uint256 i = 0; i < secondaryContractsAddresses.length; i++) {
                secondary = secondaryContracts[secondaryContractsAddresses[i]]
                    .balanceOf(_account)
                    .mul(
                        SECONDARY_REWARD_RATE.mul(
                            (time.sub(lastUpdate[_account]))
                        )
                    )
                    .div(86400)
                    .add(secondary);
            }
        }

        return
            nftContract
                .balanceOf(_account)
                .mul(REWARD_RATE.mul((time.sub(lastUpdate[_account]))))
                .div(86400)
                .add(secondary);
    }

    function mint(address to, uint256 amount) external {
        require(controllers[msg.sender] || hasRole(MINTER_ROLE, msg.sender), "Only controllers or minters can mint");
        _mint(to, amount);
    }

    function burn(uint256 value) public override {
        require(
            hasRole(BURNER_ROLE, msg.sender),
            "Must have burner role to burn"
        );
        super._burn(msg.sender, value);
    }

    function spend(address _from, uint256 _amount) external {
        require(
            hasRole(BURNER_ROLE, msg.sender),
            "Must have burner role to spend"
        );
        super.burnFrom(_from, _amount);
        emit StandardSpent(_from, _amount);
    }

    function addController(address controller) external onlyOwner {
        controllers[controller] = true;
    }

    function removeController(address controller) external onlyOwner {
        controllers[controller] = false;
    }

    // Override transfer functions to ensure compatibility
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
}