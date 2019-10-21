import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { MuiThemeProvider, createMuiTheme, Button } from '@material-ui/core';
import { addQuestionAndAnswer } from '../services/noteServices';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { questionLikes } from '../services/noteServices';
import { questioRating } from '../services/noteServices';
import Rating from 'material-ui-rating'
const theme = createMuiTheme({
    overrides: {
        MuiDivider: {
            root: {
                // height: " 2px",
                backgroundColor: "rgba(0, 0, 0, 0.51)"
            }
        }
    }
})
class DraftEditorComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
            question: "",
            // msg: "",
            noteId: "",
            Open: false,
            askQuestion: [],
            createdDate: [],
            like: false,
            id: "",
            giveLike: false,
            givenRate: ""

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
                console.log("response in draft component", response.data.data.details);
                this.setState({
                    askQuestion: response.data.data.details.message,
                    Open: true,
                    createdDate: response.data.data.details.createdDate,
                    id: response.data.data.details.id
                })
                console.log("hgjgkhd", this.state.id);
            })
    }
    handleDashboard = () => {
        this.props.history.push('/dashboard')
    }
    handleLike = () => {
        var data = {
            like: true,
        }
        questionLikes(this.state.id, data)
            .then(response => {
                console.log("after like response", response);
            })
        this.setState({
            giveLike: true
        })
    }
    handlerating = async (e) => {
        console.log("rating after set state", e);
        var data = {
            rate: true,
        }
        questioRating(this.state.id, data)
            .then(response => {
                console.log("after rateing response", response);
            })
        await this.setState({
            givenRate: e
        })
        console.log("rating after set state....", this.state.givenRate);
    }
    render() {
        console.log("response in question Page--->", this.state.createdDate)
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <div className="titleData">
                        <div className="close-css">
                            <div><div> {this.props.location.state[0]}</div>
                                <div> {this.props.location.state[1]}</div></div>
                            <div><Button onClick={this.handleDashboard}>Close</Button></div></div>
                        <Divider style={{ boxShadow: "1px 3px 5px 0px grey" }} />
                    </div>
                    {!this.state.Open ?
                        <div>
                            <div style={{ padding: "1px 1px 1px 97px" }}><h2>Ask a Question</h2></div>
                            <div className="editor-css">
                                <Divider />
                                <div className="question-css">
                                    <Editor
                                        defaultEditorState={this.state.editorState}
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
                            <div className="draftButton">
                                <Button onClick={() => this.handleQuestion(this.props.location.state[2])} >Ask</Button></div>
                        </div>
                        :
                        <div className="afterQuestion">
                            <div><h2>Question Asked</h2></div>
                            {this.state.askQuestion}
                            <Divider className="divider-css" />
                            <div><p style={{ padding: "1px 1px 1px 133px" }}>
                                {localStorage.getItem("Firstname")}{localStorage.getItem("Lastname")}{this.state.createdDate}
                            </p></div>
                            <div className="draft-icons"><div style={{ padding: "7px 1px 1px 85px" }}>{this.state.askQuestion}</div>
                                <div style={{ padding: "0px 264px 1px 0px" }}>
                                    {!this.state.giveLike ?
                                        <div><ThumbUpIcon onClick={this.handleLike} /> 0 Likes</div>
                                        : <div><ThumbUpIcon onClick={this.handleLike} /> 1 Likes</div>
                                    }
                                    <Rating name="half-rating" value={4} precision={0.5}
                                        onChange={(e) => this.handlerating(e)}
                                    />{this.state.givenRate}
                                </div>
                            </div>
                        </div>
                    }
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(DraftEditorComponent);
