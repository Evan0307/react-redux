import React, { Component } from "react";
import img from '~/asset/asset.jpg';
export default class Home extends Component {
  render() {
    return <div>this is home~
      <img src={img} alt=""/>
    </div>;
  }
}
