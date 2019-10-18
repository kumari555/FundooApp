import React from 'react'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { archiveNotes } from '../services/noteServices';
import { getNotes } from '../services/noteServices';
export default class UnArchiveComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            noteIdList: "",
            isArchived: true
        }
    }
    getNotesf = () => {
        getNotes()
            .then(response => {
                console.log("response in get note---->", response.data.data.data)
                //console.log("response in get note id ---->", response.data.data.data.id)
                this.setState({
                    getNoteData: response.data.data.data,
                    // id: response.data.data.data.id
                })
                console.log("data in get more", response.data.data.data)
            })
    }
    handleArchiveNote = () => {
        // var archive = this.props.noteID
        var data = {
            noteIdList: [this.props.noteID],
            isArchived: false
        }
        console.log("data in archive---->", data)
        archiveNotes(data)
            .then(response => {
                console.log("response in arcive component --->", response)
              
                this.getNotesf()
                this.props.archiveData(true)
            })
            .catch(err => {
                console.log("err while updating", err);
            })
    }
    render() {
        return (
            <div>
                <Tooltip title="UnArchive" onClick={this.handleArchiveNote}><ArchiveOutlinedIcon /></Tooltip>
            </div>
        )
    }
}