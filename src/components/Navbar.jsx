import { Box, IconButton, Stack, Typography } from "@mui/material";
import { LiaHotelSolid } from "react-icons/lia";

export default function Navbar() {
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
        px: "8px",
        // scroll style
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "0.2rem",
          height: "2px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ff385c",
          borderRadius: "8px",
        },
      }}
    >
      {[...Array(20)].map((_, i) => (
        <Box
          className={`${i === 0 ? "active" : ""} icon-navbar_wrapper`}
          key={i}
          sx={{
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            color: "#bababa",
            "&:hover": { borderBottom: "2px solid #ff385c", color: "#000" },
            height: "60px",
          }}
        >
          <IconButton disableElevation disableRipple sx={{ p: "5px" }}>
            <LiaHotelSolid className="icon-navbar" />
          </IconButton>
          <Typography sx={{ fontWeight: "400", fontFamily: "inherit" }}>
            Hotel
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}
