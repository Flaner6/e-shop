import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme";
import { Layout } from "@/components";
import { store } from "@/store/createStore";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
