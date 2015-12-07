import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Layout extends Component {
    render () {
        return (
            <div>
                <ul>
                    <li><Link to="/">Welcome</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>

                {this.props.children}
            </div>
        );
    }
}
