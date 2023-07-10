
import React from 'react'

const NewsItem =(props)=> {
  
  
    let {title,description,imageurl,newsUrl,author, date, sources} =props;
    return (
      <div className='my-3'>
        <div className="card " >
          <div style={{display: "flex", justifyContent: 'flex-end', position: 'absolute', right: 0}}>

        <span className="badge rounded-pill bg-danger">{sources}</span>
          </div>
            <img src={imageurl?imageurl:"https://guwahatiplus.com/public/web/images/default-news.png"} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date (date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More...</a>
  </div>
</div>
      </div>
    )
  }


export default NewsItem
