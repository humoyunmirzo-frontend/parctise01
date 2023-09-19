import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { Footer } from "../components";

const OrderPage = () => {
  const id = useParams();
  console.log(id);

  return (
    <>
      <Container></Container>
      <Footer />
    </>
  );
};

export default OrderPage;
