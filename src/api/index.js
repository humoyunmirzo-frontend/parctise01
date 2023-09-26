import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "https://api.airbnb.tw1.su";
export const DataFetching = {
  async getRoomsData() {
    try {
      const categorys = await axios.get(`${BASE_URL}/rooms/facilities`);
      const { data } = await axios.get(`${BASE_URL}/rooms`);
      return {
        data: data.results,
        category: categorys.data.results,
        success: true,
      };
    } catch (error) {
      console.log(error);
      return { data: [], success: false };
    }
  },

  async getRoomsRead(slug) {
    try {
      const { data } = await axios.get(`${BASE_URL}/rooms/${slug}`);
      return { data, success: true };
    } catch (error) {
      console.log(error);
      return { data: {}, success: false };
    }
  },

  async authVerify(body) {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/users/send/verification-code/`,
        body
      );
      return { data, success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  },

  async authRegister(body) {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/users/auth/register/`,
        body
      );
      return { data, success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  },

  async verifyPhoneCode(body) {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/users/verify/phone-number/`,
        body
      );
      return { data, success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  },

  async getAuthToken(body) {
    try {
      const res = await axios.post(`${BASE_URL}/users/auth/token/`, body);
      return { res, success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  },

  async bookingRoom(body, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const { data } = await axios.post(
        `${BASE_URL}/bookings/create/`,
        body,
        config
      );

      return { data, success: true };
    } catch (error) {
      console.log(error);
      return { data: error.response.data.detail, success: false };
    }
  },
};
export const postBooking = async(body,token)=>{
  const config = {
    headers:{Authorization:`Bearer ${token}`},
  };
  try {
    const res = await axios.post(`${BASE_URL}/users/announcement-forms/`, 

    {
      fullname:body.fullName,
      resort_name:body.resortName,
      phone:body.phone,
      address: body.address,
      description: body.description
    }, 
    config 
    )
    return res.data
  } catch (error) {
  console.log(error);  
  }
}