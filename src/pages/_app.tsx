import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "@/theme";
import { Layout } from "@/components";
import { wrapper } from "@/store/createStore";

export default function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
