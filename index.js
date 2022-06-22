const functions = require('@google-cloud/functions-framework');
var axios = require('axios');

functions.http('hello', (req, res) => {

  const host  = "https://sohanapp.azurewebsites.net";  
              
  const response =  axios.get(host +"/api/HttpTrigger1");
  console.log("LOG"+ response.data)


  res.send(response.data);
});