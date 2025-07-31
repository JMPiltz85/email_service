const app = require('./api/app');
const port = process.env.PORT || 5000;

//const serverless = require('serverless-http');

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 

/* if (require.main === module) {

  app.listen(port, () => {
    console.log(`Local server running on port ${port}`);
  });
}
else{
  module.exports.handler = serverless(app);
} */


