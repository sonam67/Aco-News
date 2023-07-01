import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title,description,imgUrl,newsUrl,author,date,source}=this.props;
    return (
        <div className="card" >
        <img src={imgUrl} className="card-img-top" alt="..."/>
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%', zindex:'1'}} >{source}</span>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {author} on {date}</small></p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read News</a>
        </div>
      </div>
    )
  }
}
export default NewsItems
