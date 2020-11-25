import React from 'react'
import { Link } from 'react-router-dom';
import { PostsRequest } from '../../request/postsRequest';
import { SessionRequest } from '../../request/sessionRequest';
import { SessionChangeEventRevoker } from '../../revoker/sessionChangeEventRevoker';
export class PostPage extends React.Component <{
    nowPage: number;
    numSidePage: number;
}, {
    maxPage: number;
    isLogined: boolean;
    posts: Array<{
        title: string;
        postId: number;
        username: string;
    }>
    nowPage: number;
    sessionChangeEventRevokerKey?: string;
}>{
    constructor(props: any) {
        super(props);
        this.state = {
            nowPage: -1,
            maxPage: 1,
            posts: [],
            isLogined: false,
            sessionChangeEventRevokerKey: undefined
        }
    }
    componentDidUpdate() {
        this.updatePage();
    }
    componentDidMount() {
        this.updateIsLogined();
        this.setState((state) => { 
            const newState = {...state};
            newState.sessionChangeEventRevokerKey = SessionChangeEventRevoker.addListener(this.updateIsLogined);
            return newState
        });
    }
    componentWillUnmount() {
        SessionChangeEventRevoker.removeListener(this.state.sessionChangeEventRevokerKey);
    }
    updateIsLogined = async () => { 
        let isLogiend = await SessionRequest.isLogined();
        if(isLogiend === undefined) {
            isLogiend = false;
        }
        this.setState((state) => {
            const newState = {
                ...state
            }
            newState.isLogined = isLogiend;
            return newState;
        });
    }
    updatePage = async () => {
        if(this.props.nowPage === this.state.nowPage) { //old 동기화방식 ㄱ
            return;
        }
        const maxPage= await PostsRequest.getMaxPage();
        if(maxPage === undefined) {
            return;
        }
        const getPageResult = await PostsRequest.getPage(this.props.nowPage);
        if(getPageResult === undefined) {
            return;
        }
        const posts = [];
        for(const data of getPageResult) {
            posts.push({
                title: data.title,
                username: data.username,
                postId: data.id
            });
        }
        this.setState((state) => {
            const newState = {...state};
            newState.maxPage = maxPage;
            newState.posts = posts;
            newState.nowPage = this.props.nowPage;
            return newState;
        })
    }
    getPageNumbers = () => {
        const nowPage = this.props.nowPage;
        const maxPage = this.state.maxPage;
        const numSidePage = this.props.numSidePage;
        const pages = [];
        for(let i = Math.max(1, nowPage - numSidePage); i <= Math.min(maxPage, nowPage + numSidePage); i++) {
            pages.push(i);
        }
        return pages;
    }
    renderPreviousPage = () => {
        if(this.props.nowPage > 1) {
            return <li className="page-item"><a className="page-link" href={"#/posts/page/" + (this.props.nowPage - 1)}>Prev</a></li>
        }
    }
    renderNextPage = () => {
        if(this.props.nowPage < this.state.maxPage) {
            return <li className="page-item"><a className="page-link" href={"#/posts/page/" + (this.props.nowPage + 1)}>Next</a></li>
        }
    }
    renderBtnCreatePost = () => {
        if(this.state.isLogined) {
            return (
                <div className = "col-6">
                    <a href = "#/posts/create">
                        <button className = "btn btn-warning btn-lg w-100 h-100" style = {{borderRadius: "0px"}}>
                            글작성
                        </button>
                    </a>
                </div>
            );
        }
    }
    render() {
        return (
            <div className = 'w-75 mx-auto container'>
                <div className = "w-100 row mb-3">
                    {
                        this.renderBtnCreatePost()
                    }
                </div>
                <div className = "w-100">
                    {
                        this.state.posts.map((post, index) => {
                            return  (
                            <a href={`#/posts/${post.postId}`} key = {index}>
                                <div className = "w-100 bg-primary text-white row mb-3">
                                    <div className = "col-12">
                                        <h1>{post.title}</h1>
                                    </div>
                                    <div className = "offset-9 col-3">
                                        <p>{post.username}</p>
                                    </div> 
                                </div>
                            </a>
                            );
                        })
                    }
                </div>
                <div className = "col-12">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {
                                this.renderPreviousPage()
                            }
                            {
                                this.getPageNumbers().map((value, index) => {
                                    return <li className="page-item" key = {index}> <a className="page-link" href={"#posts/page/" + value}>{value}</a></li>
                                })
                            }
                            {
                                this.renderNextPage()
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
} 