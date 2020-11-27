import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Login } from './page/accounts/login';
import { Register } from './page/accounts/register';
import { App } from './page/app';
import { PostCreate } from './page/posts/postCreate';
import { PostPage } from './page/posts/postPage';
import { PostShow } from './page/posts/postShow';
import { Test } from './page/test/test';
export class Router extends React.Component {
    render() {
        return (
            <HashRouter>
                <Route path = "/">
                    <App>
                        <Route exact path = "/">
                            <PostPage nowPage ={1} numSidePage = {3}/>
                        </Route>
                        <Route path = "/accounts">
                            <HashRouter basename = "/accounts">
                                <Route path = "/login" component = {Login}/>
                                <Route path = "/register" component = {Register}/>
                            </HashRouter>
                        </Route>
                        <Route path = "/posts">
                            <HashRouter basename = "/posts">
                                <Switch>
                                    <Route exact path = "/create" component = {PostCreate}/>
                                    <Route exact path = "/page/:nowPage" component = {
                                        ({match}) => {
                                            const nowPage = Number(match.params.nowPage);
                                            if(Number.isNaN(nowPage)) {
                                                return <div></div>;
                                            } else {
                                                return <PostPage nowPage = {nowPage} numSidePage = {3}/>
                                            }
                                        }
                                    }/>
                                    <Route exact path = "/:postId" component = {
                                            ({match}) => {
                                                const postId = Number(match.params.postId);
                                                if(Number.isNaN(postId)) {
                                                    return <div></div>;
                                                } else {
                                                    return <PostShow postId = {postId}/>
                                                }
                                        }   
                                    }/>
                                </Switch>
                            </HashRouter>
                        </Route>
                    </App>
                </Route>
                <Route path = "/test" component = {Test}/>
            </HashRouter>
        );
    }
}