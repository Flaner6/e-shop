import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { Roboto } from "next/font/google";

import { theme } from "@/theme";
import { Layout } from "@/components";
import { wrapper } from "@/store/createStore";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className={roboto.variable}>
          <Layout>
            <Component {...props.pageProps} />
          </Layout>
        </div>
      </ThemeProvider>
    </Provider>
  );
}
