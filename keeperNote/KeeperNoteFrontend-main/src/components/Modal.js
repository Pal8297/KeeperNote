import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import "./AddNote.css"

const Modal = (props) => {
    const {note} =  props;
    const context = useContext(noteContext);
    const { editNote, setOpenModal } = context;
    const [currentNote, setCurrentNote] = useState({id: note._id, etitle: note.title, edescription: note.description, etag: note.tag })
    const handleClick = (e) => {
        e.preventDefault();
        setOpenModal(false)
        editNote(currentNote.id, currentNote.etitle, currentNote.edescription, currentNote.etag);
    }

    const onChange = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='modalBackground'>
                <div className='modalContainer' >
                    <form>
                        <div className="form-innerContainer">
                            <i className="fa-sharp fa-solid fa-xmark submit-btn2" onClick={() => { setOpenModal(false) }}></i>
                            <br></br>
                            <label htmlFor='etitle'>Title</label>
                            <br></br>
                            <input type="text" id="etitle" name="etitle" onChange={onChange} value={currentNote.etitle} minLength={5} required></input>
                        </div>
                        <div className="form-innerContainer">
                            <label htmlFor='edescription'>Description</label>
                            <br></br>
                            <input type="text" id="edescription" name="edescription" onChange={onChange} value={currentNote.edescription} minLength={5} required></input>
                        </div>
                        <div className="form-innerContainer">
                            <label htmlFor='etag'>Tag</label>
                            <br></br>
                            <input type="text" onChange={onChange} id="etag" name="etag" value={currentNote.etag} minLength={5} required></input>
                        </div>
                        <div className="submit-btn">
                            <button disabled={currentNote.etitle.length < 4 || currentNote.edescription.length < 5 || currentNote.etag.length < 4} type="submit" className="submit-btn1" onClick={handleClick} >Update Note</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Modal