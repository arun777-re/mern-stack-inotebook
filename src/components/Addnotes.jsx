import React, { useState, useContext } from "react";
import { notecontext } from "../context/Context";

export default function Addnotes() {
  const context = useContext(notecontext);
  const { addNote } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  const handleonchange = (e) => {
    setnote({...note,[e.target.name]:e.target.value });
  };

  const handleonclick = (e) => {
    e.preventDefault();
    addNote(note);
    setnote({title:"",description:"",tag:""});

  };

  return (
    <div className='my-5'>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="email"
            name="title"
            onChange={handleonchange}
            className="form-control"
            id="title"
            value={note.title}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            onChange={handleonchange}
            name="description"
            className="form-control"
            value={note.description}
            id="description"
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            onChange={handleonchange}
            className="form-control"
            value={note.tag}
            id="tag"
          />
        </div>
        <button
          disabled={note.title.length<5 || note.description.length<10 || note.tag.length<3}
          type="submit"
          className="btn btn-primary"
          onClick={handleonclick}
        >
          Addnote
        </button>
      </form>
    </div>
  );
}
