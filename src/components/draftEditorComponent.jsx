import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { MuiThemeProvider, createMuiTheme, Button } from '@material-ui/core';
import { addQuestionAndAnswer } from '../services/noteServices';
const theme = createMuiTheme({
    overrides: {
        MuiDivider: {
            root: {
                backgroundColor: "rgb(0, 0, 0)"
            }
        },
    }
})
class DraftEditorComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
            question: "",
            // msg: "",
            noteId: ""
        }
    }
    onChange = (editorState) => {
        console.log("data in e", editorState);
        this.setState({ editorState });
        console.log("after set state question", this.state.editorState.blocks[0].text)

    }

    handleQuestion = (noteId) => {
        console.log("msg", noteId);
        var data = {
            message: this.state.editorState.blocks[0].text,
            notesId: noteId
        }
        console.log("message data", data);
        addQuestionAndAnswer(data)
            .then(response => {
                console.log("response in draft component", response);
            })
    }
    handleDashboard = () => {
        this.props.history.push('/dashboard')
    }
    // const editorStateWithAllSelection = EditorState.acceptSelection(
    //     editorState,
    //     selection
    // );

    // const newState = RichUtils.toggleInlineStyle(
    //     editorStateWithAllSelection,
    //     inlineStyle
    // )
    render() {
        // console.log("response in question Page--->", this.props.history.location.state)
        // var Details = this.props.history.location.state.map((key) => {
        //     console.log("data after maping", key);
        //     return (
        //         <div>
        //             <div>{key}</div>
        //         </div>
        //     )
        // })
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <div className="titleData">
                        <div className="close-css">
                            <div><div> {this.props.location.state[0]}</div>
                                <div> {this.props.location.state[1]}</div></div>
                            <div><Button onClick={this.handleDashboard}>Close</Button></div></div>
                        <Divider />
                        <div><h2>Ask a Question</h2></div>
                    </div>
                    <div className="editor-css">
                        <Divider />
                        
                            <div className="question-css">
                                <Editor
                                    defaultEditorState={this.state.editorState}
                                    // defaultEditorState={this.state.editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    placeholder="Ask a Question....."
                                    // onEditorStateChange={(editorState) => this.handleQuestion(editorState)}
                                    // onChange={(event) => this.handleQuestion(event)}

                                    onChange={this.onChange.bind(this)}
                                />
                            </div>
                      
                        <Divider />
                    </div>
                    <div><Button onClick={() => this.handleQuestion(this.props.location.state[2])} >Ask</Button></div>

                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(DraftEditorComponent);
