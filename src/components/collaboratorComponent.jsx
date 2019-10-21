import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import { userEmail } from '../services/userServices';
import { searchUserList } from '../services/userServices';

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { AddcollaboratorsNotes } from '../services/noteServices';
import { removeCollaboratorsNotes } from '../services/noteServices';

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
    handleOpen = async () => {
        await this.setState({
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
                        style={{ height: " 67%" }}
                        open={this.state.open}
                        onClose={this.handleClose}>
                        <h3 style={{ padding: "1px 1px 1px 10px" }}>Collaborators</h3>
                        <Divider />
                        <div className="email-css">
                            <div><Avatar>R</Avatar></div>
                            <div><h3 style={{ padding: "1px 1px 0px 16px" }}>{localStorage.getItem("Email")}</h3></div>
                        </div>
                      
                            <div>{mailerDetails}</div>
                        
                        <div style={{ display: "flex" }}>
                            <div> <AccountCircleIcon /></div>
                            <div style={{ padding: "1px 1px 1px 10px" }}><InputBase
                                placeholder="search a mail...."
                                // defaultValue={mailerDetails}
                                value={this.state.searchEmail}
                                onChange={this.handleSearch}
                            />
                            </div>
                            <div onClick={this.handleSave}
                                style={{ padding: "1px 1px 1px 138px" }}>
                                <Button> Save</Button>
                            </div></div>
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