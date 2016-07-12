var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var bodyParser= require('body-parser');
var movieSchema= require('.././models/movieSchema');
var rqstify= require('requestify');

//Database Connection
//mongoose.connect('mongodb://localhost/movie');
//var db = mongoose.connection;


//Insert Database
router.post('/insert', function(request, response, next)
{
  rqstify.get('http://www.omdbapi.com/?t='+request.body.name+'&y=&plot=short&r=json').then(function(response1)
  {
    var movieSch=new movieSchema();
    movieSch.name=response1.getBody().Title;
    movieSch.year=response1.getBody().Year;
    movieSch.save(function(err)
    {
      if(err)
      {
        throw err;
      }
      response.send("Inserted Successfully")
    })
  });
});



//View Database
router.get('/view', function(request, response)
{
  //  db.on('error', console.error.bind('Error to fetch the Data'));
  //   db.open('open', function()
  //   {
  //   movieSchema.find({},function(error, data){
  //     response.send(data);
  //   });
  // });
  movieSchema.find(function (err, data){
    if (err) res.send(err);
    response.send(data)
  });
});



//Delete Database
router.delete('/delete', function(request, response, next)
{
  // db.on('error', console.error.bind('Error to fetch the Data'));
  //  db.open('open', function()

  movieSchema.remove({'name':request.body.name},function(error, data){
    response.send(data);

  });
});



//Update Database
router.put('/update', function(request, response)
{
  //db.on('error', console.error.bind('Error to fetch the Data'));
  //  db.open('open', function()


    if(request.body.update=='name')
    {
      movieSchema.update({'name':request.body.name},
      {$set:{'name':request.body.newval}},{multi:true}, function(err, data){
        if (err) throw err;

        response.send('updated');

      });
    }
    else if(request.body.update=='year')
    {
      movieSchema.update({'year':request.body.year},
      {$set:{'year':request.body.newval}},{multi:true}, function(err, data){
        if (err) throw err;
        response.send('updated');

      });
    }
  });

  module.exports = router;
