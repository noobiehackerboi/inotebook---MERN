import { useContext, useEffect, useState, useRef } from 'react'
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import noteContext from "../context/notes/noteContext";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const navigate = useNavigate();

    const context = useContext(noteContext);
    const { notes, getnotes, editnote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    useEffect(() => {
        console.log("Use effect called")
        if (localStorage.getItem('auth-token')) {
            getnotes();
        } else {
            navigate('/');
        }
        // eslint-disable-next-line
    }, []);
    const refOpen = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        refOpen.current.click();
        setNote(currentNote);
    }

    const handleClick = (e) => {
        editnote(note._id, note.title, note.description, note.tag);
        props.showAlert("Notes edited", "success");
        refClose.current.click();
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <Addnote showAlert={props.showAlert} />
            <button ref={refOpen} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Hidden Modal</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length < 3 || note.description.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Save Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-3">
                    {notes.length === 0 && "Nothing to show"}
                </div>
                {notes.map((note) => {
                    return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes;