import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { autorun } from "mobx";

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}
