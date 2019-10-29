import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { myCartDetails } from '../services/noteServices'
const theme = createMuiTheme({
    overrides: {
        MuiDivider: {
            root: {
                backgroundColor: "rgba(0, 0, 0, 0.51)"
            }
        }
    },
    MuiButton: {
        root: {
            color: "#f44336"
        }
    },
    MuiButtonBase: {
        root: {
            backgroundColor: "#6eb8d4"
        }
    },
    MuiPaper: {
        rounded: {
            borderRadius: "14px"
        }
    },
    MuiPaper: {

        root: {
            color: "rgba(0, 0, 0, 0.73)",
            backgroundColor: "rgba(0, 0, 0, 0.35)"
        }
    }
})
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
            cartDescription: ""
        }
    }
    componentWillMount() {
        this.myCartDetails()
    }
    myCartDetails = () => {
        myCartDetails()
            .then(response => {
                console.log("response of seleted card details:", response.data.data[0].product);
                this.setState({
                    cartPrice: response.data.data[0].product.price,
                    cartName: response.data.data[0].product.name,
                    cartDescription: response.data.data[0].product.description
                })
                console.log(" seleted card details after setState:", this.state.cartPrice, this.state.cartName, this.state.cartDescription);
            })
    }
    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
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
        });
    };
    render() {
        const steps = getSteps();
        const { activeStep } = this.state;
        return (
            <div className="main-shopping-div">
                <MuiThemeProvider theme={theme}>
                    <div className="shopping-inner-div-1">
                        <div style={{ width: "88%" }}>
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map(label => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper></div>
                        <div className="shopping-button">
                            {this.state.activeStep === steps.length ? (
                                <div>
                                    <Typography >All steps completed</Typography>
                                    <Button onClick={this.handleReset}>Reset</Button>
                                </div>
                            )
                                :
                                (
                                    <div className="shopping-button">
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}>
                                            Back
                                            </Button>
                                        <Button onClick={this.handleNext}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                )}
                        </div>
                    </div>
                    <div style={{ marginTop: "-4%" }} className="divider-div"><h3>Shoping Card</h3>
                        <Divider /></div>
                    <div className="shopping-inner-div-2">
                        <Card className="shoppingCard">${this.state.cartPrice}per month {this.state.cartName}</Card>
                        <div className="description-align">{this.state.cartName}pack Details
                        <li>{this.state.cartDescription}</li></div>
                        <div className="prise-tag"> <h4>price</h4>
                            ${this.state.cartPrice}</div>
                        <div>validity per month</div>
                        <div className="shoppingButton"><div>SubTotal(1 item):${this.state.cartPrice}</div>
                        </div>
                    </div>
                    <div className="divider-div">
                        <Divider />
                        <div>SubTotal(1 item):${this.state.cartPrice}</div>
                        <div className="cardandpaymentcss"><Card className="addressCard" ></Card>
                            <div style={{    padding: "3px 148px"}}><h4>payment Method</h4>
                                Cash on Delivary</div></div>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(ShoppingComponent);
