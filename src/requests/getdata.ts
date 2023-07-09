import axios from 'axios'

const getData = async () =>{
    try {
        const response = await axios.get('https://scandi.onrender.com/api/getProducts')
        return response.data
    } catch (error) {
            console.log(error)
    }
}

export default getData