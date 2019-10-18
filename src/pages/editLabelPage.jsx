import React from 'react'
// import GetReminderComponent from '../components/getReminderComponent';
import NotecardComponent from '../components/noteCardComponent';
import DashboardComponent from '../components/dashboardComponent';
import GetArchiveComponent from '../components/getArchiveComponent';
import { withRouter } from 'react-router-dom';
import EditLabelComponent from '../components/editLabelComponent';
class EditLabelPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchingNotesProps: "",
            listView: false
        }
        this.createNoteRef = React.createRef();
    }
    createNote = (cardDetails) => {
        console.log("data in reffernce", cardDetails)
        this.createNoteRef.current.displayNote(cardDetails)
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
        console.log("response in edit label page--->", this.props.history.location.state)
        var transitionState = this.state.transitionvalue ? "transitionLeft" : null
        return (
            <div>
                <DashboardComponent
                    transitionProps={this.handleTransition}
                    SearchNotes={this.handleSearch}
                    listViewProps={this.handleListView}
                />
                <div className="dashboardnote">
                    <NotecardComponent noteCard={this.createNote} />
                </div>
                <div className="get-notes" id={transitionState}>
                    <EditLabelComponent 
                        labelAtNote={this.props.history.location.state}
                        SearchingNotesProps={this.state.SearchingNotesProps}
                        gridViewProps={this.state.listView}
                        wrappedComponentRef={this.createNoteRef} />
                </div>
            </div>
        )
    }
}
export default withRouter(EditLabelPage);