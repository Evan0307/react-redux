import React from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from '~/redux/actions/userInfo';


class UserInfo  extends React.Component{
  
    render (){
        console.log(this.props)
           const  {isLoading,errorMsg,userInfo} =  this.props.userInfo;

        return (
            <div>
            {
                isLoading ? '请求信息中......' :
                    (
                        errorMsg ? errorMsg :
                            <div>
                                <p>用户信息：</p>
                                <p>用户名：{userInfo.name}</p>
                                <p>介绍：{userInfo.intro}</p>
                            </div>
                    )
            }
            <button onClick={() => this.props.getUserInfo()}>请求用户信息</button>
        </div>
        )
    }
}

 const mapStateToprops =  state =>
 {
     console.log(state.userInfo);
    return {userInfo : state.userInfo } 
 }

 export  default  connect (mapStateToprops,{getUserInfo})(UserInfo)