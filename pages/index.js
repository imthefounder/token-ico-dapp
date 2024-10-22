import React, { useState, useEffect, useContext } from "react";
import {
  Footer,
  Brand,
  Header,
  About,
  Contact,
  Faq,
  Features,
  Hero,
  Loader,
  Progress,
  SideBar,
  Team,
  Token,
  TokenInfo,
  Roadmap,
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

  return <div>@Ha$hCodes</div>;
};

export default index;
