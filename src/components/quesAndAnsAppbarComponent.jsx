import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import DrawerComponent from './drawerComponent';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { ProfileImage } from '../services/userServices';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
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
        // MuiSvgIcon: {
        //     root53: {
        //         color: "rgb(0, 0, 0)",
        //         fontSize: "1.9rem"
        //     }
        // }
    }
})
class QuesAndAnsAppbarComponent extends React.Component {
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
    handlemenulist = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
        // this.props.transitionProps(true)
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
        //   console.log("value in serchbar --->", event.target.value);

        this.props.SearchNotes(event.target.value)
    }

    handleProfileImage = (event) => {
        this.setState({
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
    handleshoppingCart = () => {
        this.props.history.push('/shoppingPage')
    }
    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popper' : undefined;
        return (
            <div>
                <div>
                    <MuiThemeProvider theme={theme}>      
                        <AppBar >
                            <MuiThemeProvider theme={theme}>
                                <Toolbar>
                                    <div className="draftDashboard-div2">
                                        <div className="draftDashboard-div1">
                                            <div style={{ padding: " 10px 0px 0px 0px" }}>
                                                <IconButton onClick={this.handlemenulist} >
                                                    <MenuIcon />
                                                </IconButton>
                                            </div>
                                            <div>
                                                <h2>FundoNotes</h2>
                                            </div>
                                        </div>
                                        <div className="draftDashboard-div1">
                                            <div style={{ padding: " 21px 0px 1px 1px" }}
                                                onClick={this.handleshoppingCart}>
                                                <ShoppingCartIcon /></div>
                                            <div style={{ padding: " 21px 0px 1px 1px" }} className="Avatar-draft">
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
export default withRouter(QuesAndAnsAppbarComponent);