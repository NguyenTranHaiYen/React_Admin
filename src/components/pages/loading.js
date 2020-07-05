import React, { Component } from 'react';

import { PushSpinner, GridSpinner, CombSpinner, FlapperSpinner } from "react-spinners-kit";

import './loading.css';
export default class Loading extends Component {
    constructor(props) {
        super(props)
        this.props = {
            isShow: false
        }
    }
    render() {
        return (
            <div className="loading-page"
                style={{ display: this.props.isShow ? "block" : "none", }}
            >
                <FlapperSpinner
                    size={100}
                    color="red"
                    loading={true}
                />
            </div>
        )
    }
}