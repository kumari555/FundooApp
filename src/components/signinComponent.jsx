import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { signin } from '../services/userServices';
import ServiceComponent from '../components/serviceComponent';
//import controller from '../controllers/controller';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
const imagepath = 'http://fundoonotes.incubation.bridgelabz.com/';
const theme = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                height: "89%"
            }
        }
    }
})
class SigninComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            message: "",
            snackBarMessge: " ",
            openSnackBar: false
        }
    }
    handleEmailChange = (event) => {
        var email = event.target.value;
        this.setState({
            email: email
        })
    }
    handlepasswordChange = (event) => {
        var password = event.target.value;
        this.setState({
            password: password
        })
    }
    handleservicepage = () => {
        this.props.history.push('/serviceComponent')
    }
    handleforgotpassword = () => {
        this.props.history.push('/forgotPassword')
    }
    handleLogin = () => {
        if (this.state.email === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'email is empty'
            });
        } else if (this.state.password === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'password is empty'
            });
        }
        else {
            var data = {
                "email": this.state.email,
                "password": this.state.password
            }
            signin(data)
                .then(response => {
                    console.log("response in loginpage for details-->", response.data)
                    localStorage.setItem("token", response.data.id)
                    localStorage.setItem("Firstname", response.data.firstName)
                    localStorage.setItem("Lastname", response.data.lastName)
                    localStorage.setItem("Email", response.data.email)
                    localStorage.setItem("userId", response.data.userId)
                    localStorage.setItem("imageURL", imagepath + response.data.imageUrl)

                })

            // console.log("data in local storage", response.data.userId);

            this.props.history.push('/dashboard')

        }
    }
    handleSnackClose = () => {
        try {
            this.setState({
                openSnackBar: false
            })
        } catch (err) {
            console.log("error at handleSnackClose in login");
        }
    }
    render() {
        //console.log("service state in signin", this.props.location.state.productId, this.props.location.state.status, this.props.location.state.color)

        //     var productId = "", status = "", color = "";
        //     if (this.props.history.location.state !== undefined) {
        //         status = "selected"
        //         productId = this.props.history.location.state.productId
        //         color = "orange"
        //     }
        // }
        return (
            <div className="main-login">
                <Card className="signinCard">
                    <div className="signin-div">
                        <h1>
                            <span style={{ color: "red" }}>F</span>
                            <span style={{ color: "yellow" }}>u</span>
                            <span style={{ color: "blue" }}>n</span>
                            <span style={{ color: "green" }}>d</span>
                            <span style={{ color: "purple" }}>o</span>
                            <span style={{ color: "orange" }}>o</span>
                        </h1>
                        <h3>Signin</h3>
                        <p>Continue to Fundoo</p>
                        <div className="email-in-signin">
                            <TextField style={{ width: "75%" }}
                                id="email"
                                label="Email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleEmailChange}
                                value={this.state.email}
                            />
                        </div>
                        <div className="email-in-signin">
                            <TextField style={{ width: "75%" }}
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handlepasswordChange}
                                value={this.state.password}
                            />
                        </div>
                        <div style={{ padding: "1px 1px 1px 421px", marginTop: "2%" }}>
                            <Button variant="outlined" color="primary" onClick={this.handleLogin}>
                                Login
                     </Button>
                        </div>
                        <div style={{ padding: "1px 392px 1px 1px" }}>
                            <Button size="small" color="primary" onClick={this.handleforgotpassword}>
                                Forgot password?
                         </Button>
                        </div>
                        <div style={{ padding: "1px 392px 1px 1px" }}>
                            <Button size="small" color="primary" onClick={(event) => this.handleservicepage(event)}>
                                Create account
                          </Button>
                        </div>

                        {this.props.location.state !== undefined ?

                            <div className="signin-cards">
                                <MuiThemeProvider theme={theme}>
                                    <ServiceComponent Cards={true}
                                        productId={this.props.location.state.productId}
                                        status={this.props.location.state.status}
                                        color={this.props.location.state.color}
                                    >
                                    </ServiceComponent>
                                </MuiThemeProvider>
                            </div> :
                            null}


                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            open={this.state.openSnackBar}
                            autoHideDuration={6000}
                            onClose={this.handleSnackClose}
                            variant="error"
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id"> {this.state.snackBarMessage} </span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleSnackClose}>
                                    <CloseIcon />
                                </IconButton>
                            ]}
                        />
                    </div>
                </Card>
            </div>
        )
    }
}
export default withRouter(SigninComponent);


