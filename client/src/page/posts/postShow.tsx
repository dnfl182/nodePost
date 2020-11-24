import React from 'react'
import { PostsRequest } from '../../request/postsRequest';
export class PostShow extends React.Component<{postId: number}> {       
    constructor(props: any) {
        super(props);
        this.loadPost();
    }
    loadPost = async () => {
        const result = await PostsRequest.get(this.props.postId);
        console.log(result);
        if(result !== undefined) {
            document.getElementById('textTitle').innerHTML = result.title;
            document.getElementById('textUsername').innerHTML = "작성자: " + result.username;
            document.getElementById('textContent').innerHTML = result.content;
        }
    }
    render() {
        return (
        <div className = 'w-75 mx-auto container'>
            <div className = "row bordered">
                <div className = "col-12 border-bottom">
                    <h1 id = "textTitle"> </h1>
                </div>
                <div className = "col-12 border-bottom">
                    <p id = "textUsername"> </p>
                </div>
                <div className = "col-12">
                    <p id = "textContent"> </p>
                </div>
            </div>
        </div>
        );
    }
} 