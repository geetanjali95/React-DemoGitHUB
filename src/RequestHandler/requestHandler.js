import axios from 'axios';
 
export default axios.create({
    baseURL: 'https://api.github.com/search',
    headers: {
            "Access-Control-Allow-Origin": "*" ,
            crossOrigin: true,
            "Content-Type": 'application/json;charset=utf-8'
    }
});
