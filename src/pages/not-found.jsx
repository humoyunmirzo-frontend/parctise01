import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Footer, Header } from "../components";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "85vh",
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography
                variant="h1"
                sx={{ color: "#ff385c", fontWeight: "bold" }}
              >
                404
              </Typography>
              <Typography variant="h6">
                The page you’re looking for doesn’t exist.
              </Typography>
              <Link to={"/"}>Back Home</Link>
            </Grid>
            <Grid xs={6}>
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt=""
                width={500}
                height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
        maxWidth={"xl"}
      >
        <Footer />
      </Container>
    </>
  );
}
