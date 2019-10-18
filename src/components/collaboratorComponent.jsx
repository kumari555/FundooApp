import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Popper from '@material-ui/core/Popper';
import { Paper, Divider } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { userEmail } from '../services/userServices';
import { searchUserList } from '../services/userServices';
import { getNotes } from '../services/noteServices';
import Tooltip from '@material-ui/core/Tooltip';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import LabelComponent from './labelComponent';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import Avatar from '@material-ui/core/Avatar';
import { AddcollaboratorsNotes } from '../services/noteServices';
import { removeCollaboratorsNotes } from '../services/noteServices';
import ClearIcon from '@material-ui/icons/Clear';
function mailSearch(searchValue) {
    return function (x) {
        return x.email.includes(searchValue)
    }
}
export default class CollaboratorComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            open: false,
            email: [],
            searchEmail: "",
            searchWord: "",
            emailData: [],
            mailNote: ""

        }
    }
    handleOpen = () => {
        this.setState({
            open: true,

        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    componentWillMount() {
        this.userEmail()
    }
    userEmail = () => {
        userEmail()
            .then(response => {
                //console.log("data in useremail", response.data);
                this.setState({
                    email: response.data
                })
                //console.log("log after state", this.state.email);
            })
    }
    handleSearch = (event) => {
        this.setState({
            searchEmail: event.target.value
        })
    }
    handleClick = (email) => {
        console.log("data in collabarator--->", email);
        var data = {
            searchWord: email
        }
        console.log("data in collabarator", data);

        searchUserList(data)
            .then(response => {
                console.log("collabarated search user", response.data.data.details);
                this.setState({
                    emailData: response.data.data.details
                })
                console.log("collabarated search user after set satate", this.state.emailData);
                // this.userEmail()
            })
    }
    handleSave = () => {
        AddcollaboratorsNotes(this.props.noteID, this.state.emailData[0])
            .then(response => {
                console.log("log of collaboratated data", response);
                this.props.collaboratorProps(true)
                this.setState({
                    mailNote: response
                })
                console.log("log of collaboratated data after state", this.state.mailNote);
            })
    }
    handleCancel = () => {
        console.log("response in remove collaborator", this.props.collaboratorkey);
        removeCollaboratorsNotes(this.props.noteID, this.props.collaboratorkey)
            .then(response => {
                console.log("response in remove collaborator", response);
            })
    }
    render() {
        //console.log("data in email users---->", this.state.email);
        const emailDetails = this.state.email.filter(mailSearch(this.state.searchEmail)).map((key) => {
            //console.log("key in email users", key);
            return (
                <MenuItem>
                    <div onClick={() => this.handleClick(key.email)}>
                        {key.email}
                    </div>
                </MenuItem>
            )
        })
        var mailerDetails = this.state.emailData.map((key, index) => {
            // const mailerDetails = this.state.mailNote.map((key) => {
            // const mailerDetails = this.state.emailData.map((key) => {
            console.log("key in mailer details", key);
            return (
                <div>
                    {key.email}
                </div>
            )
        })
        return (
            <div>
                <div><PersonAddOutlinedIcon onClick={this.handleOpen} /></div>
                <div>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}>
                        <h3 style={{ padding: "1px 1px 1px 10px" }}>Collaborators</h3>
                        <Divider />
                        <div className="email-css">
                            <div><Avatar>R</Avatar></div>
                            <div><h3 style={{ padding: "1px 1px 0px 16px" }}>{localStorage.getItem("Email")}</h3></div>
                        </div>
                        <div> <div><AccountCircleIcon /></div>
                            <div>{mailerDetails}</div>
                            <div onClick={() => this.handleCancel()}> <ClearIcon /></div></div>
                        <div style={{ display: "flex" }}>
                            <div> <AccountCircleIcon /></div>
                            <div><InputBase
                                placeholder="search a mail...."
                                // defaultValue={mailerDetails}
                                value={this.state.searchEmail}
                                onChange={this.handleSearch}
                            />
                            </div></div>
                        <div onClick={this.handleSave} >
                            <Button> Save</Button>
                        </div>
                        <div> {emailDetails}</div>
                        <Button color="primary" >
                            Cancel
                           </Button>
                    </Dialog>
                </div>
            </div>
        )
    }
}