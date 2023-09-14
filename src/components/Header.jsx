import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import { settings } from "../config";
import logo from "../assets/log.png";
import LazyLoad from "react-lazy-load";
import { Link } from "react-router-dom";

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const navigate = useNavigate();

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        top: "0",
        zIndex: "100",
        fontFamily: "inherit !important",
        minHeight: "10vh",
        background: "transparent",
        color: "black",
        borderBottom: "1px solid #e6e6e6",
        backgroundColor: "white",
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <LazyLoad
              height={150}
              width={150}
              threshold={0.95}
              onContentVisible={() => {
                console.log("loaded!");
              }}
              className="logo-header__wrapper"
            >
              <img src={logo} alt="Logo" className="logo-header" />
            </LazyLoad>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                display: { xs: "none", md: "flex" },
                fontWeight: "600",
                letterSpacing: "-1px",
                color: "#ff385c",
                fontSize: "24px",
              }}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                href="/"
              >
                airbnb
              </Link>
            </Typography>
          </Stack>

          <TextField
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

          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
