import React from 'react'
import { getReminderNotesList } from '../services/noteServices';

import Card from '@material-ui/core/Card';
import { MuiThemeProvider, createMuiTheme, InputBase } from '@material-ui/core';

import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

import ColorComponent from '../components/colorComponent';
import { changeColorNotes } from '../services/noteServices';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import { updateNotes } from '../services/noteServices';
import MoreComponent from '../components/moreComponent';
import Tooltip from '@material-ui/core/Tooltip';
import ArchiveComponent from '../components/archiveComponent';
import Chip from '@material-ui/core/Chip';
import ReminderNoteComponent from '../components/reminderNotesComponent';
import { removeLabelToNotes } from '../services/noteServices';
import { withRouter } from 'react-router-dom';
import { removeReminderNotes } from '../services/noteServices';
import CollaboratorComponent from '../components/collaboratorComponent';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import { removeCollaboratorsNotes } from '../services/noteServices';
const theme = createMuiTheme({
    overrides: {
        MuiSvgIcon: {
            root: {
                color: "rgba(0, 0, 0, 0.54)",
                fontSize: "20px"
            }
        },
        MuiCard: {
            root: {
                boxShadow: "3px 4px 11px 1px lightgrey"
            }
        }, MuiBackdrop: {
            root: {
                backgroundColor: "transparent"
            }
        },
        MuiDialog: {
            paperWidthSm: {
                boxShadow: "3px 1px 4px 2px rgb(206, 206, 206)",
                width: "36%"
            }
        },
        MuiPaper: {
            rounded: {
                borderRadius: "11px"
            }
        }
        //         MuiDialog: {
        //         paper: {

        //             overflowY:" hidden"
        //     }
        // }
    }
})
function searchFunction(searchValue) {
    return function (x) {
        return x.title.includes(searchValue) || x.description.includes(searchValue)
    }
}
class GetReminderComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            getNoteData: [],
            open: false,
            noteId: "",
            title: "",
            description: "",
            Id: [],
            reminderData: [],
            lableId: "",
            noteIdList: ""

        }
        // this.handleUpdateCard = this.handleUpdateCard.bind(this)
    }
    componentWillMount() {
        this.getReminderNote()
    }
    getReminderNote = () => {
        getReminderNotesList()
            .then(response => {
                console.log("response in archive note---->", response.data.data.data)
                this.setState({
                    reminderData: response.data.data.data
                })
                console.log("response in archive after storing---->", this.state.archiveData)

            })
    }
    handleGetColor = (value, noteID) => {
        // console.log("response in getNotes for color and id--->", value)
        var data = {
            noteIdList: [noteID],
            color: value,
        }
        //console.log("response in getNotes for color and id--->",color)
        changeColorNotes(data)
            .then(response => {
                console.log("response in getNotes for color and id--->", response)
                this.getReminderNote()
            })
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        })
        // console.log("dialog details--->", this.state.open)
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleUpdateCard = (id, oldTitle, oldDescription) => {
        this.setState({
            open: false,
            noteId: id,
            title: oldTitle,
            description: oldDescription
        })
        // console.log("data for updation", this.state.noteId, this.state.title, this.state.description);
        var data = {
            noteId: this.state.noteId,
            title: this.state.title,
            description: this.state.description
        }
        console.log("data in update note--->", data)
        updateNotes(data)
            .then(response => {
                console.log("response of update details--->", response)
                this.getReminderNote()
            })
            .catch(err => {
                console.log("err while updating", err);
            })
    }
    handleTitle = (e) => {
        this.setState({
            title: e.target.value,
        })
        console.log("title updation", this.state.title);
    }
    handledescription = (e) => {
        this.setState({
            description: e.target.value,
        })
        console.log("description updation", this.state.description);
    }
    displayNote = (cardDetails) => {
        console.log("data in carddetails", cardDetails)
        this.setState({
            getNoteData: [...this.state.getNoteData, cardDetails]
        })

    }
    presentData = (updateNote) => {
        if (updateNote) {
            this.getReminderNote()
        }
    }
    storeData = (updateNote) => {
        if (updateNote) {
            this.getReminderNote()
        }
    }
    labelData = (updateNote) => {
        if (updateNote) {
            this.getReminderNote()
        }
    }
    handeChipLabel = (noteId, lableId) => {
        var data = {
            noteId: noteId,
            lableId: lableId
        }
        removeLabelToNotes(data, noteId, lableId)
            .then(response => {
                console.log("label in  note --->", response);
                this.getReminderNote()
            })
    }
    handeChipReminder = (noteID) => {
        var data = {
            noteIdList: [noteID]
        }
        removeReminderNotes(data)
            .then(response => {
                console.log("response in removeing remainder Notes", response);
                this.getReminderNote()
            })
    }
    reminderData = (updateNote) => {
        if (updateNote) {
            this.getReminderNote()
        }
    }
    collaboratorData = (updateNote) => {
        if (updateNote) {
            this.getReminderNote()
        }
    }
    handleOpen = (email) => {
        // console.log("colla62email);
        this.setState({
            dialogOpen: true,
            mail: email
        })
        console.log("collaborator state", this.state.mail);
    }
    handleCancel = (noteId, userId) => {
        console.log("response in remove collaborator in getnotes", noteId, userId);
        removeCollaboratorsNotes(noteId, userId)
            .then(response => {
                console.log("response in remove collaborator getnotes", response);
                this.getReminderNote()
            })
    }
    render() {
        var list = this.props.gridViewProps ? "noteList" : null
        var getReminderDetails = this.state.reminderData.filter(searchFunction(this.props.SearchingNotesProps)).map((key, index) => {
            //console.log("data in key-->", key)
            // console.log("data in index-->", index)
            return (
                (((key.isArchived === false)
                    && key.isDeleted === false)
                    &&
                    <MuiThemeProvider theme={theme}>
                        <div className="card-note" id={list} >

                            <Card className="Cardscss" style={{ backgroundColor: key.color }} id={list} >
                                <div className="getNotes-align" onClick={this.handleClickOpen}>
                                    <InputBase
                                        placeholder="title"
                                        value={key.title}
                                        onClick={() => this.handleUpdateCard(key.id, key.title, key.description)}
                                    />
                                </div>
                                <div className="getNotes-align" onClick={this.handleClickOpen}>
                                    <InputBase
                                        placeholder="take a note....."
                                        value={key.description}
                                        onClick={() => this.handleUpdateCard(key.id, key.title, key.description)}
                                    />
                                </div>
                                {key.noteLabels.map(LabelKey => {
                                    return (
                                        <Chip

                                            label={LabelKey.label}
                                            onDelete={() => this.handeChipLabel(key.id, LabelKey.id)}

                                        />
                                    )
                                })
                                }
                                {key.reminder.map(reminderKey => {
                                    console.log("key in remainder", reminderKey);
                                    return (
                                        <Chip
                                            label={reminderKey.split(" ").splice(0, 5)}
                                            onDelete={() => this.handeChipReminder(key.id)}
                                        // label={reminderKey.split(" ").splice(0, 5)}
                                        />
                                    )
                                })}
                                {key.collaborators.map(collaboratorkey => {
                                    console.log("key in collaborator", collaboratorkey);
                                    return (
                                        <div>
                                            <div onClick={() => this.handleOpen(collaboratorkey.email)} >
                                                <AccountCircleIcon />
                                            </div>
                                            <div>
                                                <Dialog
                                                    open={this.state.dialogOpen}
                                                    onClose={this.handleClose}>
                                                    <h3 style={{ padding: "1px 1px 1px 10px" }}>Collaborators</h3>
                                                    <Divider />
                                                    <div className="email-css">
                                                        <div><Avatar>R</Avatar></div>
                                                        <div><h3 style={{ padding: "1px 1px 0px 16px" }}>{localStorage.getItem("Email")}</h3></div>
                                                    </div>
                                                    <MenuItem><div style={{ display: " flex" }}>
                                                        <div> <AccountCircleIcon /></div>
                                                        <div>{this.state.mail}</div>
                                                        <div onClick={() => this.handleCancel(key.id, collaboratorkey.userId)}
                                                            style={{ padding: "1px 1px 1px 143px" }}> <ClearIcon /></div>
                                                    </div></MenuItem>
                                                    <div onClick={this.handleClose}>
                                                        <Button>Close</Button>
                                                    </div>
                                                </Dialog>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="align-icons">
                                    <MuiThemeProvider theme={theme}>
                                        <ReminderNoteComponent reminderProps={this.reminderData}
                                            noteID={key.id} />
                                        <Tooltip title="Collabarator">
                                            <CollaboratorComponent collaboratorProps={this.collaboratorData}
                                                noteID={key.id} collaboratorkey={key.userId} />
                                        </Tooltip>
                                        <ColorComponent colorComponentProps={this.handleGetColor}
                                            noteID={key.id}></ColorComponent>
                                        <Tooltip title="Add image">
                                            <ImageOutlinedIcon />
                                        </Tooltip>
                                        <ArchiveComponent archiveData={this.storeData}
                                            noteID={key.id}></ArchiveComponent>
                                    <MoreComponent
                                         propsValue={this.labelData}
                                            deletingData={this.presentData}
                                           
                                            noteID={key.id}
                                        ></MoreComponent>
                                    </MuiThemeProvider>
                                </div>
                            </Card>
                        </div>
                        <div>
                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                            // aria-labelledby="alert-dialog-title"
                            // aria-describedby="alert-dialog-description"
                            >
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        <div>
                                            <InputBase
                                                placeholder="title"
                                                value={this.state.title}
                                                onChange={this.handleTitle}
                                                className="titleDescInput" />
                                        </div>
                                        <div>
                                            <InputBase
                                                placeholder="take a note....."
                                                value={this.state.description}
                                                onChange={this.handledescription}
                                            />
                                        </div>
                                    </DialogContentText>
                                </DialogContent>
                                <div className="update-icons">
                                    <MuiThemeProvider theme={theme}>
                                        <ReminderNoteComponent reminderProps={this.reminderData}
                                            noteID={key.id} />
                                        <Tooltip title="Collabarator">
                                            <CollaboratorComponent collaboratorProps={this.collaboratorData}
                                                noteID={key.id} collaboratorkey={key.userId} />
                                        </Tooltip>
                                        <ColorComponent colorComponentProps={this.handleGetColor}
                                            noteID={key.id}></ColorComponent>
                                        <Tooltip title="Add image">
                                            <ImageOutlinedIcon />
                                        </Tooltip>
                                        <ArchiveComponent archiveData={this.storeData}
                                            noteID={key.id}></ArchiveComponent>
                                        <MoreComponent
                                            deletingData={this.presentData}
                                            labelNoteProps={this.labelData}
                                            noteID={key.id}
                                        ></MoreComponent>
                                    </MuiThemeProvider>
                                </div>
                                <Button onClick={this.handleUpdateCard} color="primary">
                                    Close
                           </Button>
                            </Dialog>
                        </div>
                    </MuiThemeProvider>
                )
            )
        })
        return (
            <div className="getnote-Card">
                {getReminderDetails}
            </div>
        )
    }
}
export default withRouter(GetReminderComponent)