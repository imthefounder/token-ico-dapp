import React, { useState, useEffect, useContext } from "react";
import {
  Footer,
  Brand,
  Header,
  Hero,
  Loader,
  Progress,
  ICODashboard,
  BackToTop,
  Popup,
  TransferToken,
  Owner,
  TransferCurrency,
  Donate,
  UpdatePrice,
  UpdateAddress,
} from "../Components/index";
import { TOKEN_ICO_Context } from "../context/index";
import { shortenAddress } from "../Utils/index";

const index = () => {
  const {
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
  } = useContext(TOKEN_ICO_Context);

  const [ownerModel, setOwnerModel] = useState(false);

  const [buyModel, setBuyModel] = useState(false);

  const [transferModel, setTransferModel] = useState(false);

  const [transferCurrency, setTransferCurrency] = useState(false);

  const [openDonate, setOpenDonate] = useState(false);

  const [openUpdatePrice, setOpenUpdatePrice] = useState(false);

  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);

  const [detail, setDetail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const items = await TOKEN_ICO();

      console.log(items);

      setDetail(items);
    };
    fetchData();
  }, [account]);

  return (
    <>
      <div className="body_wrap">
        {ownerModel && (
          <Owner
            setOwnerModel={setOwnerModel}
            currency={currency}
            detail={detail}
            account={account}
            setTransferModel={setTransferModel}
            setTransferCurrency={setTransferCurrency}
            setOpenDonate={setOpenDonate}
            TOKEN_WITHDRAW={TOKEN_WITHDRAW}
            setOpenUpdateAddress={setOpenUpdateAddress}
            setOpenUpdatePrice={setOpenUpdatePrice}
          />
        )}

        {buyModel && (
          <Popup
            setBuyModel={setBuyModel}
            BUY_TOKEN={BUY_TOKEN}
            currency={currency}
            detail={detail}
            account={account}
            ERC20={ERC20}
            TOKEN_ADDRESS={TOKEN_ADDRESS}
            setLoader={setLoader}
          />
        )}

        {transferModel && (
          <TransferToken
            setTransferModel={setTransferModel}
            TRANSFER_TOKEN={TRANSFER_TOKEN}
            ERC20={ERC20}
            setLoader={setLoader}
          />
        )}

        {transferCurrency && (
          <TransferCurrency
            setTransferCurrency={setTransferCurrency}
            TRANSFER_ETHER={TRANSFER_ETHER}
            detail={detail}
            currency={currency}
            CHECK_ACCOUNT_BALANCE={CHECK_ACCOUNT_BALANCE}
            setLoader={setLoader}
          />
        )}

        {openDonate && (
          <Donate
            setOpenDonate={setOpenDonate}
            detail={detail}
            currency={currency}
            DONATE={DONATE}
          />
        )}

        {openUpdatePrice && (
          <UpdatePrice
            setOpenUpdatePrice={setOpenUpdatePrice}
            detail={detail}
            currency={currency}
            UPDATE_TOKEN_PRICE={UPDATE_TOKEN_PRICE}
          />
        )}

        {openUpdateAddress && (
          <UpdateAddress
            setOpenUpdateAddress={setOpenUpdateAddress}
            detail={detail}
            currency={currency}
            UPDATE_TOKEN={UPDATE_TOKEN}
            ERC20={ERC20}
            setLoader={setLoader}
          />
        )}

        {loader && <Loader />}

        <Header
          account={account}
          CONNECT_WALLET={CONNECT_WALLET}
          setAccount={setAccount}
          setLoader={setLoader}
          setOwnerModel={setOwnerModel}
          shortenAddress={shortenAddress}
          detail={detail}
          currency={currency}
          ownerModel={setOwnerModel}
        />

        <Hero
          setBuyModel={setBuyModel}
          account={account}
          CONNECT_WALLET={CONNECT_WALLET}
          setAccount={setAccount}
          setLoader={setLoader}
          detail={detail}
          addTokenToMetamask={addTokenToMetamask}
        />

        <ICODashboard />

        <Footer />
        
        <BackToTop />
      </div>
    </>
  );
};

export default index;
