import React from 'react'
import { Nav } from './nav/nav';
export class App extends React.Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div>
                <Nav/>
                {this.props.children}
            </div>
        );
    }
} 