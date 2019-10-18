import React from 'react'
import QuestionComponent from '../components/questionComponent';

import { withRouter } from 'react-router-dom';
class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        console.log("response in question Page--->", this.props)
        return (
            <div>
                <QuestionComponent
                // noteTitleProps={this.props.history.location.state}
                />
            </div>
        )
    }
}
export default withRouter(QuestionPage);