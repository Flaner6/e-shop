import Head from "next/head";
import { Container } from "@mui/material";
import { WelcomePage } from "@/components";

export default function Home() {
  return (
    <>
      <Head>
        <title>E-Shop — Welcome</title>
        <meta name="description" content="Discover our amazing products and great deals." />
        <meta property="og:title" content="E-Shop — Welcome" />
        <meta property="og:description" content="Discover our amazing products and great deals." />
        <meta property="og:type" content="website" />
      </Head>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <WelcomePage />
      </Container>
    </>
  );
}
