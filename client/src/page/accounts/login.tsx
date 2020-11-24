import React, { InputHTMLAttributes } from 'react'
import { AccountsRequest } from '../../request/accountsRequest';
export class Login extends React.Component {
    login = async () => {
        const username = (document.getElementById('inputUsername') as HTMLInputElement).value;
        const password = (document.getElementById('inputPassword') as HTMLInputElement).value;
        const result = await AccountsRequest.login(username, password);
        if(result) {
            document.getElementById('textError').innerHTML = '';
            document.getElementById('textSuccess').innerHTML = "로그인에 성공하였습니다.";
            setTimeout(() => {
                location.href = "#/";
            }, 500);
        } else {
            document.getElementById('textSuccess').innerHTML = '';
            document.getElementById('textError').innerHTML = "로그인에 실패하였습니다..";
        }
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
                <div className = "col-9 text-center">
                    <button className = "btn btn-primary w-100" onClick = {this.login}>
                        로그인
                    </button> 
                </div>  
                <div className = "col-3 text-center">
                    <a href = "#accounts/register">
                        <button className = "btn btn-warning w-100">
                            회원가입
                        </button> 
                    </a>
                </div>
                <h3 className = "text-success"id="textSuccess"></h3>
                <h3 className = "text-danger"id="textError"></h3>
            </div>
        </div>
        );
    }
} 