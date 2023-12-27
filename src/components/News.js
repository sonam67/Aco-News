import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export  class News extends Component {
  static defaultProps={
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }


  constructor(){
    super();
    this.state={
      articles:[],
      loading:true,
      page:1,
      totalResults:0
    }
  }
  async updateNews(){
    const url=`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da83255d6fcd4f7a9fa206d35782da4c &page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data= await fetch(url);
    let parseData=await data.json()
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading:false
     })
  }

  async componentDidMount(){
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
}

handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews()
}

  fetchMoreData = async() => {
   this.setState({page:this.state.page+1})
   const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da83255d6fcd4f7a9fa206d35782da4c &page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data= await fetch(url);
    let parseData=await data.json()
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading:false
     })
  };
  render() {
    return (
      <>
           <h2 className="text-center" style={{margin: '35px 0px'}}> Quick-News</h2>
           <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length!==this.state.totalResults}
              loader={<Spinner/>}
              >
              <div className="container">
                  <div className="row">
                    {this.state.articles.map((element)=>{
                    return <div className="col-md-4" style={{margin: '10px 0px'}} key={element.url}>
                              <NewsItems title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,90):""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                    })}
                  </div >
              </div>
             
            </InfiniteScroll>
            
            </>
        
    )
  }
}
export default News
