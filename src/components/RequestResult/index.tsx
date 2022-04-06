import { FC, useContext } from "react";
import { RequestContext } from "../../states/RequestProvider";
import { Message } from "../Message";

export const RequestResult: FC = ({ children }) => {
  const { requestState } = useContext(RequestContext);

  const renderInfo = () => {
    if (requestState.loading) {
      return <Message variant="info">Carregando...</Message>;
    }

    if (requestState.error.hasError) {
      return <Message variant="error">{requestState.error.message}</Message>;
    }

    return null;
  };

  return (
    <>
      {children}
      {renderInfo()}
    </>
  );
};
