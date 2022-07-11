import axios from 'axios';

const baseURL = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;
console.log(baseURL);


const CHBackend = axios.create({
    // baseURL: "http://localhost:3001/api/v1",
    baseURL
});

export default CHBackend;
