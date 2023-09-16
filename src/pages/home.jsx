import { Container, Grid } from "@mui/material";
import { Header, Navbar, Footer, CardHero } from "../components";

export default function HomePage() {
  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
        <Navbar />
        <Grid container spacing={2} mt={2}>
          {[...Array(12)].map((_, i) => (
            <CardHero key={i} />
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
