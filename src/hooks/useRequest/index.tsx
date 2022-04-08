import { useContext } from "react";
import { RequestContext } from "../../states/RequestProvider";

const useRequest = () => {
  const { requestDispatch } = useContext(RequestContext);

  return <ResultType,>(requestsWrapper: () => Promise<ResultType>) => {
    requestDispatch({ type: "SET_DEFAULT" });
    requestDispatch({ type: "SET_LOADING", payload: true });

    return requestsWrapper()
      .catch((error) =>
        requestDispatch({ type: "SET_ERROR", payload: { message: error.message, hasError: true } })
      )
      .finally(() => requestDispatch({ type: "SET_LOADING", payload: false }));
  };
};

export default useRequest;
