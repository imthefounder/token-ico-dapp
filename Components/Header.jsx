import React, { useState, useEffect } from "react";

const Header = ({
  account,
  CONNECT_WALLET,
  setAccount,
  setLoader,
  setOwnerModel,
  shortenAddress,
  detail,
  currency,
  ownerModel,
}) => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetamaskInstalled(true);

      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    setAccount(accounts[0]);
  };

  const connectMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Metamask is not installed");
    }
  };

  return <div>Header</div>;
};

export default Header;
