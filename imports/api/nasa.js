import axios from 'axios';
import { API_KEY } from '/consts';

export const getSpaceImage = async() => {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
    return response.data;
}