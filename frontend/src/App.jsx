import { Fragment } from "react";
import RouterApp from "./routes";
import Global from "./styles/Global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContextProvider } from "./context/AppContext";
import { LoadingProvider } from "./context/LoadingContext";

function App() {
  return (
    <Fragment>
      <AppContextProvider>
        <LoadingProvider>
          <RouterApp />
        </LoadingProvider>
      </AppContextProvider>
      <Global />
      <ToastContainer />
    </Fragment>
  );
}

export default App;
