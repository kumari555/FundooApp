import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, RichUtils} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { MuiThemeProvider, createMuiTheme, Button } from '@material-ui/core';
import { addQuestionAndAnswer } from '../services/noteServices';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { questionLikes } from '../services/noteServices';
import { questioRating } from '../services/noteServices';
import ReplyIcon from '@material-ui/icons/Reply';

import Rating from 'material-ui-rating';
import { getNotes } from '../services/noteServices';
const theme = createMuiTheme({
    overrides: {
        MuiDivider: {
            root: {

                backgroundColor: "rgba(0, 0, 0, 0.51)"
            }
        }
    },
    MuiButton: {
        root: {
            color: "#f44336"
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
            givenRate: "",
            // noteId: "",
            description: "",
            title: "",
            reply: false,
        }
    }
    componentDidMount() {
        getNotes()
        console.log("ggggggg", this.props.location.state);
        if (this.props.location.state === 3) {
            this.setState({
                noteId: this.props.location.state.noteID,
                description: this.props.location.state.Description,
                title: this.props.location.state.title
            })
            console.log("dataaaaaaaaaaaaaaaaaaaaaaaaa---->", this.state);

        } else if (this.props.location.state[4] === true) {
            this.setState({
                noteId: this.props.location.state.noteID,
                description: this.props.location.state.Description,
                title: this.props.location.state.title,
                Open: true,
            })

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
        console.log("after setstate like response", this.state.giveLike);
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
    handleReply = () => {
        this.setState({
            reply: !this.state.reply
        })
    }
    onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
    render() {
        var d = new Date();
        var n = d.toLocaleString([], { hour12: true });
        console.log("response in question Page date--->", n)
        console.log("response in question Page message--->", this.props.location.state[3])
        // var questiondetails = this.props.location.state[3].map((key, index) => {
        //     console.log("details", key);
        //     return (
        //         <div>
        //             {key.message}
        //         </div>
        //     )
        // })
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <div className="titleData">
                        <div className="close-css">
                            <div><div> {this.props.location.state[0]}</div>
                                <div> {this.props.location.state[1]}</div>
                            </div>
                            <div><Button onClick={this.handleDashboard}>Close</Button></div>
                        </div>
                        <Divider style={{ boxShadow: "1px 3px 5px 0px grey" }} />
                    </div>
                    {!this.state.Open ?
                        <div>
                            <div style={{ padding: "1px 1px 1px 97px" }}><h2>Ask a Question</h2></div>

                            <div className="editor-css">
                                <Divider />
                                <div className="question-css">
                                    <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                                    <Editor
                                        defaultEditorState={this.state.editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        placeholder="Ask a Question....."
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
                            {this.props.location.state[3]}
                            {this.state.askQuestion}
                            <Divider className="divider-css" />
                            <div className="localstorageData">
                                <div>{localStorage.getItem("Firstname")}{localStorage.getItem("Lastname")}</div>
                                <div style={{ padding: "1px 4px 1px 15px" }}>{n}
                                </div>
                            </div>
                            <div className="draft-icons">
                                <div style={{ padding: "7px 1px 1px 20px" }}>{this.props.location.state[3]}{this.state.askQuestion}</div>
                                <div className="like-css">
                                    <div onClick={this.handleReply}><ReplyIcon style={{ padding: " 6px" }} /></div>
                                    <div>{!this.state.giveLike ?
                                        <div><ThumbUpIcon style={{ padding: "5px 6px 0px 11px" }}
                                            onClick={() => this.handleLike(this.props.location.state[5])} /> 0 Likes</div>
                                        : <div><ThumbUpIcon style={{ padding: "5px 6px 0px 11px" }}
                                            onClick={() => this.handleLike(this.props.location.state[5])} /> 1 Likes</div>
                                    }</div>
                                    <div><Rating name="half-rating" value={4} precision={0.5}
                                        onChange={(e) => this.handlerating(e, this.props.location.state[5])}
                                    /></div>
                                    <div style={{ padding: "13px 1px 1px 8px" }}>{this.state.givenRate}</div>
                                </div>
                            </div>
                            {this.state.reply ?
                                <div style={{ marginTop: " 3%" }}>
                                    <div className="question-css">
                                        <Editor
                                            defaultEditorState={this.state.editorState}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            placeholder="Ask a Question....."
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </div>
                                    <Button >Reply</Button>
                                </div>
                                : null
                            }
                        </div>
                    }
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(DraftEditorComponent);
