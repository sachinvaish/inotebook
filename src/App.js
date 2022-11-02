import Navbar from "./components/Navbar";
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";

function App() {

  const [mode, setMode] = useState('light');

  const toggleMode=()=>{
    if (mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor='#12244a';
      document.body.style.color='white';
      // showAlert("Dark Mode Enabled","success");
    }else{
      setMode('light');
      document.body.style.backgroundColor='white';
      document.body.style.color='#12244a';
      // showAlert("Light Mode Enabled","success");
    }

    
  }


  return (
    <NoteState>
      <Router> 
      <Navbar mode={mode} logo="iNoteBook" toggleMode={toggleMode}/>
      <Alert/>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
      
    </NoteState>
  );
}

export default App;
