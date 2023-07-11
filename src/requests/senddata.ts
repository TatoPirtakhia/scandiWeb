import axios from "axios";
import { Product } from "../types";

const sendData = async (data: any, type: string) => {
  try {
    const response = await axios.post(
      `https://scandi.onrender.com/api/product/${type}`,
      data
    );
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export default sendData;
