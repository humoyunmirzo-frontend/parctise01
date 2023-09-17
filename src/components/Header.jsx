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
  Stack,
  TextField,
  Divider,
  Autocomplete,
} from "@mui/material";
import { countries, settings } from "../config";
import logo from "../assets/log.png";
import LazyLoad from "react-lazy-load";
import { Link } from "react-router-dom";
import ModalContent from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "../redux/auth-slice";
import { DataFetching } from "../api";

function Header({ children }) {
  const auth = useSelector(({ authSlice }) => authSlice.user);
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [country, setCountry] = useState({
    code: "UZ",
    label: "Uzbekistan",
    phone: "998",
  });
  const [phone, setPhone] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  useEffect(() => setPhone(`+${country.phone} `), [country]);

  // const navigate = useNavigate();

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = (e) => {
    if (e.target.innerHTML === "Logout") {
      dispatch(removeUser());
    }
  };

  const handleModal = (bool) => setIsOpenModal(bool);
  const handleModal_2 = (bool) => setConfirmationModal(bool);

  const handlerChange = (e) => setPhone(`${e.target.value}`);

  const submitData = async () => {
    if (phone.length > 6 && firstname.length && lastname.length) {
      setConfirmationModal(true);
      await DataFetching.authRegister({
        first_name: firstname,
        last_name: lastname,
        phone_number: phone.replace(/\s/g, ""),
      });
    }
  };

  const getCode = () => {
    if (confirmationCode) {
      dispatch(setUser({ phone, firstname, lastname }));
      setConfirmationModal(false);
      setConfirmationCode("");
      setFirstname("");
      setLastname("");
      setIsOpenModal(false);
      setPhone(`+${country.phone} `);
    }
  };

  console.log(auth);

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
              <Link style={{ color: "inherit", textDecoration: "none" }} to="/">
                airbnb
              </Link>
            </Typography>
          </Stack>

          <>{children}</>

          <Box>
            {auth ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCzxivJXCZk0Kk8HsHujTO3Olx0ngytPrWw&usqp=CAU"
                    />
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
              </>
            ) : (
              <Button
                variant="outlined"
                color="error"
                sx={{ textTransform: "capitalize" }}
                onClick={() => handleModal(true)}
              >
                Sign Up
              </Button>
            )}
          </Box>
        </Toolbar>
        {/* Modal Register */}
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
              <Stack direction={{ sm: "column", md: "row" }} gap={2}>
                <TextField
                  label="Firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  variant="outlined"
                  sx={{ width: "50%" }}
                />
                <TextField
                  label="Lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  variant="outlined"
                  sx={{ width: "50%" }}
                />
              </Stack>
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
                We’ll call or text you to confirm your number. Standard message
                and data rates apply.<Link>Privacy Policy</Link>
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
        {/* Modal Register */}
        {/* Modal Con */}
        <ModalContent isOpen={confirmationModal} handleModal={handleModal_2}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { sm: "35%", md: "25%" },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 1,
              borderRadius: "8px",
              maxHeight: "450px",
              zIndex: "1000",
            }}
          >
            <Typography
              sx={{ fontFamily: "inherit", mb: "8px" }}
              variant="h6"
              align="center"
            >
              Confirm your number
            </Typography>

            <Stack
              direction={"column"}
              justifyContent={"center"}
              mt={2}
              gap={2}
            >
              <TextField
                pattern="[05]{2}[0-9]{8}"
                label="Code"
                variant="outlined"
                autoComplete="off"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={getCode}
                color={"error"}
                full
                mt={1}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </ModalContent>
        {/* Modal Con */}
      </Container>
    </AppBar>
  );
}
export default Header;
