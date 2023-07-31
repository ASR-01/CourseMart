import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>
);
