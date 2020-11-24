import React from 'react'
import { AccountsRequest } from '../../request/accountsRequest';
export class Register extends React.Component {
    
    register = async () => {
        const username = (document.getElementById('inputUsername') as HTMLInputElement).value;
        const password = (document.getElementById('inputPassword') as HTMLInputElement).value;
        const rePassword = (document.getElementById('inputRePassword') as HTMLInputElement).value; 
        if(password !== rePassword) {
            this.error('비밀번호를 다시확인해주세여');
            return;
        }
        const isExistUsernameResult = await AccountsRequest.isExistUsername(username);
        if(isExistUsernameResult === undefined) {
            this.error('잠시후 다시 시도해 주세요');
            return;
        }
        if(!isExistUsernameResult) {
            this.error('아이디가 중복되었습니다. 다른 아이디를 입력해주세요.');
            return;
        } 
        const registerResult = await AccountsRequest.register(username, password);
        
        if(registerResult) {
            this.success("회원가입 성공하였습니다.");
            setTimeout(() => location.href = "#/accounts/login", 500);
        } else {
            this.error("회원가입 실패하였습니다.");
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
                    <label htmlFor = "inputUsername"> 아이디 </label>
                    <input type = "text" className = "form-control" id = "inputUsername"></input>
                </div>
                <div className = "col-12 form-group">
                    <label htmlFor = "inputPassword"> 비밀번호 </label>
                    <input type = "password" className = "form-control" id = "inputPassword"></input>
                </div>
                <div className = "col-12 form-group">
                    <label htmlFor = "inputRePassword"> 비밀번호 확인 </label>
                    <input type = "password" className = "form-control" id = "inputRePassword"></input>
                </div>
                <div className = "col-12 text-center">
                    <button onClick = {this.register} className = "btn btn-warning w-100">
                        회원가입
                    </button> 
                </div>  
                <h3 className = "text-success"id="textSuccess"></h3>
                <h3 className = "text-danger"id="textError"></h3>
            </div>
        </div>
        );
    }
} 