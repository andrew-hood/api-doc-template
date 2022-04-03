import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ModalProvider } from "react-modal-hook";
import { globalCSS, NotificationContainer } from "@go1d/go1d";
import store from "src/store";
import { Provider } from "react-redux";
import { ErrorModal } from "src/components/features/Errors";

globalCSS();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ModalProvider>
        <Component {...pageProps} />
        <NotificationContainer />
        <ErrorModal />
      </ModalProvider>
    </Provider>
  );
}

export default MyApp;
