import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import { withRouter } from 'react-router-dom';
//import SigninComponent from '../components/signinComponent';
class ForgotPasswordComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
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

    handleLogin = () => {
        this.props.history.push('/signin')
    }

    handleSignin = () => {
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
            this.props.history.push('/signin')
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
        return (
            <div>

                <Card className="forgot-Card">
                    <h3>
                        <span style={{ color: "red" }}>F</span>
                        <span style={{ color: "yellow" }}>u</span>
                        <span style={{ color: "blue" }}>n</span>
                        <span style={{ color: "green" }}>d</span>
                        <span style={{ color: "purple" }}>o</span>
                        <span style={{ color: "orange" }}>o</span>
                    </h3>
                    <h3>Find your Email</h3>
                    <p>Enter your Recovary Email</p>
                    <div>
                        <TextField
                            id="outlined-email-input"
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
                    <div>
                        <Button variant="outlined" color="primary" onClick={this.handleSignin}>
                            next
                     </Button>
                    </div>
                    <div >
                        <Button size="small" color="primary" onClick={this.handleLogin}>
                            back
                         </Button>
                    </div>

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
                </Card>

            </div>
        )
    }
}
export default withRouter(ForgotPasswordComponent);