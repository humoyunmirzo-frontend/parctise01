import React, { useState } from "react";
import { Footer, Header } from "../components";
import { Alert, Box, Button, Container, Snackbar, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { postBooking } from "../api";
import { useSelector } from "react-redux";
export default function CreateAdvertPage() {
  const auth = useSelector(({ authSlice }) => authSlice.user);
  const {register, reset, handleSubmit, formState:{errors}} = useForm()
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
};
const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
};
  const createAdvertisement = (data)=>{
    postBooking(data, auth.access)
    reset()
    handleClick()
  }
  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "12px",
            py: "60px",
          }}
          component="form"
          onSubmit={handleSubmit(createAdvertisement)}
        >
           <TextField
          sx={{minWidth:"50%"}}
          id="outlined-basic"
            label="Full name"
            variant="outlined"
            {...register("fullName",{required:"Required", minLength:1, maxLength:255})}
            error={errors.fullName}
          />
          <TextField
          sx={{minWidth:"50%"}}
          id="outlined-basic"
            label="Resort name"
            variant="outlined"
            {...register("resortName",{required:"Required", minLength:1, maxLength:255})}
            error={errors.resortName}
          />
          <TextField
          sx={{minWidth:"50%"}}
           id="outlined-basic"
           placeholder="+998"
           label="Phone"
           variant="outlined"
          {...register("phone",{required:"Required", minLength:1, maxLength:15})}
          error={errors.phone}
           />
          <TextField
          sx={{minWidth:"50%"}}
           id="outlined-basic"
           label="Address"
           variant="outlined"
          {...register("address",{required:"Required", minLength:1, maxLength:255})}
          error={errors.address}
           />
          <TextField
          sx={{minWidth:"50%"}}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={10} 
            variant="outlined"
            {...register("description")}
          />
          <Button type="submit" sx={{textTransform:"none"}} variant="contained" color="error">Set advertisemenet</Button>
        </Box> 
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity="error" sx={{ bgcolor: "#f44", color: "black" }}>Created successfully!</Alert>
            </Snackbar>
      </Container>
      <Footer />
    </>
  );
}
