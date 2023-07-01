import React, { Component } from 'react'
import loading from './loading.gif'
export  class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading} alt="loading" width="25" height="50"/>
      </div>
    )
  }
}
export default Spinner
