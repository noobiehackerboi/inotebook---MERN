import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // Adding notes
    const getnotes = async () => {
        //  API Calls todo
        const response = await fetch(`${host}/routes/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMjFkMzQ2Yzk5ZmM0ZTk1YjA3NjBkIn0sImlhdCI6MTcwODI5MDk2N30.YYhA3fZ-QYehnwNuMT1GCzlykEYsAtNQEf_AHo4o-vA",
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    // Adding notes
    const addnote = async (title, description, tag) => {
        //  API Calls todo
        const response = await fetch(`${host}/routes/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMjFkMzQ2Yzk5ZmM0ZTk1YjA3NjBkIn0sImlhdCI6MTcwODI5MDk2N30.YYhA3fZ-QYehnwNuMT1GCzlykEYsAtNQEf_AHo4o-vA",
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        // console.log(json._id);
        const note = {
            "_id": json._id,
            "user": "6131dc5e3e4037cd4734a0664",
            "title": title,
            "description": description,
            "tag": tag,
            "date": json.date,
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    // Deleting notes
    const deletenote = async (id) => {
        //  API Calls todo
        const response = await fetch(`${host}/routes/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMjFkMzQ2Yzk5ZmM0ZTk1YjA3NjBkIn0sImlhdCI6MTcwODI5MDk2N30.YYhA3fZ-QYehnwNuMT1GCzlykEYsAtNQEf_AHo4o-vA",
            }
        });
        const json = response.json();
        console.log(json);

        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    // Editing notes
    const editnote = async (id, title, description, tag) => {
        //  API Calls
        const response = await fetch(`${host}/routes/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMjFkMzQ2Yzk5ZmM0ZTk1YjA3NjBkIn0sImlhdCI6MTcwODI5MDk2N30.YYhA3fZ-QYehnwNuMT1GCzlykEYsAtNQEf_AHo4o-vA",
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        console.log(json);


        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <noteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;