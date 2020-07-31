const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.DATABASEUSER}:${process.env.DATABASEPASSWORD}@project-4.7i99n.azure.mongodb.net/${process.env.DATABASECOLLECTION}?retryWrites=true&w=majority`, {
  //these options disable warnings
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// shortcut to mongoose.connection object
const db = mongoose.connection;
	
db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});