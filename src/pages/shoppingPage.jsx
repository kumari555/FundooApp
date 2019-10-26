import React from 'react'
import ShoppingComponent from '../components/shoppingComponent';
import DashboardComponent from '../components/dashboardComponent';
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
                <DashboardComponent
                    transitionProps={this.handleTransition}
                    SearchNotes={this.handleSearch}
                    listViewProps={this.handleListView}
                />
                <div>  <ShoppingComponent /> </div>
            </div>
        )
    }
}
export default withRouter(DraftEditorPage);