import axios from "axios";

const deleteIds = async (ids: string[]) => {
  try {
   const response =  await axios.delete("https://scandi.onrender.com/api/deleteProduct", {
      data: ids,
    });
    return response.status
} catch (error) {
    console.log(error);
  }
};

export default deleteIds;
