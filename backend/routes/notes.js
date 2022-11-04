const express = require('express');
const router = express.Router();
const cors = require('cors')
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

router.use(cors());

// Route 1 : Fetch all notes using GET "/api/notes/fetchallnotes" login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
   try {
      const notes = await Notes.find({user : req.user.id});
      res.json(notes);
   } catch (error) {
      //catching errors 
      console.error(error);
      res.status(500).send("Some Error Occured");
   }
})

// Route 2 : Add a Note using POSt "/api/notes/addnote" login required
router.post('/addnote',fetchuser, [
   body('title','Title should be minimum of 3 letters').isLength(3),
   body('description','Description must be atleast 5 characters').isLength({ min: 5})
],async (req,res)=>{
   const errors = validationResult(req);
   //validation check post
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   try {
      const {title, description, tags}=req.body;
      const note = await new Notes({title,description,tags, user : req.user.id});
      const NewNote = await note.save();
      res.json({"message":"Note Added Successfully"});
   } catch (error) {
      //catching errors 
      console.error(error);
      res.status(500).send("Some Error Occured");
   }
})

// Route 3 : Update a Note using PUT "/api/notes/updatenote/:id" login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
   let newNote = {};
   const {title,description,tags} = req.body;
   if(title){ newNote.title = title }
   if(description){ newNote.description = description }
   if(tags){ newNote.tags = tags }
   try {
      let note = await Notes.findById(req.params.id);
      if(!note){
         return res.status(404).send("Not Found");
      }
      if(note.user.toString() != req.user.id){
         return res.status(401).send("Not Allowed");
      }

      note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true})
      return res.json({"message":"Note Updated Successfully"});
   } catch (error) {
      console.error(error);
      res.status(500).send("Some Error Occured");
   }

})

// Route 4 : Delete a Note using DELETE "/api/notes/deletenote/:id" login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
   try {
      let note = await Notes.findById(req.params.id);
      if(!note){
         return res.status(404).send("Not Found");
      }
      if(note.user.toString() != req.user.id){
         return res.status(401).send("Not Allowed");
      }
      await Notes.findByIdAndDelete(req.params.id)
      return res.json({"message":"Note Deleted Successfully"});
   } catch (error) {
      console.error(error);
      res.status(500).send("Some Error Occured");
   }

})

module.exports=router;