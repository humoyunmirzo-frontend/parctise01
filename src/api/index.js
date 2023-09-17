import axios from "axios";

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
  async authRegister(data) {
    try {
      const res = await axios.post(`${BASE_URL}/users/auth/register`, data);
      console.log(res);
      // return { data, success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  },
};
