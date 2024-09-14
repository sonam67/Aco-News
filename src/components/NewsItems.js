import React, { Component } from 'react';

export class NewsItems extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date, source } = this.props;
    
    // Provide fallback values for undefined or null data
    const fallbackAuthor = "Unknown Author";
    const fallbackDate = new Date().toLocaleDateString();

    return (
      <div className="card">
        {/* Conditional rendering for image */}
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={title || "News Image"}
            className="card-img-top w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-700">
            No Image
          </div>
        )}
        
        {/* Badge for the source */}
        <span 
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" 
          style={{ left: '90%', zIndex: '1' }}
        >
          {source || 'Unknown Source'}
        </span>

        <div className="card-body">
          <h5 className="card-title">{title ? title.slice(0, 45) : "No Title"}...</h5>
          <p className="card-text">{description ? description.slice(0, 90) : "No Description"}...</p>

          {/* Display fallback values if author or date is missing */}
          <p className="card-text">
            <small className="text-muted">
              By {author || fallbackAuthor} on {new Date(date).toLocaleDateString() || fallbackDate}
            </small>
          </p>
          
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read News</a>
        </div>
      </div>
    );
  }
}

export default NewsItems;
