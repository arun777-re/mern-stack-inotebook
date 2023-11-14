import React, { useContext } from "react";
import { notecontext } from "../context/Context";

export default function NotesItem(props) {
  const { note,updateNote } = props;
  const context = useContext(notecontext);
  const {deleteNote} = context
  const st={
    pointer:"cursor"
  }
 
  return (
    <div className="col-md-3 my-3">
      <div className="card " style={{ width: "18rem",background:"#e6dada" }}>
    
      <i className="fa-solid fa-book-open-reader my-1 mx-1" style={st}></i>
        <div className="d-flex flex-row-reverse my-2" style={{"cursor":"pointer"}}>
          <i className="fa-solid fa-trash mx-3" onClick={()=>deleteNote(note._id)}></i>
          <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
        </div>
        <div className="card-body ">
          <div className="card-title"><h4 style={{fontFamily:"cursive"}}>Title:</h4>{note.title}</div>
          <div className="card-text"><h4 style={{fontFamily:"cursive"}}>Description:</h4>{note.description}</div>
          <div className="card-text"><h4 style={{fontFamily:"cursive",fontSmooth:"5"}}>Tag:</h4>{note.tag}</div>
        </div>
      </div>
    </div>
  );
}
