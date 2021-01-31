import axios from 'axios';

export default axios.create({
    baseURL: "https://api-test.mymoneystory.co.uk",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Authorization": `Bearer ${localStorage.getItem("firebase_token")}`
  }
  });
   