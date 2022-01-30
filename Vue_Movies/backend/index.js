const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

app.use(bodyParser.json());

app.get('/movies', (req, res) => {
  
  let movies = fs.readFile('./Vuejs_Movies.json', (err, jsonString) =>{
      if(err){
          console.log("error reading file", err);
          return;
      }
      try{
          let moviesList = JSON.parse(jsonString);
          res.json(moviesList);
      } catch(err){
          console.log(err);
      }
  });
});


app.post('/movies', (req, res) =>{
    console.log(req.body);
    let movies = fs.readFile('./Vuejs_Movies.json', (err, jsonString) =>{
        if(err){
            console.log("error reading file", err);
            return;
        }
        try{
            let moviesList = JSON.parse(jsonString);
            moviesList.push(req.body);
            fs.writeFile('./Vuejs_Movies.json', JSON.stringify(moviesList), err =>{
                if(err) console.log(err);
                else{
                    console.log('super');
                }
            });
            res.send("moviesList updated!");
        } catch(err){
            console.log(err);
        }
    });
});

app.put("/movies/:id", (req, res) =>{
    console.log(req.body);
    let movies = fs.readFile('./Vuejs_Movies.json', (err, jsonString) =>{
        if(err){
            console.log(err);
            return;
        }
        try{
            let moviesList = JSON.parse(jsonString);
            let movie = moviesList.findIndex(element => element.id == req.params.id);
            if(movie != -1){
                moviesList[movie] = req.body;
                fs.writeFile('./Vuejs_Movies.json', JSON.stringify(moviesList), err =>{
                    if(err) console.log(err);
                    else{
                        res.send('modifié!');
                    }
                });
            }else{
                res.send("ce film n'existe pas!")
            }
        }
        catch(err){
            console.log(err);
        }
    });
});

app.delete('/movies/:id', (req, res) =>{
    let movies = fs.readFile('./Vuejs_Movies.json', (err, jsonString) =>{
        if(err){
            console.log(err);
            return;
        }
        try{
            let moviesList = JSON.parse(jsonString);
            let movie = moviesList.findIndex(element => element.id == req.params.id);
            if(movie == -1){
                res.send('ce film n\'existe pas');
            }else{
                moviesList.splice(movie, 1);
            }
            fs.writeFile('./Vuejs_Movies.json', JSON.stringify(moviesList), err =>{
                if(err) console.log(err);
                else{
                    res.send('film supprimé!');
                }
            });
        }
        catch(err){
            console.log(err);
        }
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});