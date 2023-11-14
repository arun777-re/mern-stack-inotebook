const express= require('express');
const Notes = require('../modals/Notes');
const User = require('../modals/User')
const { fetchUser } = require('../middleware/fetchUser');
// const { json } = require('body-parser');
const router = express.Router();

// Route:1 create notes using "/api/notes/createnotes" login required 
router.post("/createnotes",fetchUser,async(req,res)=>{
    try {
        const {title,description,tag}= req.body;

   const notes = await Notes.create({
    title,description,tag,user:req.user.id
   });

   res.json(notes);

    } catch (error) {
        res.status(500).json({errors:"Internal Server Error"})
    }

});


// Router2: fetch all notes using "/api/notes/fetchallnotes" login required
router.get("/fetchallnotes/",fetchUser,async(req,res)=>{

  try {
        const user = req.user.id
        const notes = await Notes.find({user});
        res.status(200).json(notes);
    
    
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Internal Server error"});
  }

});


// Route:3 delete all notes using "/api/notes/deletenote" login required
router.delete("/deletenote/:id",fetchUser,async(req,res)=>{
    try {
         const userId =req.user.id;
        const user = await User.findById(userId);
        if(!user){
           return res.json({error:"please authenticate"})
        }
        const _id = req.params.id;
        const  notes = await Notes.findByIdAndDelete(_id);
        res.json("deleted successfully");
    } catch (error) {
        return res.json({error:error.message})
    }
  
});

// Router4: update a note using "/api/notes/updatenote" login require
router.put('/updatenote/:id',fetchUser,async(req,res)=>{
    try {
       const {title,description,tag} =req.body;
    //    id of the note which comes from the prameter
       const id = req.params.id
    //    Creates a new object to set as new updated note
       const newNote={};
       if(title){newNote.title=title}
       if(description){newNote.description=description}
       if(tag){newNote.tag=tag}
       console.log(newNote)
    //    find the note by a user id
       let note = await Notes.findById(id);
       console.log(note)
    //    check whether if note exists or not 
    if(!note){return res.status(204).send("no such note exists")}
    // check whether the user is same as the created by
    if(note.user.toString()!==req.user.id){return res.status(404).send({error:"you are not authenticate "})}
    console.log(note);

    note =await Notes.findByIdAndUpdate(id,{$set:newNote},{new:true})
    res.status(200).json({note});

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({error:"Internal server error"});
    } 
})



module.exports = router;