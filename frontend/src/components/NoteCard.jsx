import React from 'react'
import { Link } from 'react-router';
import { PenSquareIcon } from 'lucide-react';
import toast from "react-hot-toast"
import { Trash2Icon } from 'lucide-react';
import { formatDate } from '../libs/utils.js';
import api from "../libs/axios.js"

const NoteCard = ({note,setNotes}) => {

  const handleDelete=async(e,id)=>{
    e.preventDefault();
     if (!id) {
    toast.error("Note ID is missing!");
    return;
  }
    if(!window.confirm("Are you sure you want to delete!"))return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev)=>prev.filter(note =>note._id !==id))
      toast.success("Note Deleted Successfully!");
    } catch (error) {
      console.log("Error in handleDelete",error);
      toast.error("Error in Note Delete");
    }
  }
  return (
    <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200
    border-t-4 border-solid border-[#ed4e98]'>

    <div className='card-body'>
      <h3 className='card-title text-base-content'>{note.title}</h3>
      <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
      <div className='card-actions justify-between items-center mt-4 '>
        <span className='text-small text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
        <div className='flex items-center gap-1'>
          <PenSquareIcon className='size-4'/>
          <button className='btn btn-ghost btn-xs text-error' onClick={(e)=>handleDelete(e,note._id)}>
            <Trash2Icon className='size-4'/>
          </button>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default NoteCard;
