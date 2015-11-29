var mongoose = require('mongoose');

var ChirpSchema = new mongoose.Schema({
   name: String,
   body: String
});

mongoose.model('Chirp', ChirpSchema);
