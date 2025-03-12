import React from "react";
import ReactDOM from "react-dom/client";

import { ApolloProvider } from '@apollo/client'


import App from "./App.jsx";
import DBCLient from './DBClient'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={DBCLient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
