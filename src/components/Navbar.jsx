import { Box, Stack, Typography } from "@mui/material";
import LazyLoad from "react-lazy-load";

export default function Navbar({ categories }) {
  return (
    <Stack
      direction={"row"}
      gap={4}
      sx={{
        position: "sticky",
        top: "8vh",
        zIndex: "99",
        pt: "30px",
        pb: "10px",
        background: "white",
      }}
    >
      {categories?.map((item, i) => (
        <Box
          key={i}
          className={`icon-navbar_wrapper`}
          sx={{
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            color: "#bababa",
            "&:hover": { borderBottom: "2px solid #ff385c", color: "#000" },
            height: "80px",
            width: "100px",
          }}
        >
          <LazyLoad
            height={150}
            width={150}
            threshold={0.95}
            onContentVisible={() => {
              console.log("loaded!");
            }}
            className="logo-header__wrapper"
          >
            <img src={item.icon} alt="Logo" className="logo-header" />
          </LazyLoad>
          <Typography
            sx={{
              fontWeight: "400",
              fontFamily: "inherit",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {item.name}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}
