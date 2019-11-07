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
import ReplyIcon from '@material-ui/icons/Reply';
import Rating from 'material-ui-rating';
import { getNotes } from '../services/noteServices';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

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
            getNoteData: [],
            rawContentState: "",
            questionReply: false,
            givenMsg: ""
        }
    }
    componentWillMount() {
        this.getNotes()
    }
    getNotes = () => {
        getNotes()
            .then(response => {
                console.log("response in get note---->", response.data.data.data)
                //console.log("response in get note id ---->", response.data.data.data.id)
                this.setState({
                    getNoteData: response.data.data.data,
                    // id: response.data.data.data.id
                })
            })
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
        //console.log("after set state question", convertToRaw(editorState))
        this.setState({
            editorState: editorState

        });
        // console.log("raw data", convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text);
        //  console.log("editor state=======>", this.state.editorState);
        console.log("editor state--------", draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
        //   console.log("after set state question", convertToRaw(this.state.editorState.getCurrentContent()))
        //console.log("after set state question", draftToHtml(this.state.editorState.blocks[0].text))
        this.setState({
            givenMsg: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        })
        console.log("after set state og question", this.state.givenMsg);
       // convertToRaw(this.state.editorState.blocks[0].text.getCurrentContent())
    }
    handleQuestion = (noteId) => {
        console.log("msg", noteId);
        var data = {
            message: this.state.givenMsg,
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
            giveLike: !this.state.giveLike
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
        console.log("reply question in setSate", this.state.reply);
    }
    render() {
        var d = new Date();
        var n = d.toLocaleString([], { hour12: true });
        // console.log("response in question Page date--->", n)
        // console.log("response in question Page message--->", this.props.location.state[3])
        // var getNoteDetails = this.state.getNoteData.map((key, index) => {
        // console.log("key in draft get note--->", key.questionAndAnswerNotes[0]);
        // return (
        //     <div>{key.questionAndAnswerNotes[0]}</div>
        // )
        //})
        return (
            <div className="draftMain-css">
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
                        <div className="editor-css">
                            <div ><h2>Ask a Question</h2></div>
                            <div>
                                <Divider />
                                <div className="question-css">
                                    <Editor
                                        editorState={this.state.editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        placeholder="Ask a Question....."
                                        onEditorStateChange={this.onChange}
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
                            <div dangerouslySetInnerHTML={{ __html: this.props.location.state[3] }}></div>
                            <div dangerouslySetInnerHTML={{ __html: this.state.askQuestion }}></div>
                          
                            <Divider className="divider-css" />
                            <div className="localstorageData">
                                <div>{localStorage.getItem("Firstname")}{localStorage.getItem("Lastname")}</div>
                                <div >{n}
                                </div>
                            </div>
                            <div className="draft-icons">
                                <div >{this.props.location.state[3]}{this.state.askQuestion}</div>
                                <div className="like-css">
                                    <div onClick={this.handleReply}><ReplyIcon style={{ padding: " 6px" }} /></div>
                                    <div>{!this.state.giveLike ?
                                        <div><ThumbUpIcon
                                            onClick={() => this.handleLike(this.props.location.state[5])} /> unlike</div>
                                        : <div>
                                            <ThumbUpIcon
                                                onClick={() => this.handleLike(this.props.location.state[5])} />
                                            Like</div>
                                    }</div>
                                    <div style={{ display: "flex" }}><Rating name="half-rating" value={5} precision={0.5}
                                        onChange={(e) => this.handlerating(e, this.props.location.state[5])}
                                    /></div>
                                    <div>{this.state.givenRate}</div>
                                </div>
                            </div>
                            {this.state.reply ?
                                <div>
                                    <div className="question-css">
                                        <Editor
                                            EditorState={this.state.editorState}
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

