import React from 'react'
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushIcon from '@material-ui/icons/Brush';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ReminderNoteComponent from '../components/reminderNotesComponent';
import UndoOutlinedIcon from '@material-ui/icons/UndoOutlined';
import RedoOutlinedIcon from '@material-ui/icons/RedoOutlined';
import { addNotes } from '../services/noteServices';
import Tooltip from '@material-ui/core/Tooltip';
import MoreComponentOfNote from '../components/moreComponentOfNote';
import CollaboratorComponent from '../components/collaboratorComponent';
import ColorComponent from '../components/colorComponent';
import { changeColorNotes } from '../services/noteServices';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
const theme = createMuiTheme({
    overrides: {

        MuiSvgIcon: {
            root: {
                color: "rgba(0, 0, 0, 0.54)",
                fontSize: "20px"
            }
        }
    }
})

export default class NotecardComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Open: false,
            noteData: [],
            title: "",
            description: "",
            Tittle: "",
            Description: "",
            isArchived: false,
            selectedDate: "",
            selectedColor: "",
            checkItem: false,
            checkLabel: false,
            arr1: [1],

        }
    }
    handleCardopen = () => {
        this.setState({
            Open: !this.state.Open
        })
    }
    handleTitle = (event) => {
        var Tittle = event.target.value
        this.setState({
            Tittle: Tittle
        })
    }
    handleDescription = (event) => {
        var Description = event.target.value
        this.setState({
            Description: Description
        })
    }
    reminderData = async (value) => {
        console.log("value of seleted reminder", value);
        await this.setState({
            selectedDate: value
        })
        console.log("data after set state", this.state.selectedDate);
    }

    handleGetColor = (value) => {
        console.log("response in getNotes for color and id  create--->", value)
        this.setState({
            selectedColor: value
        })
        console.log("response in getNotes for color and id--->", this.state.selectedColor)
    }
    handleCreateNote = () => {
        // console.log("data after set state---", this.state.selectedDate);
        var data = {
            title: this.state.Tittle,
            description: this.state.Description,
            isArchived: this.state.isArchived,
            reminder: this.state.selectedDate,
            color: this.state.selectedColor,
        }
        console.log("data in notes----------------", data);
        addNotes(data)
            .then(response => {
                console.log("data in addNotes--->", response.data.status.details)
                this.setState({
                    noteData: response.data.status.details,
                    Open: false,
                    Tittle: "",
                    Description: "",
                    selectedDate: "",
                })
                // console.log("notedata", this.state.noteData);
                this.props.noteCard(this.state.noteData)
            })
    }
    handlearchiveNote = () => {
        this.setState({
            isArchived: true
        })
    }
    handleCheckItem = (value) => {
        console.log("data to data ---->", value);
        this.setState({
            checkItem: !this.state.checkItem
        })

    }
    handleUpadateList = () => {
        this.setState({
            checkLabel: !this.state.checkLabel
        })
        console.log("update check label data---->", this.state.checkLabel);

    }
    // handleUpadateCheckList = () => {
    //     this.setState({
    //         checkLabel: !this.state.checkLabel
    //     })
    //     console.log("update check label data---->", this.state.checkLabel);
    // }
    handlekey = async (event) => {
        if (event.key === "Enter") {
            await this.setState({
                // arr1: event.target.value,
                arr1: [...this.state.arr1, 1]
            })
            console.log("data inarr1", this.state.arr1);
        }
    }
    render() {
        console.log("token in note page----->", localStorage.getItem('token'));
        return (
            !this.state.Open ?
                <div className="noteComponent" >
                    <Card className="note-card" onClick={this.handleCardopen}>
                        <div className="createText-align">
                            <InputBase
                                placeholder="take a note....."
                                value={this.state.title}
                            />
                        </div>
                        <div className="icons">
                            <MuiThemeProvider theme={theme}>
                                <CheckBoxOutlinedIcon />
                                <BrushIcon />
                                <ImageOutlinedIcon />
                            </MuiThemeProvider>
                        </div>
                    </Card>
                </div>
                : <div className="inside-card-div">
                    <Card className="inner-card">
                        <div className="inner-note">
                            <InputBase
                                placeholder="Title" onChange={this.handleTitle}
                                value={this.state.Tittle}
                            />
                            <div>

                                {!this.state.checkItem ?
                                    <InputBase
                                        placeholder="takea note.."
                                        onChange={this.handleDescription}
                                        value={this.state.Description}
                                    /> :
                                    <div>
                                        {
                                            !this.state.checkLabel ?
                                                this.state.arr1.map((key) => {
                                                    return (<div>

                                                        <InputBase
                                                            placeholder=" ListItem..."
                                                            onChange={this.handleUpadateList}
                                                            onKeyPress={(event) => this.handlekey(event)}
                                                        //value={this.state.checkLabel}
                                                        />
                                                        <Divider />
                                                    </div>)
                                                })
                                                :
                                               ( <div style={{ padding: "40px 1px 1px 16px" }}>
                                                    <InputBase
                                                        placeholder=" ListItem..."
                                                        value={this.state.checkLabel}
                                                        onChange={this.handleUpadateList}
                                                        onKeyPress={(event) => this.handlekey(event)}
                                                    />
                                                    <Divider />
                                                </div>)
                                        }
                                    </div>
                                }
                                <div>
                                    <Chip
                                        label={this.state.selectedDate}
                                    />
                                </div>
                            </div>
                            <div className="inner-icons">
                                <MuiThemeProvider theme={theme}>
                                    <ReminderNoteComponent reminderPropsToCreateNote={this.reminderData} />
                                    <Tooltip title="Collabarator">
                                        <CollaboratorComponent /></Tooltip>
                                    <ColorComponent colorComponentProps={this.handleGetColor}
                                        backgroundColor={this.state.selectedColor} />
                                    <Tooltip title="Add image">
                                        <ImageOutlinedIcon /></Tooltip>

                                    <Tooltip title="Archive">
                                        <ArchiveOutlinedIcon onClick={this.handlearchiveNote} /></Tooltip>
                                    <Tooltip title="more">
                                        <MoreComponentOfNote ckeckListProps={this.handleCheckItem}>
                                        </MoreComponentOfNote>
                                    </Tooltip>

                                    <Tooltip title="undo">
                                        <UndoOutlinedIcon /></Tooltip>

                                    <Tooltip title="redo">
                                        <RedoOutlinedIcon /></Tooltip>
                                    <div>
                                        <Button className="button" onClick={this.handleCreateNote}>Close</Button>
                                    </div>
                                </MuiThemeProvider>

                            </div>
                        </div>

                    </Card>
                </div>
        )
    }
}
