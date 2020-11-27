import React from 'react'
import { SessionRequest } from '../../request/sessionRequest';
import { SessionChangeEventInvoker } from '../../invoker/sessionChangeEventInvoker';
export class Nav extends React.Component<{}, {
    isLogined: boolean;
    sessionChangeEventRevokerKey?: string
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLogined: false,
            sessionChangeEventRevokerKey: undefined
        }
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
    logout = async () => {
        const result = await SessionRequest.logout();
        if(result === true) {
                this.setState((state) => {
                const newState = {...state};
                newState.isLogined = false;
                return newState;
            });
        }
    }
    componentDidMount() {
        this.updateIsLogined();
        this.setState( (state) => {
            const newState = {...state};
            newState.sessionChangeEventRevokerKey = SessionChangeEventInvoker.addListener(this.updateIsLogined);
            return newState;
        });
    }
    componentWillUnmount() {
        SessionChangeEventInvoker.removeListener(this.state.sessionChangeEventRevokerKey);
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
                                    return <button onClick = {this.logout} className = "btn btn-lg btn-success w-100 h-100" style = {{borderRadius: "0px"}}> 로그아웃 </button>
                                }
                            })())
                        }
                    </div>
                </div>
            </div>
        );
    }
} 