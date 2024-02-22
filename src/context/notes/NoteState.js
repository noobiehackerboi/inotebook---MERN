import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "65d27c890bf4cc9275aff201",
            "user": "65d21d346c99fc4e95b0760d",
            "title": "first note is the best note",
            "description": "this is my first note edited",
            "tag": "mongo db",
            "date": "2024-02-18T21:54:17.497Z",
            "__v": 0
        },
        {
            "_id": "65d7b525f272bfb5ba385853",
            "user": "65d21d346c99fc4e95b0760d",
            "title": "third note4",
            "description": "this is my third note4",
            "tag": "youtube4",
            "date": "2024-02-22T20:57:09.275Z",
            "__v": 0
        },
        {
            "_id": "65d7b525f272bfb5ba385853",
            "user": "65d21d346c99fc4e95b0760d",
            "title": "third note4",
            "description": "this is my third note4",
            "tag": "youtube4",
            "date": "2024-02-22T20:57:09.275Z",
            "__v": 0
        },
        {
            "_id": "65d7b525f272bfb5ba385853",
            "user": "65d21d346c99fc4e95b0760d",
            "title": "third note4",
            "description": "this is my third note4",
            "tag": "youtube4",
            "date": "2024-02-22T20:57:09.275Z",
            "__v": 0
        },
        {
            "_id": "65d7b525f272bfb5ba385853",
            "user": "65d21d346c99fc4e95b0760d",
            "title": "third note4",
            "description": "this is my third note4",
            "tag": "youtube4",
            "date": "2024-02-22T20:57:09.275Z",
            "__v": 0
        },
        {
            "_id": "65d7b525f272bfb5ba385853",
            "user": "65d21d346c99fc4e95b0760d",
            "title": "third note4",
            "description": "this is my third note4",
            "tag": "youtube4",
            "date": "2024-02-22T20:57:09.275Z",
            "__v": 0
        },
        {
            "_id": "65d7b525f272bfb5ba385853",
            "user": "65d21d346c99fc4e95b0760d",
            "title": "third note4",
            "description": "this is my third note4",
            "tag": "youtube4",
            "date": "2024-02-22T20:57:09.275Z",
            "__v": 0
        },
        {
            "_id": "65d7b525f272bfb5ba385853",
            "user": "65d21d346c99fc4e95b0760d",
            "title": "third note4",
            "description": "this is my third note4",
            "tag": "youtube4",
            "date": "2024-02-22T20:57:09.275Z",
            "__v": 0
        },
        {
            "_id": "65d7b525f272bfb5ba385853",
            "user": "65d21d346c99fc4e95b0760d",
            "title": "third note4",
            "description": "this is my third note4",
            "tag": "youtube4",
            "date": "2024-02-22T20:57:09.275Z",
            "__v": 0
        },
        {
            "_id": "65d7b525f272bfb5ba385853",
            "user": "65d21d346c99fc4e95b0760d",
            "title": "third note4",
            "description": "this is my third note4",
            "tag": "youtube4",
            "date": "2024-02-22T20:57:09.275Z",
            "__v": 0
        },
        {
            "_id": "65d7b525f272bfb5ba385853",
            "user": "65d21d346c99fc4e95b0760d",
            "title": "third note4",
            "description": "this is my third note4",
            "tag": "youtube4",
            "date": "2024-02-22T20:57:09.275Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial);
    return (
        <noteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;