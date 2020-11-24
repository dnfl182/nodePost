import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { Login } from './page/accounts/login';
import { Register } from './page/accounts/register';
import { App } from './page/app';
import { PostCreate } from './page/posts/postCreate';
import { PostPage } from './page/posts/postPage';
import { PostShow } from './page/posts/postShow';
import { Test } from './page/test/test';
import { Warning } from './page/warnnig';
export class Router extends React.Component {
    render() {
        return (
            <HashRouter>
                <Route path = "/">
                    <App>
                        <Route exact path = "/">
                            <p> 홈입니다. </p>
                        </Route>
                        <Route path = "/accounts">
                            <HashRouter basename = "/accounts">
                                <Route path = "/login" component = {Login}/>
                                <Route path = "/register" component = {Register}/>
                            </HashRouter>
                        </Route>
                        <Route path = "/posts">
                            <HashRouter basename = "/posts">
                                <Route path = "/create" component = {PostCreate}/>
                                <Route path = "/page/:nowPage" component = {
                                    ({match}) => {
                                        const params = match.params;
                                        const nowPage = Number(params.nowPage);
                                        if(Number.isNaN(nowPage)) {
                                            return <Warning/>
                                        } else {
                                            return <PostPage nowPage = {nowPage}/>
                                        }
                                    }
                                }/>
                                <Route path = "/:postId" component = {
                                    ({match}) => {
                                        console.log("MATCH", match);
                                        const params = match.params;
                                        const postId = Number(params.postId);
                                        if(Number.isNaN(postId)) {
                                            return <Warning/>
                                        } else {
                                            return <PostShow postId = {postId}/>
                                        }
                                    }   
                                }/>
                            </HashRouter>
                        </Route>
                    </App>
                </Route>
                <Route path = "/test" component = {Test}/>
            </HashRouter>
        );
    }
}