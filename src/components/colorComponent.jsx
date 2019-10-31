import React from 'react'
import Popper from '@material-ui/core/Popper';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import { Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
const colors = [
    { name: "blue", hexCode: " #BC8F8F" },
    { name: "orange", hexcode: "#FFDAB9" },
    { name: "mistyRose", hexcode: "#FFE4E1" },
    { name: "skyblue", hexcode: "#AFEEEE" },
    { name: "beige", hexcode: "#F5F5DC" },
    { name: "golden", hexcode: "#EEE8AA" },
    { name: "darkseagreen", hexcode: "#D2B48C" },
    { name: "steelblue", hexcode: "#B0E0E6" },
    { name: "gray", hexcode: "#D3D3D3" },
    { name: "lightorange", hexcode: "#BC8F8F" },
    { name: "violet", hexcode: "#E6E6FA" },
    { name: "salmon", hexcode: "#FFC0CB" },
    { name: "green", hexcode: "#F0FFF0" },
    { name: "blue", hexcode: "#F0F8FF" },
    { name: "blue", hexcode: "#FFF0F5" },
    { name: "blue", hexcode: "#F5F5DC" }
]
export default class ColorComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
        }
    }
    handlecolorOpen = (event) => {
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
    handleColor = (event) => {
        this.props.colorComponentProps(event.target.value, this.props.noteID)
    }
    render() {
        const colorList = colors.map((key) => {
            // console.log("show colors--->", key)
            return (
                <IconButton style={{ backgroundColor: key.hexcode }}
                    value={key.hexcode} onClick={this.handleColor}>
                </IconButton>
            )
        })
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popper' : undefined;
        return (
           
                <ClickAwayListener onClickAway={this.handleClickAway}>
                    <div>
                <Tooltip title="color pallet" onClick={(event) => this.handlecolorOpen(event)}><PaletteOutlinedIcon /></Tooltip>
                <Popper id={id} open={open} anchorEl={anchorEl}>
                    <Paper className="color-poper">
                        <div className="color-css">
                            {colorList}
                        </div>
                    </Paper>
                    </Popper>
                    </div>
                </ClickAwayListener>
           
        )
    }
}