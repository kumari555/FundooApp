import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withRouter } from 'react-router-dom';
import { Divider, InputBase, Paper } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { myCartDetails } from '../services/noteServices'
import { placeOrder } from '../services/noteServices';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const theme = createMuiTheme({
    overrides: {
        MuiDivider: {
            root: {
                height: "3px",
                backgroundColor: "#0a66b7"
            }
        },
    }
})
// const theme = createMuiTheme({
//     overrides: {
//         MuiDivider: {
//             root: {
//                 height: "3px",
//                 backgroundColor: "#0a66b7"
//             }
//         },
//         MuiAppBar: {
//             colorPrimary: {
//                 backgroundColor: " #6eb8d4"
//             }
//         }
//     }
// })
function getSteps() {
    return ['signin', 'Review', 'Complete'];
}
class ShoppingComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStep: 0,
            cartPrice: "",
            cartName: "",
            cartDescription: "",
            address: false,
            userAddress: "",
            openSnackBar: false,
        }
    }
    componentWillMount() {
        this.myCartDetails()
    }
    myCartDetails = () => {
        myCartDetails()
            .then(response => {
                // console.log("response of seleted card details:", response.data.data[0].id);
                // this.setState({
                //     cartPrice: response.data.data[0].product.price,
                //     cartName: response.data.data[0].product.name,
                //     cartDescription: response.data.data[0].product.description,
                //     cardId: response.data.data[0].id
                // })
                console.log(" seleted card details after setState:", this.state.cartPrice, this.state.cartName, this.state.cartDescription, this.state.cardId);
            })
    }
    handleaddress = (e) => {
        console.log("event value in shopping card", e);
        this.setState({
            userAddress: e.target.value,
        })
        console.log("given address updation", this.state.userAddress);
    }
    // handleOrder = () => {
    //     if (this.state.userAddress === "") {
    //         this.setState({
    //             openSnackBar: true,
    //             snackBarMessage: 'enter the address'
    //         });
    //     } else {

    //     }
    // }
    handleNext = () => {
        var data = {
            cartId: this.state.cardId,
            address: this.state.userAddress
        }
        placeOrder(data)
            .then(response => {
                console.log("response in shopping card during order place", response);
            })

        this.setState(state => ({
            activeStep: state.activeStep + 1,
            address: true,
        }));
    };
    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };
    handleReset = () => {
        this.setState({
            activeStep: 0,
            address: false,
        });
    };
    render() {
        const steps = getSteps();
        const { activeStep } = this.state;
        return (
            <div className="main-shopping-div">
                <MuiThemeProvider theme={theme}>
                    <div className="shopping-inner-div-1">
                        <div className="fundoo-div">fundooNotes</div>

                        <div style={{ width: "100%", marginTop: " -2%" }}>
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map(label => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper></div>
                    </div>
                    <div style={{ marginTop: "-5%" }} className="divider-div"><h3>Shoping Card</h3>
                        <Divider className="divider-align" /></div>
                    <div className="shopping-inner-div-2">
                        <div style={{ display: " flex", width: "100%" }}>
                            <Card className="shoppingCard">${this.state.cartPrice}per month {this.state.cartName}</Card>
                            <div className="description-align">
                                <p style={{
                                    color: "#0a66b7",
                                    fontSize: "14px",
                                    marginTop: "-1%"
                                }}>
                                    {this.state.cartName}pack Details</p>
                                <li>{this.state.cartDescription}</li></div></div>
                        <div style={{ display: " flex", justifyContent: "space-around", width: " 100%" }}>
                            <div className="prise-tag"> <h4>price</h4>
                                <div style={{
                                    color: "#0a66b7",
                                    fontSize: "15px",
                                    marginTop: "-18%"
                                }}>${this.state.cartPrice}</div></div>
                            <div className="prise-tag"><h4>validity</h4>
                                <div style={{
                                    color: "#0a66b7",
                                    fontSize: "15px",
                                    marginTop: "-27%"
                                }}>per month</div></div>
                            <div className="shoppingButton"><div>SubTotal(1 item):${this.state.cartPrice}</div>
                                <div className="button-succes"
                                    onClick={this.handleNext}>
                                    {activeStep === 1 ?
                                        'place your order' : (activeStep === 2
                                            ? null : 'proceed to checkout')
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider-div">
                        <Divider className="divider-align" />
                        <div style={{ marginTop: " 2%" }}>SubTotal(1 item):${this.state.cartPrice}</div>
                        {this.state.address ?
                            <div className="cardandpaymentcss">
                                <Card className="addressCard" >
                                    <InputBase
                                        placeholder="address....."
                                        onChange={this.handleaddress}
                                    />
                                </Card>
                                <div className="payment-css"><h4>payment Method</h4>
                                    Cash on Delivary</div></div>
                            :
                            null
                        }
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
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(ShoppingComponent);
// <Card className="fundoo-align"
//     style={{
//     }}> fundonotes</Card>