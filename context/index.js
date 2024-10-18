import React, { Children, useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import {
  CHECK_CONNECTED_WALLET,
  CONNECT_WALLET,
  GET_BALANCE,
  CHECK_ACCOUNT_BALANCE,
  TOKEN_ICO_CONTRACT,
  ERC20,
  ERC20_CONTRACT,
  TOKEN_ADDRESS,
  addTokenToMetamask,
} from "./constants";

export const TOKEN_ICO_Context = React.createContext();

export const TOKEN_ICO_Provider = ({ children }) => {
  const DAPP_NAME = "TOKEN ICO DAPP";

  const currency = "ETH";

  const network = "Holesky";

  const [loader, setLoader] = useState(false);

  const [account, setAccount] = useState();

  const [count, setcount] = useState(0);

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });

  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  //---CONTRACT FUNCTIONS---

  const TOKEN_ICO = async () => {
    try {
      const address = await CHECK_CONNECTED_WALLET();

      if (address) {
        setLoader(true);

        setAccount(address);

        const contract = await TOKEN_ICO_CONTRACT();

        const tokenDetails = await contract.getTokenDetails();

        const contractOwner = await contract.owner();

        const soldTokens = await contract.soldTokens();

        const ethBal = await GET_BALANCE();

        const token = {
          tokenBal: ethers.utils.formatEther(tokenDetails.balance.toString()),
          name: tokenDetails.name,
          symbol: tokenDetails.symbol,
          supply: ethers.utils.formatEther(tokenDetails.supply.toString()),
          tokenPrice: ethers.utils.formatEther(
            tokenDetails.tokenPrice.toString()
          ),
          tokenAddr: tokenDetails.tokenAddr,
          maticBal: ethBal,
          address: address.toLowerCase(),
          owner: owner.toLowerCase(),
          soldTokens: soldTokens.toNumber(),
        };

        setLoader(false);

        return token;
      }
    } catch (error) {
      console.log(error);

      notifyError("Error! Try again later");

      setLoader(false);
    }
  };

  const BUY_TOKEN = async (amount) => {
    try {
      setLoader(true);

      const address = await CHECK_CONNECTED_WALLET();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();

        const tokenDetails = await contract.getTokenDetails();

        const availableToken = ethers.utils.formatEther(
          tokenDetails.balance.toString()
        );

        if (availableToken > 1) {
          const price = ethers.utils.formatEther(
            tokenDetails.tokenPrice.toString()
          );

          const payAmount = ethers.utils.parseUnits(price.toString(), "ethers");

          const transcation = await contract.buytoken(Number(acount), {
            value: payAmount.toString(),
            gasLimit: ethers.utils.hexlify(8000000),
          });

          await transcation.wait();

          setLoader(false);

          notifySuccess("Transaction completed successfully");

          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);

      notifyError("Error! Try again later");

      setLoader(false);
    }
  };

  const TOKEN_WITHDRAW = async () => {
    try {
      setLoader(true);

      const address = await CHECK_CONNECTED_WALLET();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();

        const tokenDetails = await contract.getTokenDetails();

        const availableToken = ethers.utils.formatEther(
          tokenDetails.balance.toString()
        );

        if (availableToken > 1) {
          const transcation = await contract.withdrawAllTokens();

          await transcation.wait();

          setLoader(false);

          notifySuccess("Withdrawal completed successfully");

          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);

      notifyError("Error! Try again later");

      setLoader(false);
    }
  };

  const UPDATE_TOKEN = async (_address) => {
    try {
      setLoader(true);

      const address = await CHECK_CONNECTED_WALLET();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();

        const transcation = await contract.updateToken(_address);

        await transcation.wait();

        setLoader(false);

        notifySuccess("Update completed successfully");

        window.location.reload();
      }
    } catch (error) {
      console.log(error);

      notifyError("Error! Try again later");

      setLoader(false);
    }
  };

  const UPDATE_TOKEN_PRICE = async (price) => {
    try {
      setLoader(true);

      const address = await CHECK_CONNECTED_WALLET();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();

        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

        const transcation = await contract.updateTokenSalePrice(payAmount);

        await transcation.wait();

        setLoader(false);

        notifySuccess("Update completed successfully");

        window.location.reload();
      }
    } catch (error) {
      console.log(error);

      notifyError("Error! Try again later");

      setLoader(false);
    }
  };

  const DONATE = async (AMOUNT) => {
    try {
      setLoader(true);

      const address = await CHECK_CONNECTED_WALLET();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();

        const payAmount = ethers.utils.parseUnits(AMOUNT.toString(), "ether");

        const transcation = await contract.transferToOwner(payAmount, {
          value: payAmount.toString(),
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await transcation.wait();

        setLoader(false);

        notifySuccess("Donation completed successfully");

        window.location.reload();
      }
    } catch (error) {
      console.log(error);

      notifyError("Error! Try again later");

      setLoader(false);
    }
  };

  const TRANSFER_ETHER = async (transfer) => {
    try {
      setLoader(true);

      const { _receiver, _amount } = transfer;

      const address = await CHECK_CONNECTED_WALLET();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();

        const payAmount = ethers.utils.parseUnits(_amount.toString(), "ether");

        const transcation = await contract.transferEther(_receiver, payAmount, {
          value: payAmount.toString(),
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await transcation.wait();

        setLoader(false);

        notifySuccess("Transfer completed successfully");

        window.location.reload();
      }
    } catch (error) {
      console.log(error);

      notifyError("Error! Try again later");

      setLoader(false);
    }
  };

  const TRANSFER_TOKEN = async () => {
    try {
      setLoader(true);

      const { _tokenAddress, _sendTo, _amount } = transfer;

      const address = await CHECK_CONNECTED_WALLET();

      if (address) {
        const contract = await ERC20_CONTRACT(_tokenAddress);

        const payAmount = ethers.utils.parseUnits(_amount.toString(), "ether");

        const transcation = await contract.transfer(_sendTo, payAmount, {
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await transcation.wait();

        setLoader(false);

        notifySuccess("Transfer completed successfully");

        window.location.reload();
      }
    } catch (error) {
      console.log(error);

      notifyError("Error! Try again later");

      setLoader(false);
    }
  };

  return (
    <TOKEN_ICO_Context.Provider
      value={{
        TOKEN_ICO,
        BUY_TOKEN,
        TRANSFER_ETHER,
        DONATE,
        UPDATE_TOKEN,
        UPDATE_TOKEN_PRICE,
        TOKEN_WITHDRAW,
        TRANSFER_TOKEN,
        CONNECT_WALLET,
        ERC20,
        CHECK_ACCOUNT_BALANCE,
        setAccount,
        setLoader,
        addTokenToMetamask,
        TOKEN_ADDRESS,
        loader,
        account,
        currency,
      }}
    >
      {children}
    </TOKEN_ICO_Context.Provider>
  );
};
