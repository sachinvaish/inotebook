import React,{useContext} from 'react';
import noteContext from "../context/notes/noteContext";

export default function About() {
const a = useContext(noteContext);
setTimeout(() => {
  a.update();
}, []);
  return (
    <div>
     This is About {a.state.name} , He is in class {a.state.class}
    </div>
  );
}
