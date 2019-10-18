import React from 'react'
import { getNotes } from '../services/noteServices';
import Card from '@material-ui/core/Card';
import { MuiThemeProvider, createMuiTheme, InputBase } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import UndoOutlinedIcon from '@material-ui/icons/UndoOutlined';
import RedoOutlinedIcon from '@material-ui/icons/RedoOutlined';
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
class GetNoteComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            getNoteData: [],
            open: false,
            noteId: "",
            title: "",
            description: "",
            Id: [],
            lableId: "",
            noteIdList: "",
            color: "",
            dialogOpen: false,
            mail: ""
        }
        // this.handleUpdateCard = this.handleUpdateCard.bind(this)
    }
    componentWillMount() {
        this.getNotes()
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
                this.getNotes()
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
    handleUpdateCard = (id, oldTitle, oldDescription, oldColor) => {
        this.setState({
            open: false,
            noteId: id,
            title: oldTitle,
            description: oldDescription,
            color: oldColor
        })
        // console.log("data for updation", this.state.noteId, this.state.title, this.state.description);
        var data = {
            noteId: this.state.noteId,
            title: this.state.title,
            description: this.state.description,
            color: this.state.color
        }
        console.log("data in update note--->", data)
        updateNotes(data)
            .then(response => {
                console.log("response of update details--->", response)
                this.getNotes()
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
            this.getNotes()
        }
    }
    storeData = (updateNote) => {
        if (updateNote) {
            this.getNotes()
        }
    }
    labelData = (updateNote) => {
        if (updateNote) {
            this.getNotes()
        }
    }
    reminderData = (updateNote) => {
        if (updateNote) {
            this.getNotes()
        }
    }
    collaboratorData = (updateNote) => {
        if (updateNote) {
            this.getNotes()
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
            })
    }
    handeChipReminder = (noteID) => {
        var data = {
            noteIdList: [noteID]
        }
        removeReminderNotes(data)
            .then(response => {
                console.log("response in removeing remainder Notes", response);
            })
    }
    handleOpen = (email) => {
        // console.log("collaborator state", email);
        this.setState({
            dialogOpen: true,
            mail: email
        })
        console.log("collaborator state", this.state.mail);

    }
    handleClose = () => {
        this.setState({
            dialogOpen: false
        })
    }
    handleCancel = (noteId, userId) => {
        console.log("response in remove collaborator in getnotes", noteId, userId);
        removeCollaboratorsNotes(noteId, userId)
            .then(response => {
                console.log("response in remove collaborator getnotes", response);
            })
    }
    render() {
        // console.log("dataaaaaaaaaaaaaaa",this.state.mail);

        var list = this.props.gridViewProps ? "noteList" : null
        var getNoteDetails = this.state.getNoteData.reverse().filter(searchFunction(this.props.SearchingNotesProps)).map((key, index) => {
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
                                        onClick={() => this.handleUpdateCard(key.id, key.title, key.description, key.color)}
                                    />
                                </div>
                                <div className="getNotes-align" onClick={this.handleClickOpen}>
                                    <InputBase
                                        placeholder="take a note....."
                                        value={key.description}
                                        onClick={() => this.handleUpdateCard(key.id, key.title, key.description, key.color)}
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
                                            label={reminderKey}
                                            onDelete={() => this.handeChipReminder(key.id)}
                                            label={reminderKey.split(" ").splice(0, 5)}
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

                                                    <div> <AccountCircleIcon /></div>
                                                    <div>{this.state.mail}</div>
                                                    <div onClick={() => this.handleCancel(key.id, collaboratorkey.userId)}> <ClearIcon /></div>

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
                                            deletingData={this.presentData}
                                            labelNoteProps={this.labelData}
                                            noteID={key.id}
                                            noteTitle={key.title}
                                            noteDescription={key.description}
                                        ></MoreComponent>
                                    </MuiThemeProvider>
                                </div>

                                {key.questionAndAnswerNotes.map(questionKey => {
                                    console.log("key in questionKey", questionKey);
                                    return (
                                        <div>
                                            <Divider />
                                            <p>Question asked</p>
                                            {questionKey.message}
                                        </div>
                                    )
                                })}
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
                                        <AddAlertOutlinedIcon />
                                        <PersonAddOutlinedIcon />
                                        <ColorComponent colorComponentProps={this.handleGetColor}
                                            noteID={key.id}></ColorComponent>
                                        <ImageOutlinedIcon />
                                        <ArchiveComponent noteID={key.id}></ArchiveComponent>
                                        <MoreComponent
                                            noteID={key.id}></MoreComponent>
                                        <UndoOutlinedIcon />
                                        <RedoOutlinedIcon />
                                    </MuiThemeProvider>
                                </div>
                                <Button onClick={this.handleUpdateCard} color="primary">
                                    Close
                           </Button>
                            </Dialog>
                        </div>
                    </MuiThemeProvider >
                )
            )
        })
        return (
            <div className="getnote-Card" >
                {getNoteDetails}
            </div>
        )
    }
}
export default withRouter(GetNoteComponent)
