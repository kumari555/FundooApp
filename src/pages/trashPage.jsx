import React from 'react'
// import GetReminderComponent from '../components/getReminderComponent';

import DashboardComponent from '../components/dashboardComponent';
import GetTrashNotesComponent from '../components/getTrashNotesComponent';
import { withRouter } from 'react-router-dom';


   
   
  
class TrashPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            SearchingNotesProps: "",
            listView: false
        }
        this.createNoteRef = React.createRef();
    }
   
    handleSearch = (value) => {
        // console.log("value in searchbar-->", value);
        this.setState({
            SearchingNotesProps: value
        })
        //console.log("value in searchbar in array-->", this.state.value);
    }
    handleListView = (value) => {
        console.log("value handlelistview in array-->", value);
        this.setState({
            listView: value
        })
        console.log("value state in array-->", this.state.listView);
    }
    handleTransition = async () => {
        await this.setState({
            transitionvalue: true
        })
        console.log("transiton value", this.state.transitionvalue);
    }
    render() {
        console.log("response in dashboard--->", this.props)
        var transitionState = this.state.transitionvalue ? "transitionLeft" : null
        return (
            <div>
                <DashboardComponent
                    transitionProps={this.handleTransition}
                    SearchNotes={this.handleSearch}
                    listViewProps={this.handleListView}
                />
               
                <div className="get-notes" id={transitionState}>
                    <GetTrashNotesComponent
                        SearchingNotesProps={this.state.SearchingNotesProps}
                        gridViewProps={this.state.listView}
                        wrappedComponentRef={this.createNoteRef} />
                </div>
            </div>
        )
    }
}
export default withRouter(TrashPage);