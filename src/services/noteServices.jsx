import axios from 'axios';
import noteServices from '../config'
require('dotenv').config();

const baseURL = process.env.REACT_APP_BASE_URL;
// const addNotes = process.env.REACT_APP_ADDNOTES;
export function addNotes(data) {
    return axios.post(baseURL + '/notes/addNotes', data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function getNotes() {
    return axios.get(baseURL + '/notes/getNotesList',
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function changeColorNotes(data) {
    return axios.post(baseURL + noteServices.changeColorNotes, data, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
}
export function updateNotes(data) {
    return axios.post(baseURL + noteServices.updateNotes, data, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
}
export function deleteNotes(data) {
    return axios.post(baseURL + noteServices.deleteNotes, data, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
}
export function archiveNotes(data) {
    return axios.post(baseURL + noteServices.archiveNotes, data, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
}
export function noteLabels(data) {
    return axios.post(baseURL + "/noteLabels", data, {
        headers: {
            Authorization: localStorage.getItem("userId")
        }
    })
}
export function NoteLabelList() {
    return axios.get(baseURL + "/noteLabels/getNoteLabelList",
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function addLabelToNotes(data, noteId, lableId) {
    return axios.post(baseURL + `/notes/${noteId}/addLabelToNotes/${lableId}/add`, data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function removeLabelToNotes(data, noteId, lableId) {
    return axios.post(baseURL + `/notes/${noteId}/addLabelToNotes/${lableId}/remove`, data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function getArchiveNotesList() {
    return axios.get(baseURL + noteServices.getArchiveNotesList,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function getTrashNotesList() {
    return axios.get(baseURL + noteServices.getTrashNotesList,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function addUpdateReminderNotes(data) {
    return axios.post(baseURL + '/notes/addUpdateReminderNotes', data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function removeReminderNotes(data) {
    return axios.post(baseURL + '/notes/removeReminderNotes', data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function getReminderNotesList() {
    return axios.get(baseURL + '/notes/getReminderNotesList',
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}

export function deleteForeverNotes(data) {
    return axios.post(baseURL + '/notes/deleteForeverNotes', data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}

export function getNoteLabelList() {
    return axios.get(baseURL + '/noteLabels/getNoteLabelList',
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}

export function getNotesListByLabel(data, labelName) {
    return axios.post(baseURL + `/notes/getNotesListByLabel/${labelName}`, data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}


export function deleteNoteLabel(data, id) {
    return axios.delete(baseURL + `/noteLabels/${id}/deleteNoteLabel`, data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function updateNoteLabel(id, data) {
    return axios.post(baseURL + `/noteLabels/${id}/updateNoteLabel`, data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function AddcollaboratorsNotes(id, data) {
    return axios.post(baseURL + `/notes/${id}/AddcollaboratorsNotes`, data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}

export function removeCollaboratorsNotes(id, collaboratorUserId) {
    return axios.delete(baseURL + `/notes/${id}/removeCollaboratorsNotes/${collaboratorUserId}`,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function addQuestionAndAnswer(data) {
    return axios.post(baseURL + '/questionAndAnswerNotes/addQuestionAndAnswer', data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function questionLikes(parentId, data) {
    return axios.post(baseURL + `/questionAndAnswerNotes/like/${parentId}`, data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function questioRating(parentId, data) {
    return axios.post(baseURL + `/questionAndAnswerNotes/rate/${parentId}`, data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function myCartDetails() {
    return axios.get(baseURL + '/productcarts/myCart', {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}