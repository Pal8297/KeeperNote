import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import "./AddNote.css"

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        // showAlert("Note Added Succesfully", "#B5F1CC", "#17594A")
    }
    
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h2>Add Note</h2>
            <div>
                <form className='form-container'>
                    <div className="form-innerContainer">
                        <label htmlFor='title'>Title</label>
                        <br></br>
                        <input type="text" id="title" name="title" onChange={onChange} value={note.title} minLength={5} required></input>
                    </div>
                    <div className="form-innerContainer">
                        <label htmlFor='description'>Description</label>
                        <br></br>
                        <input type="text" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required></input>
                    </div>
                    <div className="form-innerContainer">
                        <label htmlFor='tag'>Tag</label>
                        <br></br>
                        <input type="text" onChange={onChange} id="tag" name="tag" value={note.tag} minLength={5} required></input>
                    </div>
                    <div className="submit-btn" >
                        <button disabled={note.title.length < 4 || note.description.length <= 5 || note.tag.length < 4} type="submit" onClick={handleClick}>Add Note</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddNote

