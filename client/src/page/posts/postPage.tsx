import React from 'react'
import { PostsRequest } from '../../request/postsRequest';
export class PostPage extends React.Component <{
    nowPage: number;
}, {
    maxPage?: number;
    nowPage: number;
    numSidePage: number;
    posts: Array<{
        title: string;
        postId: number;
        username: string;
    }>
}>{
    constructor(props: any) {
        super(props);
        this.state = {
            nowPage: this.props.nowPage,
            maxPage: 1,
            numSidePage: 3,
            posts: []
        }
        this.update();
    }
    isInited = true;
    update = async () => {
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
            return newState;
        })
    }
    getToRenderPages = () => {
        const nowPage = this.state.nowPage;
        const maxPage = this.state.maxPage;
        const numSidePage = this.state.numSidePage;
        const pages = [];
        for(let i = Math.max(1, nowPage - numSidePage); i < Math.min(maxPage, nowPage + numSidePage); i++) {
            pages.push(i);
        }
        return pages;
    }
    previousPage = () => {
        if(this.state.nowPage > 1) {
            return <li className="page-item"><a className="page-link" href={"#posts/page/" + (this.state.nowPage - 1)}>Prev</a></li>
        }
    }
    nextPage = () => {
        if(this.state.nowPage < this.state.maxPage) {
            return <li className="page-item"><a className="page-link" href={"#posts/page/" + (this.state.nowPage + 1)}>Next</a></li>
        }
    }
    render() {
        if(!this.isInited) {
            return;
        }
        return (
        <div className = 'w-75 mx-auto container'>
            <div className = "row">
                <div className = "col-12 my-3">
                    {
                        this.state.posts.map((post) => {
                            return  (
                            <a href ={`#/posts/${post.postId}`}>
                                <div className = "w-100 bg-primary text-white row">
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
                                this.previousPage()
                            }
                            {
                                this.getToRenderPages().map((value, index) => {
                                    return <li className="page-item"> <a className="page-link" href={"#posts/page/" + value}>{value}</a></li>
                                })
                            }
                            {
                                this.nextPage()
                            }
                        </ul>
                    </nav>
                  </div>
            </div>
        </div>
        );
    }
} 