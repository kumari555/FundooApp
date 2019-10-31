import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import { register } from '../services/userServices';
import ServiceComponent from '../components/serviceComponent';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            textSizeSmall: {
                fontSize: "0.8125rem",
                '@media (width: 768px)': {
                    fontSize: "1.8125rem"
                },
                '@media (width: 1024px)': {
                    fontSize: "1.8125rem"
                }
            }
        },
        // MuiButton: {
        //     root: {
        //         fontSize: "0.8125rem",
        //         '@media (width: 768px)': {
        //             fontSize: " 1.8125rem"
        //         },
        //         '@media (width: 1024px)': {
        //             fontSize: "1.8125rem"
        //         }
        //     }
        // }
    }
})

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerData: [],
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            service: "",
            Id: "",
        }
        console.log("props in register", this.props);
    }
    handlefirstnameChange = (event) => {
        var firstName = event.target.value;
        this.setState({
            firstName: firstName
        })
    }
    handlelastnameChange = (event) => {
        var lastName = event.target.value;
        this.setState({
            lastName: lastName
        })
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
    handlesignup = () => {
        if (this.state.firstname === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'firstname is empty'
            });
        } else if (this.state.lastname === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'lastname is empty'
            });
        } else if (this.state.email === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'email is empty'
            });
        } else if (this.state.password === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'password is empty'
            });
        } else {
            var data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                service: this.props.location.state.Name,
                email: this.state.email,
                password: this.state.password,
                Id: this.props.location.state.Id,
            }
            console.log("service infoooo--->", data)
            register(data)
                .then(response => {
                    console.log("register data--->", response)
                    this.setState({
                        registerData: response
                    })
                    this.props.history.push('/signin')
                }).catch((err) => {
                    console.log("errrr", err);
                })
        }
    }
    handleCard = () => {
        this.props.history.push('/serviceComponent')
    }
    handleSigninInstead(status, color, productId) {
        var registerdetails = {
            status: status,
            color: color,
            productId: productId
        }
        this.props.history.push('/signin', registerdetails)
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

        console.log("service state in register", this.props.location.state)

        var productId = "", status = "", color = "";
        if (this.props.location.state !== 'undefined') {
            status = "selected"
            productId = this.props.location.state.productId
            color = "orange"
        }
        return (
            <div className="service-main-div">
                <MuiThemeProvider theme={theme}>
                    <Card className="registerCard">
                        <h3 className="fundoo-text">
                            <span style={{ color: "red" }}>F</span>
                            <span style={{ color: "yellow" }}>u</span>
                            <span style={{ color: "blue" }}>n</span>
                            <span style={{ color: "green" }}>d</span>
                            <span style={{ color: "purple" }}>o</span>
                            <span style={{ color: "orange" }}>o</span>

                        </h3>
                        <div className="cartButton">
                            <Button onClick={this.handleCard}>go to cart</Button></div>

                        <p className="register-Name"> Create your Fundoo Account</p>

                        <div className="register">
                            <div className="field-align">
                                <TextField
                                    id="outlined-name"
                                    label="First name"
                                    margin="normal"
                                    // variant="outlined"
                                    onChange={this.handlefirstnameChange}
                                    value={this.state.firstname}
                                />
                            </div>
                            <div className="field-align">
                                <TextField
                                    id="outlined-name"
                                    label="Last name"
                                    margin="normal"
                                    //variant="outlined"
                                    onChange={this.handlelastnameChange}
                                    value={this.state.lastname}
                                />
                            </div>

                        </div>
                        <div className="email-text">
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                //variant="outlined"
                                onChange={this.handleEmailChange}
                                value={this.state.email}
                                fullWidth
                            />
                        </div>
                        <div className="register">
                            <div className="field-align">
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    //variant="outlined"
                                    onChange={this.handlepasswordChange}
                                    value={this.state.password}
                                /></div>
                            <div className="field-align">
                                <TextField
                                    id="outlined-password-input"
                                    label="Confirm"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    // variant="outlined"
                                    onChange={this.handlepasswordChange}
                                    value={this.state.password}
                                />
                            </div>
                        </div>
                        <div className="register-carts">
                            <ServiceComponent Cards={true}

                                productId={productId}
                                status={status}
                                color={color}>
                            </ServiceComponent>
                        </div>
                        <div className="Rbutton">
                            <div><Button size="small" color="primary"
                                onClick={() => this.handleSigninInstead(status, color, productId)}>
                                Signin instead
                         </Button></div>
                            <div> <Button variant="outlined" color="primary" onClick={this.handlesignup}>
                                SignUp
                          </Button></div>
                        </div>
                    </Card>
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
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(RegisterComponent);