import axios from 'axios'

const instance = axios.create({
    baseUrl: "ws://localhost:3001",
});

export default instance
