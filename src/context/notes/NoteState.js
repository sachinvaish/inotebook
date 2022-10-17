import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{

    const notesInitial=[
        {
          "_id": "632e71c3460c7c939ffdb2c2",
          "user": "632d0a359896e7afc744e7f0",
          "title": "Title New hai",
          "description": "old desc",
          "tags": "tinku",
          "date": "2022-09-24T02:56:12.968Z",
          "__v": 0
        },
        {
          "_id": "6343878d553325a6967580f8",
          "user": "632d0a359896e7afc744e7f0",
          "title": "My Brother is not bad man",
          "description": "Big Brother",
          "tags": "Henry",
          "date": "2022-10-10T02:46:37.666Z",
          "__v": 0
        },
        {
          "_id": "6343878355f325a6967580f8",
          "user": "632d0a359896e7afc744e7f0",
          "title": "My Brother",
          "description": "Big Brother",
          "tags": "Henry",
          "date": "2022-10-10T02:46:37.666Z",
          "__v": 0
        },
        {
          "_id": "6343878d55f325a6967380f8",
          "user": "632d0a359896e7afc744e7f0",
          "title": "My Brother",
          "description": "Big Brother",
          "tags": "Henry",
          "date": "2022-10-10T02:46:37.666Z",
          "__v": 0
        }
      ];

      const [notes, setNotes] = useState(notesInitial);

      //ADD a Note
      const addNote=(note)=>{
        const {title, description, tags}=note;
        let myNote={
          "_id": "6343878d55f325a6967580f8",
          "user": "632d0a359896e7afc744e7f0",
          "title": title,
          "description": description,
          "tags": tags,
          "date": "2022-10-10T02:46:37.666Z",
          "__v": 0
        }
        console.log("Adding a New Note");
        setNotes(notes.concat(myNote));
       
      }

      //Delete a Note
      const deleteNote=()=>{

      }

      //Edit a note
      const editNote=()=>{

      }
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children} 
        </NoteContext.Provider>
    )
}

export default NoteState;
