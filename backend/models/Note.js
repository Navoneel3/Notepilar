import mongoose from "mongoose";
//1.Create a Schema
//2.model based off of that schema

const noteSchema=new mongoose.Schema({ //1.
  title:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
},{timestamps:true}
);

const Note=mongoose.model("Note",noteSchema); //2.

export default Note;
