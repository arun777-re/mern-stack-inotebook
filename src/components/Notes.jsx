import React, { useContext, useRef, useState } from "react";
import Addnotes from "./Addnotes";
import NotesItem from "./NotesItem";
import { notecontext } from "../context/Context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Notes(props) {
  const context = useContext(notecontext);
  const { notes, getNotes,editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""});
  const history=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      let authtoken =localStorage.getItem('token');
      
      console.log(authtoken)
      getNotes();

    }
    else{
     history('/login')
    }
    // eslint-disable-next-line
  }, [2]);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});

  };


  const handleonchange = (e) => {
    setNote({...note,[e.target.name]:e.target.value});
  };

  const handleonclick = (e) => {
    e.preventDefault()
  
    refClose.current.click();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    props.showalert("note updated successfully","Success")

  };
  return (
    <div className="container">
      <Addnotes />
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Edit note
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="email"
            name="etitle"
            onChange={handleonchange}
            className="form-control"
            value={note.etitle}
            id="etitle"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            onChange={handleonchange}
            name="edescription"
            value={note.edescription}
            className="form-control"
            id="edescription"
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            name="etag"
            value={note.etag}
            onChange={handleonchange}
            className="form-control"
            id="etag"
          />
        </div>
     
      </form>
      </div>
      <div class="modal-footer">
        <button  ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleonclick} type="button" className="btn btn-primary">Update note</button>
      </div>
    </div>
  </div>
</div>
<div className="row my-2">

<h1 className="text-center" style={{ color: "white" }}>
        Your notes</h1>
      
         {notes.length===0 && "No Notes To Display"}
        {notes.map((note1) => {
          return (
            <NotesItem key={note1._id} updateNote={updateNote} note={note1} />
          );
        })}
      </div>
    </div>
  );
}
