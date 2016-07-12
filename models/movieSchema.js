var mongoose = require('mongoose');
var movieDetails = mongoose.Schema(
  {
    name:String,
    year:String
  }
);
module.exports=mongoose.model("movieInfo",movieDetails);
