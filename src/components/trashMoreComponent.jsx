import React from 'react'
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Popper from '@material-ui/core/Popper';
import { Paper } from '@material-ui/core';

import { deleteForeverNotes } from '../services/noteServices';
import { getNotes } from '../services/noteServices';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import { deleteNotes } from '../services/noteServices';
export default class TrashMoreComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            anchorEl: null,
            noteIdList: "",
            isDeleted: true,
            isOPen: false,
            afterDelete: []
        }
    }
    handlemore = (event) => {
        const { currentTarget } = event
        this.setState({
            anchorEl: (this.state.anchorEl ? null : currentTarget)
        })
    }
    handleClickAway = async () => {
        await this.setState({
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
        var data = {
            noteIdList: [this.props.noteID],
        }
        console.log("data in more trash---->", data)

        deleteForeverNotes(data)
            .then(response => {
                console.log("data in delete for ever", response);
                this.getNotesf()
                this.props.deletingData(true)
                this.setState({
                    afterDelete: response
                })

                console.log("remaining data in bin component", this.state.afterDelete);
            }).catch(err => {
                console.log("err while updating", err);
            })
    }
    handlelabel = () => {
        this.setState({
            isOPen: !this.state.isOPen
        })
    }
    handleRestore = () => {
        var data = {
            noteIdList: [this.props.noteID],
            isDeleted: false
        }
        console.log("data in more---->", data)
        deleteNotes(data)
            .then(response => {
                console.log("response in more component --->", response)
                this.getNotesf()
                this.setState({
                    afterDelete: response
                })
                this.props.deletingData(true)
                console.log("remaining data in delete component", this.state.afterDelete);
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
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div>
                    <Tooltip title="more" onClick={this.handlemore}><MoreVertOutlinedIcon /></Tooltip>
                    <Popper id={id} open={open} anchorEl={anchorEl}>
                        <Paper><MenuItem onClick={this.handleDeleteNote}>
                            <div>Delete Forever</div></MenuItem>
                            <MenuItem onClick={this.handleRestore}><div>Restore</div></MenuItem>
                        </Paper>
                    </Popper>

                </div>
            </ClickAwayListener>
        )
    }
}