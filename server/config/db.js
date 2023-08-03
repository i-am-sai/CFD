const mongoose = require("mongoose")
require("dotenv").config()

const connection = mongoose.connect("mongodb+srv://User:<password>.zzzj550.mongodb.net/CFB?retryWrites=true&w=majority");

//mongoose.connect("mongodb://127.0.0.1:27017/Custom_Form_Builder", { useNewUrlParser: true });   // Connecting link to  mongodb

// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = { connection }