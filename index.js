const functions = require('@google-cloud/functions-framework');
var axios = require('axios');

functions.http('hello',async (req, res) => {

  const host  = "https://sohanapp.azurewebsites.net";  
              
  const response = await axios.get(host +"/api/HttpTrigger1");
  // console.log("LOG :"+ (JSON.stringify(response.data)))

  console.log("LOG :"+ JSON.stringify(response.data, null, 3));
  res.setHeader('Access-Control-Allow-Origin','*').send(response.data);
});