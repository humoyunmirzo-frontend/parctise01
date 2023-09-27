import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Box, Container, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getUserBookingList } from '../api';
import { useSelector } from 'react-redux';
export default function UserOrders() {
    const auth = useSelector(({ authSlice }) => authSlice.user);
  
      const columns = ["#","Name","Date in", "Date out","Total price"]
      const [bookingLists, setBookingLists] = useState([])
      useEffect(()=>{
        async function getData(){
            const data  = await getUserBookingList(auth.access)
            setBookingLists(data)
        }
        getData()
      },[])
        const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "red",
          color: theme.palette.common.white,
          fontSize:18
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:hover':{
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      const [searchValue, setSearchValue] = useState("")
  return (
    <>
    <Header/>
    <Container>
        <Box sx={{minHeight:"100vh", py:"60px"}}>
        <Box sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", mb:"32px"}}>
        <Typography component="h5" variant="h5">Your orders</Typography>
            <Typography>All orders: {bookingLists.length}</Typography>
            </Box>
            <TextField label="Search" onChange={(e)=> {
                setSearchValue(e.target.value.trim())
            }} sx={{maxWidth:"445px", mb:"32px"}}/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{bgcolor:"f44 !important", color:"white"}}>
          <TableRow>
            {
                columns.map((item,index)=>(
            <StyledTableCell key={index}>{item}</StyledTableCell>
                ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {bookingLists.length > -1 &&  bookingLists.filter(item=> item.room.toString().toLowerCase().includes(searchValue.toLowerCase().trim())).map((item,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{index+1}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item.room}
              </StyledTableCell>
              <StyledTableCell>{item.date_in}</StyledTableCell>
              <StyledTableCell>{item.date_out}</StyledTableCell>
              <StyledTableCell>${item.total_price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Container>
    <Footer/>
    </>
  )
}
