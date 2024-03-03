import { useState } from "react";
import noteContext from "./noteContext";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
    const HOST = process.env.REACT_APP_HOST;
    const PORT = process.env.REACT_APP_PORT;
    const host = `${HOST}:${PORT}`;

    // Initial notes is empty
    // const notesInitial = [];
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    // Adding notes to the users list
    const getnotes = async () => {
        //  API Calls todo
        const response = await fetch(`${host}/routes/notes/fetchallnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            }
        });
        const json = await response.json();

        // if token is not valid clearToken true is sent from server to clear the token
        if (json.clearToken) {
            localStorage.removeItem('auth-token');
            navigate('/login');
        }
        else {
            setNotes(json.notes);
        }
    }

    // Adding notes
    const addnote = async (title, description, tag) => {
        //  API Calls todo
        const response = await fetch(`${host}/routes/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note.note));
    }

    // Deleting notes
    const deletenote = async (id) => {
        //  API Calls todo
        const response = await fetch(`${host}/routes/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            }
        });
        const json = await response.json();

        const newNotes = notes.filter((note) => { return note._id !== json.note._id });
        setNotes(newNotes);
    }

    // Editing notes
    const editnote = async (id, title, description, tag) => {
        //  API Calls
        const response = await fetch(`${host}/routes/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        // eslint-disable-next-line
        const json = await response.json();

        let newnotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index];
            if (element._id === id) {
                newnotes[index].title = title;
                newnotes[index].description = description;
                newnotes[index].tag = tag;
                break;
            }
        }
        setNotes(newnotes);
    }

    return (
        <noteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;