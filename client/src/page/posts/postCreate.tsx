import React from 'react'
import { PostsRequest } from '../../request/postsRequest';
export class PostCreate extends React.Component {
    create = async () => {
        const title = (document.getElementById('inputTitle') as HTMLInputElement).value;
        const content = (document.getElementById('inputContent') as HTMLInputElement).value;
        console.log(title,content);
        const result = await PostsRequest.create(title, content);
        if(result) {
            this.success('글이 작성되었습니다.');
            setTimeout(() => {
                location.href = "#/posts/page/1"
                history.go(0);
            }, 500)
        } else {
            this.error('실패하였습니다.');
        }
    }
    error = (message: string) => {
        document.getElementById('textSuccess').innerHTML = '';
        document.getElementById('textError').innerHTML = message;
    }
    success = (message: string) => {
        document.getElementById('textError').innerHTML = '';
        document.getElementById('textSuccess').innerHTML = message;
    }
    render() {
        return (
        <div className = 'w-75 mx-auto container'>
            <div className = "form-row form-group">
                <div className = "col-12 form-group">
                    <label htmlFor = "inputTitle"> 제목 </label>
                    <input type = "text" className = "form-control" id = "inputTitle"></input>
                </div>
                <div className = "col-12 form-group">
                    <label htmlFor = "inputContent"> 본문 </label>
                    <textarea style ={{height: "300px"}} className = "form-control" id = "inputContent"></textarea>
                </div>
                <div className = "col-12 text-center">
                    <button onClick = {this.create} className = "btn btn-primary w-100">
                        작성
                    </button> 
                </div>  
                <h3 className = "text-success"id="textSuccess"></h3>
                <h3 className = "text-danger"id="textError"></h3>
            </div>
        </div>
        );
    }
} 