import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import keep from '../assets/keep-512.png';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import DrawerComponent from '../components/drawerComponent';
import Divider from '@material-ui/core/Divider';

import Avatar from '@material-ui/core/Avatar';

import { ProfileImage } from '../services/userServices';


import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';

import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import GridOnIcon from '@material-ui/icons/GridOn';
//import SigninComponent from '../components/signinComponent';
const Url = 'http://fundoonotes.incubation.bridgelabz.com/'
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            root: {
                // display: "flex",
                // zIndex: 9999,
                //flexDirection: "column"
            },
            colorPrimary: {
                color: "rgba(0, 0, 0, 0.87)",
                backgroundColor: "white"
            }
        },
        MuiSvgIcon: {
            root: {
                color: "rgba(0, 0, 0, 0.54)"
            }
        },


    }
})
class DashboardComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            isOpen: false,
            value: "",
            selectedFile: null,
            search: "",
            listOpen: false,
            gridOpen: false,
            appTitle: "FundoNotes",
            imageSet: false,
            setPath: "",
            imagepath: ""
        }
    }
    handlemenulist = async () => {
        await this.setState({
            isOpen: !this.state.isOpen
        })
        this.props.transitionProps(true)
        console.log("props for list item", this.state.isOpen);
    }
    // handleProfileImage = (event) => {
    //     this.setState = {
    //         selectedImage: event.target.file[0]
    //     }
    // }
    handleAccount = (event) => {
        this.setState({
            anchorEl: (this.state.anchorEl ? null : event.currentTarget)
        })
    }
    handlelogout = () => {
        this.props.history.push('/signin')
    }
    handleaccount = () => {
        this.props.history.push('/register')
    }
    handleSearch = (event) => {
        console.log("value in serchbar --->", event.target.value);

        this.props.SearchNotes(event.target.value)
    }

    handleProfileImage = async (event) => {
        await this.setState({
            selectedFile: event.target.files[0]
        })
        console.log("imgae path -->", event.target.files[0]);
        const data = new FormData();
        data.append('file', event.target.files[0])
        //console.log("data of image--->", this.state.selectedFile);

        ProfileImage(data)
            .then(response => {
                console.log("data of image--->", response.data.status.imageUrl)

                this.setState({
                    selectedFile: Url + response.data.status.imageUrl,
                    imageSet: true
                })
                localStorage.setItem("imageURL", this.state.selectedFile)


                console.log("after setting state image url", this.state.selectedFile);

            })
            .catch(err => {
                console.log("err while updating", err);
            })
    }

    handleListIcon = async () => {
        await this.setState({
            listOpen: !this.state.listOpen
        })
        this.props.listViewProps(this.state.listOpen)
        console.log("value handlelistview in array-->", this.state.listOpen);
    }
    handleGridIcon = async () => {
        await this.setState({
            listOpen: !this.state.listOpen
        })
        this.props.listViewProps(this.state.listOpen)
        console.log("value sskjdfgdsh in array-->", this.state.listOpen);
    }
    handleRefreash = () => {
        window.location.reload()
    }
    componentWillMount() {
        const match = window.matchMedia('(max-width: 600px)');
        if (match.matches) {
            this.setState({
                isOpen: false
            })
        } else {
            this.setState({
                isOpen: false
            })
        }
        match.addListener((res) => {
            if (res.matches) {
                this.setState({
                    isOpen: false
                })
            }
        })
    }
    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popper' : undefined;
        return (
            <div>
                <div>
                    <MuiThemeProvider theme={theme}>
                        <AppBar className="dashboard-appbar">
                            <MuiThemeProvider theme={theme}>
                                <Toolbar>
                                    <div className="dashboard-div1">
                                        <div className="menuicon">
                                            <IconButton onClick={this.handlemenulist} >
                                                <MenuIcon />
                                            </IconButton>
                                        </div>
                                        <div className="fundo-image-div">
                                            <img className="fundo-image" src={keep} alt="profile" />
                                        </div>
                                        <div className="fundo-text">
                                            {this.props.location.state ? this.props.location.state : this.state.appTitle}
                                        </div>
                                    </div>
                                    <div className="searchbar">
                                        <div>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            style={{ width: " 100%" }}
                                            placeholder="Search…"
                                            // value={this.state.search}
                                            onChange={this.handleSearch}
                                        />
                                    </div>
                                    <div className="appbar-div2">
                                        <div style={{ padding: "11px 24px 1px 1px" }}> <ShoppingCartIcon /></div>
                                        <div className="refreashIcon" style={{ padding: "10px 1px 1px 1px", width: " 16%" }}> <Tooltip title="refreash">
                                            <RefreshOutlinedIcon className="refreshIcon"
                                                onClick={this.handleRefreash} /></Tooltip></div>
                                        <div className="listview-css"> {!this.state.listOpen ?
                                            <Tooltip title="List view">
                                                <ViewAgendaOutlinedIcon style={{ padding: "10px 1px 1px 1px" }}
                                                    onClick={this.handleListIcon}
                                                /></Tooltip>
                                            : <Tooltip title="Grid view"><GridOnIcon style={{ padding: "10px 1px 1px 1px" }}
                                                onClick={this.handleGridIcon} /></Tooltip>
                                        }</div>
                                        <div>
                                            <Avatar className="icon-button" onClick={this.handleAccount}>
                                                {this.state.imageSet ?
                                                    <img src={this.state.selectedFile} alt="profile">
                                                    </img>
                                                    :
                                                    <img src={localStorage.getItem("imageURL")} alt="profile"
                                                        style={{
                                                            width: "75px",
                                                            height: "75px"
                                                        }}
                                                    />}
                                            </Avatar>
                                            <Popper id={id} open={open} anchorEl={anchorEl}>
                                                <Paper className="profilePaper">
                                                    <div >
                                                        <div className="profileContent">
                                                            <label style={{ padding: "10px 10px 10px 10px" }} htmlFor='file'>
                                                                <Avatar
                                                                    style={{
                                                                        width: "75px",
                                                                        height: "75px"
                                                                    }}
                                                                >
                                                                    {this.state.imageSet ?
                                                                        <img src={this.state.selectedFile} alt="profile">
                                                                        </img>
                                                                        :
                                                                        <img src={localStorage.getItem("imageURL")} alt="profile"
                                                                            style={{
                                                                                width: "75px",
                                                                                height: "75px"
                                                                            }} />}
                                                                </Avatar>
                                                            </label>
                                                            <div >
                                                            </div>
                                                            <div>
                                                                <h3>{localStorage.getItem("Firstname")}{localStorage.getItem("Lastname")}</h3>
                                                                <p>{localStorage.getItem("Email")}</p></div>

                                                        </div>
                                                        <input type="file" id='file' onChange={this.handleProfileImage} style={{ display: 'none' }} />

                                                    </div>
                                                    <Divider />
                                                    <div className="account-btn">
                                                        <div>
                                                            <Button size="small" color="primary" onClick={this.handleaccount}>
                                                                add account
                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button size="small" color="primary" onClick={this.handlelogout} >
                                                                Logout
                                            </Button>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </Popper>
                                        </div>
                                    </div>
                                </Toolbar>
                            </MuiThemeProvider>
                        </AppBar>
                    </MuiThemeProvider>
                </div>
                <div>
                    <DrawerComponent menuList={this.state.isOpen}>
                    </DrawerComponent>
                </div>
            </div>
        )
    }
}
export default withRouter(DashboardComponent);