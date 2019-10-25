import React from 'react'
import ShoppingComponent from '../components/shoppingComponent';
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
                <ShoppingComponent />
            </div>
        )
    }
}
export default withRouter(DraftEditorPage);