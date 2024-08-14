const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String},
    gender:{type:String},
    num_pages:{type:Number},
    editorial:{type:String},
    isbn:{type:String},
    year_edition:{type:Number},
    date_edition:{type:Date},
    writer:{type:String},
    image:{type:String},
    tags:[String], // ObjectId String olarak gelecek
    category_ids:[{type:Schema.Types.ObjectId, ref:'Category'}] // ilişki
})

module.exports = mongoose.model('Book',BookSchema,'books');