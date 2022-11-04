import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";
import { useNavigate } from 'react-router-dom';



function Logout() {
    const context = useContext(noteContext);
    const { setNotes } = context;
    const navigate = useNavigate();

    const onClick = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <button type="button" onClick={onClick} className="btn btn-secondary mx-2">Logout</button>
    );
}

export default Logout;
