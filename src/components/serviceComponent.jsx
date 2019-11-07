import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'
//import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';
import { service, addToCart } from '../services/userServices';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
// import AppBar from '@material-ui/core/AppBar';

//import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
//import SwipeableViews from 'react-swipeable-views';
//import PropTypes from 'prop-types';

const theme = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                overflow: "visible",
            }
        }
    }
})
class ServiceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceData: [],
            productId: [],
            Name: [],
            Id: [],
            // setOpen: false,
            // value: 0,
            Open: false,
            mouseEvent: false,
        }
    }
    componentWillMount() {
        service()
            .then(response => {
                console.log("service data--->", response.data.data.data)
                this.setState({
                    serviceData: response.data.data.data
                })
                console.log("result-------", this.state.serviceData);
            }).catch((err) => {
                console.log("errrr", err);
            })
    }
    // handleChange = (event, value) => {
    //     this.setState({ value });
    // }
    handleLogin = () => {
        this.props.history.push('/signin')
    }
    handleRegister(id) {
        this.setState({
            cartId: id
        })
        var data = {
            productId: id,
        }
        addToCart(data)
            .then(response => {
                console.log(" addToCart data--->", response)
                this.setState({
                    productId: response.data.data.details.productId,
                    Id: response.data.data.details.id,
                    Name: response.data.data.details.product.name
                })
                var cartData = {
                    productId: this.state.productId,
                    Id: this.state.Id,
                    Name: this.state.Name
                }
                this.props.history.push("/register", cartData)
                console.log("cart data--->", cartData)
            })
            .catch((err) => {
                console.log("errrr", err);
            })
    }
    mouseEnter(Id) {
        this.setState({
            mouseEvent: true,
            Id: Id
        })
        // console.log("result of mouseover", this.state.mouseEvent);
    }
    mouseLeave() {
        this.setState({
            mouseEvent: false
        })
    }
    render() {
        const mouseOverColor = this.state.mouseEvent ? "orange" : "gray"
        // const { value } = this.state;
        var serviceDetails = this.state.serviceData.map((key, index) => {
            console.log("in maping--->", key)
            // console.log("in maping--->", index)
            return (
                <MuiThemeProvider theme={theme}>
                    <div className="serviceCss" key={key.id}
                        onClick={(this.props.Cards) ? null : () => this.handleRegister(key.id)}>
                        <Card className="outerCard" style={{
                            backgroundColor: (this.state.Id === key.id) ?
                                mouseOverColor : "gray" && (key.id === this.props.productId) ? this.props.color : "gray"
                        }}
                            onMouseEnter={(this.props.Cards) ? null : () => this.mouseEnter(key.id)}
                            onMouseLeave={(this.props.Cards) ? null : () => this.mouseLeave()}>
                            <Card className="innerCard">
                                <h3>price:${key.price} per month</h3>
                                {key.name}
                                <ul className="register-text">
                                    <li> ${key.price}/month</li>
                                    <li>{key.description}</li>
                                </ul>
                            </Card>
                            <div className="textCart">
                                {(this.props.productId === key.id) ?
                                    <p>{this.props.status}</p>
                                    :
                                    <p> Add To Cart</p>
                                }
                            </div>
                        </Card>
                    </div>
                </MuiThemeProvider>
            )
        })
        return (
            (this.props.Cards) ?
                <div className="serviceCards">
                    {serviceDetails}
                </div>
                :
                <div>
                    <AppBar position="static" style={{ backgroundColor: "orange" }}>
                        <Toolbar>
                            <h1>FundooNotes</h1>
                        </Toolbar>
                    </AppBar>
                    <div className="serviceInfo">
                        <h2>fundooNotes offered.Choose below service in Register.</h2>
                    </div>
                    <div className="card1">
                        {serviceDetails}
                    </div>
                    <div className="nextLink">
                        <Button size="small" color="primary" onClick={this.handleLogin}>
                            <p className="signin-align"> sign in instead</p>
                        </Button>
                    </div>
                </div>
        )
    }
}
export default withRouter(ServiceComponent);