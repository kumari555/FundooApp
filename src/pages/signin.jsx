import React, { Component } from 'react'
import SigninComponent from '../components/signinComponent';
class Signin extends Component {
   
    render() {
    //    console.log("response in loginpage--->", this.props)
        return (
            <div>
                <SigninComponent />
            </div>
        )
    }
}
export default Signin;
