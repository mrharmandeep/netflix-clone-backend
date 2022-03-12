const mongoose = require('mongoose');
const { Schema } = mongoose;
const MovieSchema = new Schema({
    title:String,
    cast:Array,
    imdb:Object,
    directors:Array,
    plot:String,
    
});

module.exports={
    MovieSchema
};