import { notecontext } from "./Context";

import React, { useState } from "react";

export default function Notecontext(props) {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    // Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/createnotes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(title, description, tag),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };

  const deleteNote = async (id) => {
    // todo api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    // logic to delete the note
    setNotes(newNote);
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ id, title, description, tag }),
    });
    let json = await response.json();
    console.log(json);

    //  logic to update a note
    let newNote = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNote.length; i++) {
      const element = newNote[i];
      console.log(element);
      if (element._id === id) {
        newNote[i].title = title;
        newNote[i].description = description;
        newNote[i].tag = tag;
        break;
      }
    }
    // console.log(newNote);
    setNotes(newNote);
  };
 
  

  return (
    <div>
      <notecontext.Provider
        value={{ notes, getNotes, addNote, deleteNote, editNote }}
      >
        {props.children}
      </notecontext.Provider>
    </div>
  );
}
