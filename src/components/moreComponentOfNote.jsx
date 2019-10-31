import React from 'react'
import Popper from '@material-ui/core/Popper';
import { Paper } from '@material-ui/core';
import { getNotes } from '../services/noteServices';
import LabelComponent from './labelComponent';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';

export default class MoreComponentOfNote extends React.Component {
    constructor() {
        super()
        this.state = {
            anchorEl: null,
            listOPen: false,
            // isOPen: false,
            isOpen: false

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

    // handlelabel = () => {
    //     this.setState({
    //         OPen: !this.state.isOPen
    //     })
    // }
    // handleShowList = () => {
    //     this.setState({
    //         listOPen: !this.state.listOPen
    //     })
    // }
    handleNoteCard = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
        console.log("props for list item", this.state.isOpen);
        this.props.ckeckListProps(true)
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

                    <Paper>
                        <LabelComponent labelToNote={this.props.noteID}></LabelComponent>
                        <div>
                            <MenuItem onClick={this.handleNoteCard}
                            >
                                <div ckeckListProps={this.state.isOpen}>Show tick boxes</div></MenuItem></div>
                    </Paper>

                </Popper>
                </div>
            </ClickAwayListener>
        )
    }
}