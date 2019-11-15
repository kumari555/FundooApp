import React from 'react'
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Popper from '@material-ui/core/Popper';
import { Paper } from '@material-ui/core';

import { deleteNotes } from '../services/noteServices';
import { getNotes } from '../services/noteServices';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from 'react-router-dom';
import LabelComponent from './labelComponent';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
class MoreComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            anchorEl: null,
            noteIdList: "",
            isDeleted: false,
            isOPen: false,
            afterDelete: [],
            Title: "",
            Description: "",
            arr: [],
            propsValue: ''

        }
    }
    handlemore = (event) => {
        const { currentTarget } = event
        this.setState({
            anchorEl: (this.state.anchorEl ? null : currentTarget)
        })
    }
    handleClickAway = () => {
        this.setState({
            anchorEl: null,
        });
    };
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
    handleDeleteNote = () => {
        // var trash = this.props.noteID
        var data = {
            noteIdList: [this.props.noteID],
            isDeleted: !this.state.isDeleted
        }
        console.log("data in more---->", data)
        deleteNotes(data)
            .then(response => {
                console.log("response in more component --->", response)
                this.getNotesf()
                this.props.deletingData(true)
                this.setState({
                    afterDelete: response
                })
                // console.log("remaining data in delete component", this.state.afterDelete);
            })
            .catch(err => {
                console.log("err while updating", err);
            })
    }
    handlelabel = () => {
        this.setState({
            isOPen: !this.state.isOPen
        })
    }
    handleShowQuestion = async (id) => {
        var data = [
            this.props.noteTitle,
            this.props.noteDescription,
            this.props.noteID,
            this.props.questionAndAnswerProps,
            true
        ]
        console.log("props in morecomponent---->", data);
        this.props.history.push(`/draftEditorPage/${id}`, data)
    }
    handleAskQuestion = async () => {
        //   console.log("props in morecomponent ======>", this.props.questionAndAnswerProps);
        var data = [
            this.props.noteTitle,
            this.props.noteDescription,
            this.props.noteID,
        ]
        console.log("props in morecomponent", data);
        this.props.history.push("/draftEditorPage", data)
    }
    handleLabelData = async (value) => {
        await this.props.propsValue(value)
        // this.setState({
        //     anchorEl: null
        // })
    }
    render() {
        // console.log("props in morecomponent", this.props.noteTitle, this.props.noteDescription);
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popper' : undefined;
        return (
            <div>
                <div>
                
                    <Tooltip title="more" onClick={this.handlemore}><MoreVertOutlinedIcon /></Tooltip>
                    <Popper id={id} open={open} anchorEl={anchorEl}>
                          <ClickAwayListener onClickAway={this.handleClickAway}>
                        <Paper><MenuItem onClick={this.handleDeleteNote}>
                            <div>Delete note</div></MenuItem>
                            <LabelComponent labelToNote={this.props.noteID} getLabelProps={this.handleLabelData}
                            />
                            {console.log('555555----', this.props.questionAndAnswerProps)}
                            {
                                this.props.questionAndAnswerProps !==undefined ?
                                 
                            this.props.questionAndAnswerProps.length > 0 ?
                            <MenuItem>
                                <div onClick={() => this.handleShowQuestion(this.props.noteID)}>show question</div></MenuItem>
                                        : <MenuItem> <div onClick={() => this.handleAskQuestion()}>Ask a question</div></MenuItem>
                            : null
                            }
                        </Paper>
                        </ClickAwayListener>
                    </Popper>
                </div>
            </div>
        )
    }
}
export default withRouter(MoreComponent)

