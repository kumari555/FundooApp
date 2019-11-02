import React from 'react'
import DraftEditorComponent from '../components/draftEditorComponent';
import QuesAndAnsAppbarComponent from '../components/quesAndAnsAppbarComponent';
import { withRouter } from 'react-router-dom';
class DraftEditorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transitionvalue: false
        }
    }
    handleTransition = async () => {
        await this.setState({
            transitionvalue: true
        })
        console.log("transiton value", this.state.transitionvalue);
    }
    render() {
        console.log("response in question Page--->", this.props)

        return (
            <div>
                <div><QuesAndAnsAppbarComponent
                /></div>
                <DraftEditorComponent
                />
            </div>
        )
    }
}
export default withRouter(DraftEditorPage);