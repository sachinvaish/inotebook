import React, {useContext} from 'react';
import noteContext from "../context/notes/noteContext";

function Alert() {

    const context=useContext(noteContext);
    const {alert} = context;

    return (
        <div className="d-flex justify-content-center">
            <div className="toast-container ">
                <div className={`toast ${alert.status} text-white bg-dark rounded-pill `} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-body text-center">
                        {alert.message}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Alert;
