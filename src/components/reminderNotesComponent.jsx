import React from 'react'
import Popper from '@material-ui/core/Popper';
import { Paper } from '@material-ui/core';

import { addUpdateReminderNotes } from '../services/noteServices';
import TextField from '@material-ui/core/TextField';



import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';

import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import { getNotes } from '../services/noteServices';

export default class ReminderNoteComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            anchorEl: null,
            selectedDate: "",
            noteIdList: "",
            reminder: ""
        }
    }
    getNotes = () => {
        getNotes()
            .then(response => {
                console.log("response in get note---->", response.data.data.data)
                //console.log("response in get note id ---->", response.data.data.data.id)
                this.setState({
                    getNoteData: response.data.data.data,
                    // id: response.data.data.data.id
                })
            })
    }
    handlemore = (event) => {
        const { currentTarget } = event
        this.setState({
            anchorEl: (this.state.anchorEl ? null : currentTarget)
        })
    }
    handleSelectDate = async(event) => {
       await this.setState({
            selectedDate: event.target.value
       })
        console.log("dataaaaaaaaa", this.state.selectedDate);
       //this.props.reminderPropsToCreateNote(this.state.selectedDate)
    }
    handleDate = async () => {
        console.log("noteid in remainder", this.props);
        var data = {
            noteIdList: [this.props.noteID],
            reminder: this.state.selectedDate
        }
        await addUpdateReminderNotes(data)
            .then(response => {
                console.log("response in remainder notes", response)
                 this.props.reminderProps(true)
                this.getNotes()
            })
            .catch(err => {
                console.log("err while updating", err);
            })
    }
    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popper' : undefined;
        return (
            <div>
                <Tooltip title="reminde me" onClick={this.handlemore}><AddAlertOutlinedIcon /></Tooltip>

                <Popper id={id} open={open} anchorEl={anchorEl}>

                    <Paper>
                        <MenuItem>  <h3>remainder: </h3>  </MenuItem>
                        <MenuItem>  <div>Tomarrow</div>  </MenuItem>
                        <MenuItem>  <div>Select Date and Time :</div>  </MenuItem>
                        <MenuItem>
                            <TextField
                                id="datetime-local"
                                type="datetime-local"
                                defaultValue="2019-05-24T10:30"
                                onChange={this.handleSelectDate}
                            //value={this.state.selectedDate}
                            />
                        </MenuItem>
                        <MenuItem
                            onClick={this.handleDate}>
                            <div className="saveDate">Save</div></MenuItem>
                    </Paper>
                </Popper>
            </div>
        )
    }
}