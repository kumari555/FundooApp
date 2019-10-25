import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
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
    }
})
function getSteps() {
    return ['signin', 'Review', 'Complete'];
}
// function getStepContent(stepIndex) {
//     switch (stepIndex) {
//         case 0:
//             return 'signin';
//         case 1:
//             return 'Review';
//         case 2:
//             return 'Review';
//         default:
//             return 'Unknown stepIndex';
//     }
// }
class ShoppingComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStep: 0
        }
    }
    componentWillMount() {
        this.myCartDetails()
    }
    myCartDetails = () => {
        myCartDetails()
            .then(response => {
                console.log("response of seleted card details", response);
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
            <div>
                <MuiThemeProvider theme={theme}>
                    <div className="fundoo-button">
                        <Button variant="outlined" color="primary">
                            FundooNotes
                     </Button>
                    </div>
                    <div>
                        <ShoppingCartIcon />
                        <Stepper activeStep={activeStep} alternativeLabel>

                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            {this.state.activeStep === steps.length ? (
                                <div>
                                    <Typography >All steps completed</Typography>
                                    <Button onClick={this.handleReset}>Reset</Button>
                                </div>
                            )
                                :
                                (
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}>
                                            Back
                                                </Button>
                                        <Button variant="contained" color="primary" onClick={this.handleNext}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>

                                )}
                        </div>
                        <div>Shoping Card</div>
                        <Divider />

                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(ShoppingComponent);
