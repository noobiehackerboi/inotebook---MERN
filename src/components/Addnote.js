import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addnote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleClick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        props.showAlert("Note added", "success");
        setNote({ title: "", description: "", tag: "" });
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div className='my-4'>
            <h1>Add a note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input value={note.title} type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input value={note.description} type="text" className="form-control" id="description" name='description' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input value={note.tag} type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add a Note</button>
            </form>
        </div>
    )
}

export default Addnote
