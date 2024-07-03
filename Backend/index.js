const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();
const dev=process.env.NODE_ENV||'development';
console.log(dev);

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception 💥');
  console.log(err.name);

  process.exit(1);
});
//const db_uri=process.env.MONGODB_URI || 
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('✅ Connected to database');
});
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection 💥');
  console.log(err.name, err.message);

  server.close(() => process.exit(1));
});