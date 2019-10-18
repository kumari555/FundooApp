import React from 'react'
import RegisterComponent from '../components/registerComponent';
class Register extends React.Component {
   
    render() {
        console.log("after the service-->", this.props);
        return (
            <div>
                <RegisterComponent />
            </div>
        )
    }
}
export default Register;
