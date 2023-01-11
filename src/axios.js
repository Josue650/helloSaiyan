import axios from 'axios'

const instance = axios.create({
    baseUrl: "https://localhost:3001",
});

export default instance
