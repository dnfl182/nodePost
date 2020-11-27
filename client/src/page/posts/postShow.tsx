import React from 'react'
import { PostsRequest } from '../../request/postsRequest';
import { SessionRequest } from '../../request/sessionRequest';
import { SessionChangeEventInvoker } from '../../invoker/sessionChangeEventInvoker';
export class PostShow extends React.Component<{postId: number} , {
    title: string;
    username: string;
    content: string;
    postAccountId?: number;
    textError: string;
    textSuccess: string;
    sessionAccountId?: number;
    sessionChangeEventRevokerKey?: string;
}> {       
    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            username: '',
            content: '',
            sessionAccountId: undefined,
            postAccountId: undefined,
            textError: '',
            textSuccess: '',
            sessionChangeEventRevokerKey: undefined
        }
    }
    componentDidMount() {
        this.updatePost();
        this.updateLoginedAccountId();
        this.setState((state) => { 
            const newState = {...state};
            newState.sessionChangeEventRevokerKey = SessionChangeEventInvoker.addListener(this.updateLoginedAccountId);
            return newState;
        });
    }
    componentWillUnmount() {
        SessionChangeEventInvoker.removeListener(this.state.sessionChangeEventRevokerKey);
    }
    updateLoginedAccountId = async () => { 
        const sessionAccountId = await SessionRequest.getAccountId();
        this.setState((state) => {
            const newState = {
                ...state
            }
            newState.sessionAccountId = sessionAccountId;
            return newState;
        });
    }
    updatePost = async () => {
        const post = await PostsRequest.get(this.props.postId);
        if(post !== undefined) {
            this.setState((state) => {
                const newState = {...state};
                newState.title = post.title;
                newState.username = post.username;
                newState.content = post.content;
                newState.postAccountId = post.accountId;
                return newState;
            })
        }
    }
    renderBtnDeletePost = () => {
        if(this.state.postAccountId !== undefined && this.state.postAccountId === this.state.sessionAccountId) {
            return (         
                <div className = "col-3">
                    <button className = "btn btn-danger btn-lg w-100 h-100" style = {{borderRadius: "0px"}} onClick = {this.deletePost}>
                        삭제
                    </button>
                </div>
            );
        }
    }
    updateError = (text: string) => {
        this.setState((state) => {
            const newState = {
                ...state
            };
            newState.textError = text;
            newState.textSuccess = "";
            return newState;
        })
    }
    updateSuccess = (text: string) =>{
        this.setState((state) => {
            const newState = {
                ...state
            };
            newState.textError = "";
            newState.textSuccess = text;
            return newState;
        })
    }
    deletePost = async() => {
        if(await PostsRequest.delete(this.props.postId) === true) {
            location.href = "#/posts/page/1";
        } else {
            this.updateError('삭제에 실패하였습니다.');
        }
    }
    render() {
        return (
        <div className = 'w-75 mx-auto container'>
            <div className = "row bordered">
                <div className = "col-12 border-bottom">
                    <h1 id = "textTitle">{this.state.title}</h1>
                </div>
                <div className = "col-12 border-bottom"> 
                    <p id = "textUsername">Writer: {this.state.username}</p>
                </div>
                <div className = "col-12 border-bottom">
                    <pre className ="d-block" style = {{wordWrap: "break-word"}}id = "textContent">{this.state.content}</pre>
                </div>
                {
                    this.renderBtnDeletePost()
                }
            </div>
            <h3 className = "text-success"id="textSuccess">{this.state.textSuccess}</h3>
            <h3 className = "text-danger"id="textError">{this.state.textError}</h3>
        </div>
        );
    }
} 