import React, { useContext, useEffect, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import "./Notes.css"
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, openModal, setOpenModal } = context;
    let navigation = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigation("/keeper");
        }
    }, [])
    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });
    const updateNote = (currentNote) => {
        setOpenModal(true);
        setNote(currentNote)
        scrollToElement();
    }
    const scrollToElement = () => {
        let element = document.getElementsByClassName("alert");
        let offsetTop = element.offsetTop;
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });
    }
    return (
        <div>
            {openModal && <Modal note={note} />}
            <h3>Your Notes</h3>
            <p>{notes.length === 0 && 'NO NOTES TO DISPLAY'}</p>
            <div className='noteOuterContainer'>

                {notes.map((Note) => {
                    return <>

                        <NoteItem key={Note._id} updateNote={updateNote} scroll={scrollToElement} note={Note} />
                    </>
                })}

            </div>
        </div>
    )
}

export default Notes