import { Container } from "@mui/material";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Chat />
    </Container>
  );
}

export default App;
