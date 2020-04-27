const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');


const {DATABASE_URL, PORT} = require('./config');
const {Chores}= require('./models');

const app = express();

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/', (req, res) => {
	res.json('hello world');
});

app.get('/:id', (req, res) => {
  Entry
    .find()
    .exec()
    .then(entries => {
      res.json(entries.map(entries => entries.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
    });
});

app.post('/new_chore/:id', (req, res) => {
console.log(req.body);
  const requiredFields = ['choreType', 'choreList'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      alert('You must include a "${field}"')
      res.status(400).json(
        {error: `Missing "${field}" in request body`}
        );
    }
 });

  Chores
    .create({
    	choreType: req.body.choreType,
        choreList: req.body.choreList
    })
    .then(entries => res.status(201).json(entries.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});

app.delete('/remove_chore/:id', (req, res) => {
  Entry
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(201).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});


app.put('/entries/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['teaName', 'date', 'vendor', 'teaColorTeaType', 'flavoredTeaType', 'creamAdditions', 'sugarAdditions', 'honeyAdditions', 'lemonAdditions', 'otherAdditions', 'aroma', 'taste', 'stars', 'notes'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Entry
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then(updatedEntry => res.status(201).json(updatedEntry.apiRepr()))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

app.get('/newentry', (req, res) => {
	res.json('hello world');
});

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};