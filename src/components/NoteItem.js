import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deletenote } = context;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex">
                        <h5 className="card-title p-2 w-75">{note.title}</h5>
                        <div className='p-2 flex-shrink-0'>
                            <i className="fa-regular fa-pen-to-square mx-1"
                                onClick={() => { updateNote(note) }}>
                            </i>
                            <i className="fa-solid fa-trash mx-1"
                                onClick={() => { deletenote(note._id); props.showAlert("Note deleted", "success") }}>
                            </i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div >
    )
}

export default NoteItem;


