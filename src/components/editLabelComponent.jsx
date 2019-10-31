import React from 'react'
import { withRouter } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { changeColorNotes } from '../services/noteServices';
import ColorComponent from '../components/colorComponent';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import Tooltip from '@material-ui/core/Tooltip';
import ArchiveComponent from '../components/archiveComponent';
import Chip from '@material-ui/core/Chip';
import { updateNotes } from '../services/noteServices';
import MoreComponent from '../components/moreComponent';
import { removeLabelToNotes } from '../services/noteServices';
import UndoOutlinedIcon from '@material-ui/icons/UndoOutlined';
import RedoOutlinedIcon from '@material-ui/icons/RedoOutlined';
import { removeReminderNotes } from '../services/noteServices';
import { getNotesListByLabel } from '../services/noteServices';
import ReminderNoteComponent from '../components/reminderNotesComponent';
import CollaboratorComponent from '../components/collaboratorComponent';
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
        // MuiPaper: {
        //     elevation1: {
        //         boxShadow: "3px 1px 4px 2px rgb(206, 206, 206)",
        //     }
        // }

    }
})
class EditLabelComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            labelData: [],
            getNoteData: [],
            labelName: "",
            editLabel: []

        }
    }

    componentWillMount() {
        this.getNotesListByLabel()
    }
    getNotesListByLabel = () => {
        //console.log("data in edit label------------->", this.props.labelAtNote);
        var data = {
            labelName: this.props.labelAtNote
        }
        getNotesListByLabel(data, this.props.labelAtNote)
            .then(response => {
                //console.log("data in checklist editlabels--->", response.data.data.data);
                this.getNotesListByLabel()
                this.setState({
                    editLabel: response.data.data.data
                })
            })
    }
    handleGetColor = (value, noteID) => {
        var data = {
            noteIdList: [noteID],
            color: value,
        }
        //console.log("response in getNotes for color and id--->",color)
        changeColorNotes(data)
            .then(response => {
                console.log("response in getNotes for color and id--->", response)
                this.getNotesListByLabel()
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
                this.getNotesListByLabel()
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
            this.getNotesListByLabel()
        }
    }
    storeData = (updateNote) => {
        if (updateNote) {
            this.getNotesListByLabel()
        }
    }
    labelData = (updateNote) => {
        if (updateNote) {
            this.getNotesListByLabel()
        }
    }
    reminderData = (updateNote) => {
        if (updateNote) {
            this.getNotesListByLabel()
        }
    }
    handeChipLabel = (noteId, lableId) => {
        var data = {
            lable: lableId,
            id: noteId
        }
        removeLabelToNotes(data, noteId, lableId)
            .then(response => {
                console.log("label in  note --->", response);
                this.getNotesListByLabel()
            })
    }
    handeChipReminder = (noteID) => {
        var data = {
            noteIdList: [noteID]
        }
        removeReminderNotes(data)
            .then(response => {
                console.log("response in removeing remainder Notes", response);
                this.getNotesListByLabel()
            })
    }
    render() {
        var list = this.props.gridViewProps ? "noteList" : null
        var editLabelNotesData = this.state.editLabel.map((key) => {
           //a console.log("key data offf labels--->", key);
            return (
                <MuiThemeProvider theme={theme}>
                    <div className="card-note" id={list}>
                        <MuiThemeProvider theme={theme}>
                            <Card className="card" style={{ backgroundColor: key.color }} id={list}>
                                <div className="center-align" onClick={this.handleClickOpen}>
                                    <InputBase
                                        placeholder="title"
                                        value={key.title}
                                        onClick={() => this.handleUpdateCard(key.id, key.title, key.description)}
                                    />
                                </div>
                                <div className="center-align" onClick={this.handleClickOpen}>
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
                                })}
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
                                <div className="align-icons">
                                    <MuiThemeProvider theme={theme}>

                                        <ReminderNoteComponent reminderProps={this.reminderData}
                                            noteID={key.id} />
                                        <Tooltip title="Collabarator">
                                            <CollaboratorComponent />
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
                                            noteID={key.id}></MoreComponent>
                                    </MuiThemeProvider>
                                </div>
                            </Card>
                        </MuiThemeProvider>
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
                                    <MoreComponent noteID={key.id}></MoreComponent>
                                    <UndoOutlinedIcon />
                                    <RedoOutlinedIcon />
                                </MuiThemeProvider>
                            </div>
                            <Button onClick={this.handleUpdateCard} color="primary">
                                Close
                           </Button>
                        </Dialog>
                    </div>
                </MuiThemeProvider>
            )
        })
        return (
            <div className="labelnotes" >
                {editLabelNotesData}
            </div>
        )
    }
}
export default withRouter(EditLabelComponent)