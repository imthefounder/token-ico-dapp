import React from "react";
import { Header } from "../Components";
import UglyUnicornsMint from "../Components/UglyUnicornsMint";
import { TOKEN_ICO_Context } from "../context/index";
import { shortenAddress } from "../Utils/index";
import BackToTop from "../Components/BackToTop";

const UnicornsMintPage = () => {
  const {
    account,
    CONNECT_WALLET,
    setAccount,
    setLoader,
    detail,
    currency,
    setOwnerModel,
  } = React.useContext(TOKEN_ICO_Context);

  return (
    <div className="body_wrap">
      <Header
        account={account}
        CONNECT_WALLET={CONNECT_WALLET}
        setAccount={setAccount}
        setLoader={setLoader}
        setOwnerModel={setOwnerModel}
        shortenAddress={shortenAddress}
        detail={detail}
        currency={currency}
      />
      <UglyUnicornsMint
        account={account}
        CONNECT_WALLET={CONNECT_WALLET}
        setAccount={setAccount}
        setLoader={setLoader}
        shortenAddress={shortenAddress}
      />
      <BackToTop />
    </div>
  );
};

export default UnicornsMintPage;