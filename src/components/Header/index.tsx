import { useContext } from "react";
import { UserContext } from "../../states/UserProvider";
import { Message } from "../Message";
import { Navigation } from "../Navigation";

export const Header = () => {
  const { userState } = useContext(UserContext);

  const renderUserName = () => {
    return userState.tokenData ? (
      <Message variant="info">Olá, {userState.tokenData?.userName}!</Message>
    ) : null;
  };

  return (
    <header className="flex items-center justify-between px-10 py-6 bg-gray-200">
      <div className="flex items-center space-x-2">
        <img
          className="h-full w-28"
          src="https://rarolabs.com.br/assets/logo-cae9beb1976500005b5e29dea19bdaa2761082232703a16beb71ffd2117014e5.png"
          alt="Workflow"
        />
      </div>
      <div className="flex items-baseline space-x-16">
        {renderUserName()}
        <nav className="flex items-center space-x-8 font-bold text-raro-blue">
          <Navigation />
        </nav>
      </div>
    </header>
  );
};
