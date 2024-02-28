import { useContext, useEffect } from 'react'
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import noteContext from "../context/notes/noteContext";

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getnotes } = context;
    useEffect(() => {
        getnotes();
        // eslint-disable-next-line
    }, []);
    // const updateNote = () => {
    //     ref.current.click();
    // }
    // const ref = useRef(null);
    return (
        <>
            <Addnote />


            <div className="row my-3">
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <NoteItem key={note._id}
                    // updateNote={updateNote}
                    note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes;

{/* <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
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
                                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add a Note</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save Note</button>
                        </div>
                    </div>
                </div>
            </div> */}
