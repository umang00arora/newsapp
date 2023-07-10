import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  
  
  const updateNews=async()=>
  {
    props.setProgress(10)
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData= await data.json();
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  
  useEffect(() => {
    document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonkey`
    updateNews();
    //eslint-disable-next-line
  }, []) 
  

 
  // handleNextClick=async()=>{
  //   await this.setState({page: this.state.page + 1})
  //   await this.updateNews();
  // }
  // handlePrevClick=async()=>{
  //   await this.setState({page: this.state.page - 1})
  //   await this.updateNews();
  // }

  const fetchMoreData=async()=>{
   
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    //setLoading(true)
    let data = await fetch(url);
    let parsedData= await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    //setLoading(false)
    setPage(page + 1)
    
  }

  
    return (
      <>
       

        <h1 className='text-center ' style={{marginTop: '70px'}}>NewsMonkey -Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h1>
        {loading && <Spinner/>}
       
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

        <div className="row my-2">
        {articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:" "} description={element.description?element.description:" "} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} sources={element.source.name}/>
            </div>
          
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }


News.defaultProps={
  country: 'in',
  pageSize: 5,
  category: 'general',
}
News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
