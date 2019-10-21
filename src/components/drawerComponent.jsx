import React from 'react';
import Drawer from '@material-ui/core/Drawer';

import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import Divider from '@material-ui/core/Divider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
import { NoteLabelList } from '../services/noteServices';

import ListItem from '@material-ui/core/ListItem';

import Modal from '@material-ui/core/Modal';

import InputBase from '@material-ui/core/InputBase';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import { noteLabels } from '../services/noteServices';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { deleteNoteLabel } from '../services/noteServices';
import { updateNoteLabel } from '../services/noteServices';
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: "64px",
                height: " 90%",
                overflowY: "scroll",
                zIndex: " 999",
                '@media (min-width: 500px)': {
                    top: " 51px"
                }
            }
        },

        MuiPaper: {
            elevation0: {
                boxShadow: "1px 1px 9px 1px rgb(206, 206, 206)"
            }
        },

    }
})
class DrawerComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            close: false,
            appTitle: "FundoNotes",
            getLabelNote: [],
            open: false,
            editLabel: "",
            labelId: "",
            userId: "",
            labelName: "",
            isDeleted: true,
            afterDelete: []
        }
    }
    // handleDrawerClose = () => {
    //     this.setState({
    //         close: true
    //     });
    // };
    componentWillMount() {
        this.NoteLabelList()
    }
    NoteLabelList = () => {
        NoteLabelList()
            .then(response => {
                console.log("getLabel in drawer component data ---->", response.data.data.details);

                this.setState({
                    getLabelNote: response.data.data.details
                })
            })
            .catch(err => {
                console.log("err while updating", err);
            })
    }
    handleArchiveList = async () => {
        await this.setState({
            appTitle: "Archive"
        })
        this.props.history.push('/archivePage', this.state.appTitle)
    }
    handleTrashList = async () => {
        await this.setState({
            appTitle: "Bin"
        })
        this.props.history.push('/trashPage', this.state.appTitle)
    }

    handleReminderList = async () => {
        await this.setState({
            appTitle: "Reminder"
        })
        this.props.history.push('/reminderPage', this.state.appTitle)
    }
    handleNoteList = async () => {
        await this.setState({
            appTitle: "FundoNotes"
        })
        this.props.history.push('/dashboard', this.state.appTitle)
    }
    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }
    handleCreateLabel = (event) => {
        var label = event.target.value
        this.setState({
            label: label
        })
    }
    // handleLabelList = (lableName) => {
    //     var data = {
    //         labelName: lableName
    //     }
    //     getNotesListByLabel(data, lableName)
    //         .then(response => {
    //             console.log("data in checklist labels--->", response);
    //  noteLabelProps.setState({
    //  noteLabelPropseditLabel: response
    //  noteLabelProps
    //  noteLabelProps
    // }noteLabelProps
    handleLabelList = async (lableName) => {
        await this.setState({
            editLabel: lableName
        })
        this.props.history.push(`/editLabelPage/${this.state.editLabel}`, this.state.editLabel)
    }
    handleLableNote = async () => {
        var data = {
            label: this.state.label,
            isDeleted: false,
            userId: localStorage.getItem("userId")
        }
        // console.log("data in labels", data);

        await noteLabels(data)
            .then(response => {
                console.log("data in labelsNotes--->", response.data)
                this.setState({
                    labelData: response.data
                })
                console.log("labelData--->", this.state.labelData);
                this.NoteLabelList()
            })
            .catch(err => {
                console.log("err while updating", err);
            })
    }
    handleDelete = (labelId) => {
        var data = {
            id: labelId,
            isDeleted: false
        }
        deleteNoteLabel(data, labelId)
            .then(response => {
                console.log("deleted data in edit labels", response.data.data);
                this.NoteLabelList()

            })

    }
    handleUpadateLabel = (e) => {
        this.setState({
            labelName: e.target.value
        })
        console.log("data---->", this.state.labelName);
    }
    handleUpadate = (id, label) => {
        //console.log("data---->",data);

        var data = {
            id: id,
            label: this.state.labelName,
        }
        console.log("data---->", data);
        updateNoteLabel(id, data)
            .then(response => {
                console.log("updated data for label", response);
                this.NoteLabelList()
            })
    }
    handleNoteLabels = (updateNote) => {
        if (updateNote) {
            this.getArchiveNote()
        }
    }
    render() {
        var drawerLabelDetails = this.state.getLabelNote.map((key, index) => {
            console.log("label data ater maping---->", key);
            //console.log("label data ater maping---->", index);
            return (
                <ListItem>
                    <MenuItem onClick={() => this.handleLabelList(key.label)} noteLabelProps={this.handleNoteLabels}>
                        <LabelOutlinedIcon />
                        <div style={{ padding: "1px 1px 1px 16px" }}> {key.label}</div>
                    </MenuItem>
                </ListItem>
            )
        })
        var editLabelDetails = this.state.getLabelNote.map((key, index) => {
            console.log("label data ater maping---->", key);
            //console.log("label data ater maping---->", index);
            return (
                <ListItem>
                    <div className="label-align">
                        <div> <DeleteOutlineOutlinedIcon onClick={() => this.handleDelete(key.id)} /></div>
                        <div style={{ padding: "1px 138px 1px 1px" }}>
                            <InputBase
                                defaultValue={key.label}
                                // value={this.state.labelName}
                                onChange={this.handleUpadateLabel} />
                        </div>
                        <div><EditOutlinedIcon onClick={() => this.handleUpadate(key.id)} /></div>
                    </div>
                </ListItem>
            )
        })
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Drawer
                        variant="persistent"
                        open={this.props.menuList}>
                        <div>
                            <MenuItem onClick={this.handleNoteList}>
                                <div className="menuIcons">
                                    <div style={{ padding: "15px" }}><EmojiObjectsOutlinedIcon /></div>
                                    <div className="icon-text"><p>notes</p></div>
                                </div>
                            </MenuItem>
                            <MenuItem onClick={this.handleReminderList}>
                                <div className="menuIcons">
                                    <div style={{ padding: "15px" }}><NotificationsOutlinedIcon /></div>
                                    <div className="icon-text"><p>reminders</p></div>
                                </div> </MenuItem>
                            <Divider />
                            <div>
                                <div className="menuIcons">
                                    <div className="icon-text"><p>Labels</p></div>
                                </div>
                                {drawerLabelDetails}
                                <MenuItem onClick={this.handleOpen}>
                                    <div className="menuIcons">
                                        <div style={{ padding: "15px" }}><EditOutlinedIcon /></div>
                                        <div className="icon-text" style={{ padding: "14px 1px 0px 1px" }}>Edit Labels</div></div></MenuItem>
                                <Modal
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    style={{ left: "451px" }}
                                    className="editLabels">
                                    <div className="addeditLabel">
                                        <h3>EditLabels</h3>
                                        <div className="labeldata">
                                            <h4>+</h4>
                                            <div style={{ padding: "14px 73px 1px 13px" }}>
                                                <InputBase
                                                    placeholder="create a label....."
                                                    onChange={this.handleCreateLabel}
                                                    value={this.state.label}
                                                />
                                            </div>
                                            <div style={{ padding: "18px 29px 9px 5px" }} onClick={this.handleLableNote}>
                                                <DoneOutlinedIcon /></div>
                                        </div>
                                        <Divider />
                                        <div>{editLabelDetails}</div>

                                    </div>
                                </Modal>
                            </div>
                            <Divider />
                            <MenuItem onClick={this.handleArchiveList}>
                                <div className="menuIcons">
                                    <div style={{ padding: "15px" }}

                                    ><ArchiveOutlinedIcon /></div><div className="icon-text"><p>archive</p></div>
                                </div></MenuItem>
                            <MenuItem onClick={this.handleTrashList}>
                                <div className="menuIcons">
                                    <div style={{ padding: "15px" }}
                                    >
                                        <DeleteForeverOutlinedIcon /></div><div className="icon-text"><p>bin</p></div>
                                </div></MenuItem>
                        </div>
                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(DrawerComponent)

