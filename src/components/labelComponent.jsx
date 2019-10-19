import React from 'react'

import Popper from '@material-ui/core/Popper';
import { Paper, Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import InputBase from '@material-ui/core/InputBase';
import { noteLabels } from '../services/noteServices';
import MenuItem from '@material-ui/core/MenuItem';
import { NoteLabelList } from '../services/noteServices';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { addLabelToNotes } from '../services/noteServices';
import { getNotes } from '../services/noteServices';
export default class LabelComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            isDeleted: true,
            labelData: [],
            label: "",
            getLabelNote: [],
            noteId: "",
            lableId: "",
            poperOpen: false
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
    componentWillMount() {
        this.NoteLabelList()
    }
    NoteLabelList = () => {
        NoteLabelList()
            .then(response => {
                console.log("getLabel data ---->", response.data.data.details);
                this.setState({
                    getLabelNote: response.data.data.details
                })
            })
            .catch(err => {
                console.log("err while updating", err);
            })

    }
    handleLabel(event) {
        const { currentTarget } = event
        this.setState({
            anchorEl: (this.state.anchorEl ? null : currentTarget)
        })
    }
    handleCreateLabel = (event) => {
        var label = event.target.value
        this.setState({
            label: label
        })
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


    handlechecklist = (lableId) => {
        var data = {
            noteId: this.props.labelToNote,
            lableId: lableId
        }
        addLabelToNotes(data, this.props.labelToNote, lableId)
            .then(response => {
                console.log("data in checklist labels--->", response);
                this.props.labelDataProps(true)
                this.getNotesf()
                
            })


    }

    render() {
        var getLabelDetails = this.state.getLabelNote.map((key, index) => {
            //console.log("label data ater maping---->", key);
            //console.log("label data ater maping---->", index);
            return (
                <ul>
                    <FormControlLabel
                        control={
                            <Checkbox value="checkedA" onClick={() => this.handlechecklist(key.id)} />
                        }
                        label={key.label}
                    />
                </ul>
            )
        })
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popper' : undefined;
        return (
            <div>

                <MenuItem onClick={(event) => this.handleLabel(event)} >
                    <p className="addLabel-css" >
                        Add label</p>
                </MenuItem>
                <Popper id={id} open={open} anchorEl={anchorEl} >
                    <Paper>
                        <div>Label Note</div>
                        <div>
                            <InputBase
                                placeholder="take a note....."
                                onChange={this.handleCreateLabel}
                                value={this.state.label}
                            />
                        </div>
                        <Divider />
                        <div className="addLabel">
                            <div className="label-css">
                                <h4>+</h4>
                                <div style={{ padding: "14px 73px 1px 0px" }}>
                                    <Button size="small" color="primary" onClick={this.handleLableNote}>
                                        Create</Button></div>
                            </div>
                            {getLabelDetails}
                        </div>
                    </Paper>
                </Popper>

            </div>

        )
    }
}