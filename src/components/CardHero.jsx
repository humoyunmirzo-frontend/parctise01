import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import { TfiMoney } from "react-icons/tfi";
// Import css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/f0f0a291-65a9-442b-9036-45b7e5e25676.jpeg?im_w=720",
  "https://a0.muscache.com/im/pictures/47a239d9-3739-4f32-ae97-3c706ec23d7e.jpg?im_w=720",
  "https://a0.muscache.com/im/pictures/1e6f26f0-8354-4da9-91a5-43bb16954e08.jpg?im_w=720",
  "https://a0.muscache.com/im/pictures/miso/Hosting-848521969968742794/original/342ce6b8-6ccd-49c1-bc59-6d55ddd6ecdd.jpeg?im_w=720",
];

export default function CardHero() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Grid item xs={12} md={4} lg={3}>
      <Card
        sx={{
          maxWidth: "100%",
          boxShadow: "none !important",
          borderRadius: "1rem",
        }}
      >
        <Slider {...settings}>
          {[...Array(4)].map((_, i) => (
            <CardMedia
              key={i}
              component="img"
              height="250"
              image={images[i]}
              alt="Slide Item"
            />
          ))}
        </Slider>
        <CardContent>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              sx={{ fontFamily: "inherit", fontSize: "18px" }}
              gutterBottom
              variant="h6"
              component="h2"
            >
              Swiss
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center", gap: "3px" }}
              variant="span"
              component="span"
              fontWeight={"500"}
            >
              <AiFillStar /> 3.3
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="body1" color="text.secondary">
              Lizards are a widespread
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center", gap: "3px" }}
              variant="span"
              component="span"
              fontWeight={"500"}
            >
              $500 night
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
