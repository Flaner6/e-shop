import { Container } from "@mui/material";
import { WelcomePage } from "@/components";

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <WelcomePage />
    </Container>
  );
}
