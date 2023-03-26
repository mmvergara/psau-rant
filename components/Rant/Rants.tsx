import { Container } from "@mui/material";
import Rant from "./Rant";

const Rants = () => {
  return (
    <Container maxWidth="md">
      <Rant />
      <Rant />
      <Rant />
    </Container>
  );
};

export default Rants;
