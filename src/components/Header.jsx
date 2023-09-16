import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import {
  MenuItem,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Fade,
  Divider,
  Autocomplete,
} from "@mui/material";
import { BsSearch } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { countries, settings } from "../config";
import logo from "../assets/log.png";
import LazyLoad from "react-lazy-load";
import { Link } from "react-router-dom";
import ModalContent from "./Modal";

function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [country, setCountry] = useState({
    code: "UZ",
    label: "Uzbekistan",
    phone: "998",
  });
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setPhone(`+${country.phone} `);
    console.log("changed", country.phone);
  }, [country]);

  // const navigate = useNavigate();

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleModal = (bool) => setIsOpenModal(bool);

  const handlerChange = (e) => setPhone(`${e.target.value}`);

  const submitData = () => {
    if (!phone.length > 6) return;

    console.log(phone);
  };

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
            <Button
              variant="outlined"
              color="error"
              sx={{ textTransform: "capitalize" }}
              onClick={() => handleModal(true)}
            >
              Sign Up
            </Button>
            {/* Modal */}
            <ModalContent isOpen={isOpenModal} handleModal={handleModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { sm: "85%", md: "45%" },
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 2,
                  borderRadius: "8px",
                  maxHeight: "450px",
                  overflowY: "scroll",
                }}
              >
                <Typography
                  sx={{ fontFamily: "inherit", mb: "8px" }}
                  variant="h6"
                  align="center"
                >
                  Log in or sign up
                </Typography>
                <Divider />
                <Typography
                  variant="h5"
                  component={"h3"}
                  sx={{ fontFamily: "inherit", my: "8px", fontWeight: "500" }}
                >
                  Welcome to Airbnb
                </Typography>
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  mt={2}
                  gap={2}
                >
                  <Autocomplete
                    required
                    autoComplete="off"
                    onChange={(e, value) => setCountry(value)}
                    sx={{ width: "full" }}
                    options={countries}
                    autoHighlight
                    defaultValue={countries[countries.length - 16]}
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                          alt="Flag"
                        />
                        {option.label} ({option.code}) +{option.phone}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        value={`${country.label} (+${country.code})`}
                        {...params}
                        label="Country/Region"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  <TextField
                    required
                    type="tel"
                    pattern="[05]{2}[0-9]{8}"
                    label="Phone number"
                    variant="outlined"
                    value={phone}
                    onChange={handlerChange}
                    autoComplete="off"
                  />
                  <Typography variant="body2">
                    We’ll call or text you to confirm your number. Standard
                    message and data rates apply.<Link>Privacy Policy</Link>
                  </Typography>
                  <Button
                    onClick={submitData}
                    variant="contained"
                    color={"error"}
                    full
                    mt={1}
                  >
                    Submit
                  </Button>
                </Stack>
              </Box>
            </ModalContent>
            {/* Modal */}

            {/* <Tooltip title="Open settings">
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
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
