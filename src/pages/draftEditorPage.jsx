import React from 'react'
import DraftEditorComponent from '../components/draftEditorComponent';
import DraftDashboardComponent from '../components/draftDashboardcomponent';
import { withRouter } from 'react-router-dom';
class DraftEditorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        console.log("response in question Page--->", this.props)
        return (
            <div>
                <div><DraftDashboardComponent /></div>
                <DraftEditorComponent
                // noteTitleProps={this.props.history.location.state}
                />
            </div>
        )
    }
}
export default withRouter(DraftEditorPage);