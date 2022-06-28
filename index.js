const functions = require('@google-cloud/functions-framework');
var axios = require('axios');
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");


functions.http('hello',async (req, res) => {

  const { endpoint, key, databaseId, containerId } = config;
  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseId);
  const container = database.container(containerId);
  
   var response;

  if(req.method == "GET")
  {  console.log("CAME GET");
    const querySpec = { query: "SELECT * from c" };
    const { resources } = await container.items.query(querySpec).fetchAll();
    response = resources.map(({id, form , _ts}) => ({id, form , _ts}))
    response.forEach(item => {
      console.log(item.id + " " + item._ts + "\n" + JSON.stringify(item.form,null,3));
    });
   
  }
  else if(req.method == "POST")
  {
    console.log("CAME POST");
    var gh = req.body
    console.log("11"+JSON.stringify(gh));
     await container.items.create(gh)
    response = "POST DONE";
    // console.log("22"+ JSON.stringify(response));
  }else if(req.method == "OPTIONS")
  {
    console.log("CAME OPTIONS");
  }else console.log("CAME OTHER")




  

  // console.log(`Querying container: Items1`);
  // console.log(`Querying container: Items2`);
  // console.log(`Querying container: Items3`);

  // const host  = "https://sohanapp.azurewebsites.net/api/HttpTrigger1";   
  // const response = null;
  
  // if(req.method == "GET")
  // response = await axios.get(host);
  // else
  // response = await axios.post(host,req.body);


  // console.log("LOG :"+ JSON.stringify(response.data, null, 3));
  res.set('Access-Control-Allow-Origin','*');
  res.set('Access-Control-Allow-Private-Network','true');
  res.set('Access-Control-Allow-Headers','access-control-request-private-network, content-type');
  res.set('Access-Control-Allow-Methods','POST, GET, OPTIONS,PUT,HEAD');
  res.set('Content-Type' , 'application/json');
  res.send(response);
  // res.send("Check logs");
});