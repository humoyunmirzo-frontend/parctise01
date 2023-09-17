import {
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
} from "@mui/material";
import { Header, Navbar, Footer, CardHero } from "../components";
import { useEffect, useState } from "react";
import { DataFetching } from "../api";
import { BsSearch } from "react-icons/bs";

export default function HomePage() {
  const [cardItem, setCardItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      const { data, success, category } = await DataFetching.getRoomsData();
      if (success) {
        setCardItem(data);
        setIsLoading(!success);
        setCategories(category);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Header>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            display: {
              xs: "none",
              md: "flex",
              "& fieldset": { border: "none" },
              "& .MuiFormLabel-root": {
                fontWeight: "500",
                fontFamily: "inherit",
              },
            },
            width: "20rem",
          }}
          size="small"
          InputLabelProps={{ shrink: false, disableUnderline: true }}
          placeholder="Search..."
          autoComplete="off"
          InputProps={{
            style: {
              border: "1px solid #ff385c",
              borderRadius: "20px",
            },
            endAdornment: (
              <InputAdornment>
                <IconButton style={{ background: "#ff385c" }}>
                  <BsSearch fontSize={"0.8rem"} color={"white"} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Header>
      <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
        <Navbar categories={categories} />
        {isLoading ? (
          <Grid container spacing={2} width={"100%"}>
            {[...Array(4)].map((_, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3} sx={{ pt: 0.5 }}>
                <Skeleton width={"100%"} height={250} />
                <Skeleton width="100%" />
                <Skeleton width="100%" />
                <Skeleton width="100%" />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2} mt={2}>
            {cardItem.map((item, i) => (
              <CardHero key={i} item={item} />
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  );
}
