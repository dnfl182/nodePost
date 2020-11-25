import React from 'react'
import { SessionRequest } from '../../request/sessionRequest';
export class Login extends React.Component<{}, {
    textError: string;
    textSuccess: string;
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            textError: '',
            textSuccess: ''
        };
    }
    login = async () => {
        const username = (document.getElementById('inputUsername') as HTMLInputElement).value;      
        const password = (document.getElementById('inputPassword') as HTMLInputElement).value;
        const result = await SessionRequest.login(username, password);
        if(result) {
            this.updateSuccess("로그인에 성공하였습니다");
            setTimeout(() => {
                location.href = "#/";
            }, 500);
        } else {
            this.updateError("로그인에 실패하였습니다.")
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
                <h3 className = "text-success"id="textSuccess">{this.state.textSuccess}</h3>
                <h3 className = "text-danger"id="textError">{this.state.textError}</h3>
            </div>
        </div>
        );
    }
} 