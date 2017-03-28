var mongoose = require('mongoose');
// create the schema
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: {type:String, require:true},
	email:{type:String, required: true, unique:true},
	phone:{type:Number, required:true},
	password:{type:String, required:true},
	shows:[]
},{timestamps:true});
// register the schema as a model
mongoose.model('User', UserSchema);


