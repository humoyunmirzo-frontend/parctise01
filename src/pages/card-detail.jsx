import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Footer, Header } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DataFetching } from "../api";
import { useEffect, useState } from "react";

function srcset(image) {
  return {
    src: `${image}`,
    srcSet: `${image}`,
  };
}

export default function CardDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { data, success } = await DataFetching.getRoomsRead(id);
      if (success) {
        setItem(data);
        setIsLoading(!success);
      } else {
        navigate("/not-found");
      }
    };

    getData();
  }, [id]);

  console.log(item);

  return (
    <>
      <Header />
      {isLoading ? (
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          minHeight={"70vh"}
        >
          <CircularProgress color="error" />
        </Stack>
      ) : (
        <Container maxWidth="xl" sx={{ minHeight: "100vh", my: "20px" }}>
          <Typography
            variant="h5"
            sx={{ fontFamily: "inherit", fontWeight: "500" }}
          >
            Trophy | Dior Belle Maison Suite
          </Typography>
          <Stack direction={"row"} gap={"5px"} mt={"8px"}>
            <Typography sx={{ textDecoration: "underline", cursor: "pointer" }}>
              {Math.floor(Math.random() * 1000)} review
            </Typography>
            <Typography>•</Typography>
            <Typography sx={{ textDecoration: "underline", cursor: "pointer" }}>
              {item?.address}
            </Typography>
          </Stack>

          {/* Image Gallery */}
          <ImageList
            sx={{ width: "100%", mt: "20px", borderRadius: "20px" }}
            variant="quilted"
            cols={4}
            rowHeight={200}
          >
            {item?.photos?.slice(0, 5)?.map((item, i) => {
              item = {
                ...item,
                rows: i === 0 ? 2 : "",
                cols: i === 0 ? 2 : "",
              };
              return (
                <ImageListItem
                  key={item.title}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                >
                  <img
                    {...srcset(item.photo, 121, item.rows, item.cols)}
                    style={{ objectFit: "cover" }}
                    alt={item.title}
                    className="card-detail__image"
                    loading="lazy"
                  />
                </ImageListItem>
              );
            })}
          </ImageList>

          <Grid container spacing={4} mt={"20px"}>
            <Grid item sx={{ width: { sm: "100%", md: "70%" } }}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontFamily: "inherit", fontWeight: "500" }}
                  >
                    {item?.title}
                  </Typography>
                  <Typography sx={{ color: "gray" }}>
                    {item?.guests} guests
                  </Typography>
                  <Divider sx={{ my: "10px" }} />
                  <Typography sx={{ fontFamily: "inherit" }}>
                    {item?.description}
                  </Typography>
                </Box>
                {/* {item} */}
                <Avatar
                  alt={item && item?.facilities[0].name}
                  src={item && item?.facilities[0].icon}
                  sx={{ width: 56, height: 56 }}
                />
              </Stack>
            </Grid>
            <Grid item sx={{ flex: "1", maxWidth: "400px" }}>
              <Card
                sx={{
                  minWidth: "100%",
                  boxShadow: "rgba(0, 0, 0, 0.12) 0px 6px 16px",
                  border: "1px solid rgb(221, 221, 221)",
                  borderRadius: "12px",
                  p: "24px",
                }}
              >
                <CardContent sx={{ p: "0px" }}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography sx={{ fontSize: 14, color: "gray" }}>
                      <Typography
                        variant="span"
                        sx={{ fontSize: 26, color: "black !important" }}
                      >
                        ${item?.price}
                      </Typography>{" "}
                      night
                    </Typography>
                    <Typography
                      sx={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      1 review
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{ width: "100%" }}
                    mt={2}
                    direction={"row"}
                    gap={"10px"}
                  >
                    <DesktopDatePicker
                      sx={{ width: "50%" }}
                      defaultValue={dayjs(new Date(Date.now()))}
                    />
                    <DesktopDatePicker
                      sx={{ width: "50%" }}
                      defaultValue={dayjs(new Date(Date.now()))}
                    />
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: "0px" }} my={2}>
                  <Button
                    size="large"
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{
                      textTransform: "capitalize",
                      fontFamily: "inherit",
                      fontWeight: "500",
                    }}
                  >
                    Reserve
                  </Button>
                </CardActions>
                <CardContent sx={{ p: "0px" }}>
                  <Typography
                    variant="span"
                    sx={{ textAlign: "center" }}
                    mt={2}
                  >
                    You won't be charged yet
                  </Typography>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"10px"}
                    mt={2}
                  >
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Typography
                        sx={{
                          textDecoration: "underline",
                          cursor: "pointer",
                          color: "gray",
                        }}
                      >
                        ${item?.price} x3 nights
                      </Typography>
                      <Typography sx={{ color: "gray" }}>$877</Typography>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Typography
                        sx={{
                          textDecoration: "underline",
                          cursor: "pointer",
                          color: "gray",
                        }}
                      >
                        Cleaning fee
                      </Typography>
                      <Typography sx={{ color: "gray" }}>$70</Typography>
                    </Stack>
                    <Divider my={2} />
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Typography
                        sx={{
                          fontFamily: "inherit",
                          fontSize: "20px",
                          fontWeight: "600",
                        }}
                      >
                        Total before taxes
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "inherit",
                          fontSize: "20px",
                          fontWeight: "600",
                        }}
                      >
                        ${item?.price + 70}
                      </Typography>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}

      <Footer />
    </>
  );
}
