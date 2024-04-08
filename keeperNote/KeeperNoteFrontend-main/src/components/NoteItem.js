import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import "./NoteItem.css"

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, scroll} = props
    return (
        <div className="noteContainer">
            <div className='inner-noteContainer'>
                <p className='title'>{note.title}</p>
                <p className='description'>{note.description}</p>
                <p className='tag'>{note.tag}</p>
                <i className="fa-sharp fa-solid fa-trash" style={{ color: "#000000" }} onClick={() => {deleteNote(note._id);scroll()}}></i>
                <i className="fa-solid fa-pen-to-square" onClick={() => {updateNote(note); scroll()}}></i>
            </div>
        </div>
    )
}

export default NoteItem