import React from 'react'
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { AJAX } from '../../ajax/ajax';
export class Test extends React.Component<{},{
    method: string;
    url: string;
    dataInfos: Array<{
        name: string;
        type: string;
        value: any;
    }>;
    result: string;
}>{
    constructor(prop: any) {
        super(prop);
        this.state = {
            method: 'GET',
            url: '',
            dataInfos: [],
            result: ''
        };
    }
    render() {
        const onChangeDataInfo = (index, valueName) => {
            return (e) => {
                this.setState((state) => {
                    const newState = {...state};
                    newState.dataInfos[index][valueName] = e.target.value;
                    return newState;
                }); 
            }
        }
        const getInputType = (type: string) => {
            switch(type) {
                case 'string': return 'text';
                case 'number': return 'number';
                case 'boolean': return 'text';
            }
            return 'text';
        }
        const onClickType = (index:number, type: string) => {
            return () => { 
                this.setState((state) => {
                    const newState = {...state};
                    newState.dataInfos[index].type = type;

                    if(type === 'string') {
                        newState.dataInfos[index].value = '';
                    } else if(type === 'number') {
                        newState.dataInfos[index].value = "0";
                    } else if(type === 'boolean') {
                        newState.dataInfos[index].value = "false";
                    }
                    return newState;
                });
            }
        }
        const onClickMethod = (method: string) => {
            return () => {
                this.setState((state) => {
                    const newState = {...state};
                    newState.method= method;
                    return newState;
                });
            }
        }
        const dataInputBox = (dataInfo, index) => {
            return (
                <div className = "col-12 form-group" key = {index}>
                    <div className = "form-row">
                        <div className ="col-12">
                            <button className = "btn btn-primary dropdown-toggle w-100" type = "button" id ={"dropdown" + index} data-toggle = "dropdown" aria-haspopup ="true" aria-expanded="false">{dataInfo.type}</button>
                            <div className="dropdown-menu" aria-labelledby={"dropdown" + index}>
                                <button className="dropdown-item" onClick = {onClickType(index, 'string')}>string</button>
                                <button className="dropdown-item" onClick = {onClickType(index, 'number')}>number</button>
                                <button className="dropdown-item" onClick = {onClickType(index, 'boolean')}>boolean</button>
                            </div>
                        </div>
                        <div className ="col-5">
                            <input type="text" maxLength = {1024} id={"inputName" + index} className="form-control" placeholder = "이름" value = {dataInfo.name} onChange = {onChangeDataInfo(index, 'name')}></input>
                        </div>
                        <div className ="col-5">
                            <input type={getInputType(dataInfo.type)} maxLength = {1024} id={"inputValue" + index} className="form-control" placeholder = "데이터" value = {dataInfo.value} onChange = {onChangeDataInfo(index, 'value')}></input>
                        </div>
                        <div className ="col-2">
                            <button className ="btn btn-warning w-100" onClick = {
                                (e) => {
                                    this.setState((state) => {
                                        const newState = {...state};
                                        newState.dataInfos.splice(index, 1);
                                        return newState;
                                    });
                                }
                            }>삭제</button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className = "w-75 mx-auto">
                <div className = "container">
                    <div className = "row">
                        <div className = "col-12 form-group">
                            <div className = "row">
                                <div className = "col-12">
                                    <button className = "btn btn-primary dropdown-toggle w-100" type = "button" id ={"dropdownMethod"} data-toggle = "dropdown" aria-haspopup ="true" aria-expanded="false">{this.state.method}</button>
                                    <div className="dropdown-menu" aria-labelledby={"dropdownMethod"}>
                                        {
                                            ['GET','POST','PATCH','PUT','DELETE'].map((value) => {
                                                return <button className="dropdown-item" onClick = {onClickMethod(value)} key = {value}>{value}</button>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className = "col-12">
                                    <input type="text" id="inputURL" className="form-control" placeholder = "URL" onChange = {
                                        (e) => {
                                            this.setState((state) => {
                                                const newState = {...state};
                                                newState.url = e.target.value;
                                                return newState;
                                            }); 
                                        }
                                    }></input>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.dataInfos.map(dataInputBox)
                        }
                        <div className = "col-12">
                            <div className = "row">
                                <div className = "col-6">
                                    <button className = "btn btn-primary w-100" onClick = {
                                        () => {
                                            this.setState((state) => {
                                                const newState = {
                                                    ...state
                                                };
                                                newState.dataInfos.push({
                                                    name: "",
                                                    type: "string",
                                                    value: ""
                                                });
                                                return newState;
                                            });
                                            
                                        }
                                    }> 데이터 추가 </button>
                                </div>
                                <div className = "col-6">
                                    <button className = "btn btn-primary w-100" onClick = {
                                        async () => {
                                            const data = {};
                                            for(const dataInfo of this.state.dataInfos) {
                                                if(dataInfo.type == 'number') {
                                                    data[dataInfo.name] = new Number(dataInfo.value);
                                                } else if(dataInfo.type == 'boolean') {
                                                    data[dataInfo.name] = dataInfo.value === 'true'
                                                } else {
                                                    data[dataInfo.name] = dataInfo.value;
                                                }
                                            }
                                            const result = await AJAX.ajaxReturnAny(this.state.method, this.state.url, data)
                                            this.setState((state) => {
                                                const newState = {...state};
                                                newState.result = result;
                                                return newState;
                                            })
                                        }
                                    }> AJAX </button>
                                </div>
                            </div>
                        </div>
                        <div className = "col-12">
                                <textarea className = "form-control w-100" style = {{height: "200px"}} defaultValue = {this.state.result} readOnly>
                                </textarea>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}