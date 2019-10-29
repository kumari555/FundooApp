import React from 'react'
import DashboardComponent from '../components/dashboardComponent';
import GetNoteComponent from '../components/getNoteComponent';
import NotecardComponent from '../components/noteCardComponent';
import { withRouter } from 'react-router-dom';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchingNotesProps: "",
            listView: false,
            transitionvalue: false

        }
        this.createNoteRef = React.createRef();
    }
    createNote = (cardDetails) => {
        console.log("data in reffernce", cardDetails)
        this.createNoteRef.current.displayNote(cardDetails)
    }
    handleSearch = (value) => {
        console.log("value in searchbar-->", value);
        this.setState({
            SearchingNotesProps: value
        })
        console.log("value in searchbar in array-->", this.state.SearchingNotesProps);
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
                <div className="dashboardnote" >
                    <NotecardComponent noteCard={this.createNote} />
                </div>
                <div className="get-notes" id={transitionState}>
                    <GetNoteComponent
                        SearchingNotesProps={this.state.SearchingNotesProps}
                        gridViewProps={this.state.listView}
                        wrappedComponentRef={this.createNoteRef} />
                </div>
            </div>
        )
    }
}
export default withRouter(Dashboard);