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
        overflowX: "scroll",
        "&::-webkit-scrollbar": {
          height: "2px",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ff385c",
        },
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
