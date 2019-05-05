import React, { Component } from "react";
import {connect} from 'react-redux';
import {increment,decrement,reset} from '~/redux/actions/counter';
 import './counter.css';



 class Counter extends Component {


    componentDidMount(){
 
    }
       
  render() {
   const   { counter , dispatch }=  this.props;
    return (
      <div>
        <div className='counter-box'>当前计数为{counter.count}</div>
        <button
          onClick={() => {
            dispatch(increment())
          }}
        >
          自增
        </button>
        <button
          onClick={() => {
            dispatch(decrement())
          }}
        >
          自减
        </button>
        <button
          onClick={() => {
           dispatch(reset ())
          }}
        >
          重置
        </button>
      </div>
    );
  }
}

 const  mapStateToProps =(state)=> ({
      counter : state.counter
 })


export default  connect (mapStateToProps)(Counter)