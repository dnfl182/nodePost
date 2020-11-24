import React from 'react'
import { Accordion } from 'react-bootstrap';
import { AccountsRequest } from '../../request/accountsRequest';
export class Nav extends React.Component<{}, {
    isLogined: boolean;

}> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLogined: false
        }
        this.updateIsLogined(); // 업데이트 어떻게 
    }
    updateIsLogined = async () => {
        let isLogiend = await AccountsRequest.isLogined();
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
    logout = async () => {
        const result = await AccountsRequest.logout();
        if(result === true) {
                this.setState((state) => {
                const newState = {...state};
                newState.isLogined = false;
                return newState;
            });
        }
    }
    render() {
        return (
            <div className = 'w-100 mb-3' style = {{background: "#333333", height: "100px"}}>
                <div className = "row h-100">
                        <div className = "col-sm-6 col-lg-3 offset-lg-1">
                            <a href = "#/">
                                <h1 className = "display-3 text-white">게시판</h1>
                            </a>
                        </div>
                    <div className = "col-sm-6 col-lg-3 offset-lg-5 ">
                        {
                            ((() => {
                                if(!this.state.isLogined) {
                                    return(
                                        <a href = "#/accounts/login">
                                        <button className = "btn btn-lg btn-success w-100 h-100" style = {{borderRadius: "0px"}}> 로그인 </button>
                                        </a>
                                    );
                                } else {
                                    return <button onClick = {this.logout} className = "btn btn-lg btn-success w-100 h-100"> 로그아웃 </button>
                                }
                            })())
                        }
                    </div>
                </div>
            </div>
        );
    }
} 