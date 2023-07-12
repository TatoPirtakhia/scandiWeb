import axios from "axios";

const sendData = async (data: any, type: string) => {
  try {
    const response = await axios.post(
      `https://scandweb-api-production.up.railway.app/api/product/${type}`,
      data
    );
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export default sendData;
