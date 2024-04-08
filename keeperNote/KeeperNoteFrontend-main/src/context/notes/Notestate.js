import NoteContext from "./noteContext";
import { useState } from "react"

const NoteState = (prop) => {
    const host = "http://localhost:3000"
    const initialnotes = []
    const [notes, setNotes] = useState(initialnotes)
    const [openModal, setOpenModal] = useState(false);
    const [openNavModal, setOpenNavModal] = useState(false);
    const [navMenu, setNavMenu] = useState(false)
    const [alert, setAlert] = useState({ msg: "Error", color: "white", textColor: "white" })
    const showAlert = (message, color, textColor) => {
        setAlert({
            msg: message,
            color: color,
            textColor: textColor
        })
        setTimeout(() => {
            setAlert({ msg: "Error", color: "white", textColor: "white" })
        }, 1500);
    }

    //Get All Notes Note
    const getNotes = async () => {
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')            }
        });
        const json = await response.json();
        setNotes(json)
    }


    //Add Note
    const addNote = async (title, description, tag) => {
        //API Call

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
        showAlert("Added Sucessfully", "#B5F1CC","#17594A")
    }

    //Delete Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        // const json = await response.json();
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);
        showAlert("Deleted Sucessfully", "#B5F1CC","#17594A")        
    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        // const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit client
        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
        showAlert("Updated Sucessfully", "#B5F1CC","#17594A")
    }

    return (
        <NoteContext.Provider value={{alert, showAlert, openNavModal, setOpenNavModal, notes, setNotes, openModal, setOpenModal, addNote, deleteNote, editNote, getNotes, navMenu, setNavMenu }}>
            {prop.children}
        </NoteContext.Provider>
    )
}

export default NoteState;