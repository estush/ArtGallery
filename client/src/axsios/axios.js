import axios from 'axios';

// יצירת אינסטנסיה אחת של axios עם baseURL
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5000', // דאג להגדיר משתנה סביבה עבור ה-URL
});

export default axiosInstance;
