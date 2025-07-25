import Note from "../models/Note.js"; 
export async function getAllNotes(req,res){
 try {
  const notes=await Note.find().sort({createdAt:-1});
  res.status(200).json(notes);
 } catch (error) {
  console.error("Error in getting Notes",error);
  res.status(500).json({message:"Server error"});
 }
};

export async function getNoteById(req,res){
  try {
    const note=await Note.findById(req.params.id);
    if(!note){
      res.status(404).json({message:"Note not found"});
    }
    res.status(200).json(note);
  } catch (error) {
  console.error("Error in getting Notes",error);
  res.status(500).json({message:"Server error"});
  }
};

export async function createNote(req,res){
  try {
    const{title,content}=req.body;
    const note=new Note({title:title,content:content});
    const savedNote=await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in note creating",error);
    res.status(500).json({message:"Server Error"});
  }
};
export async function updateNotes(req,res){
  try {
    const{title,content}=req.body;
   const updatedNote= await Note.findByIdAndUpdate(req.params.id,{title,content});
    if(!updatedNote) return res.status(404).json({message:"Note not found"})
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in note updating",error);
    res.status(500).json({message:"Server Error"});
  }
};

export async function deleteNotes(req,res){
 try {
  const deletedNote=await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote){
     return res.status(404).json({message:"Note not found"});
    } 
  res.status(200).json({message:"Note deleted Succesfully"});
 } catch (error) {
  console.error("Error in note Deleting",error);
  res.status(500).json({message:"Server error"});
 }
};