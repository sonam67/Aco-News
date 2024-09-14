import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
    language: 'en',
    keyword: 'latest'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    language: PropTypes.string,
    keyword: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews() {
    const { keyword, country, category, language } = this.props;
    const { page } = this.state;
  
    const apiKey = '2cd4b130968fd3d94a3db5fc7bd72b5a'; // Replace with your GNews API key
    const url = `https://gnews.io/api/v4/search?q=${keyword || 'latest'}&lang=${language || 'en'}&country=${country || 'us'}&category=${category || ''}&page=${page || 1}&apikey=${apiKey}`;
  
    this.setState({ loading: true });
  
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  }
  
  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    const { keyword, country, category, language } = this.props;
    const nextPage = this.state.page + 1;

    this.setState({ page: nextPage });

    const url = `http://localhost:5000/news?keyword=${keyword}&country=${country}&category=${category}&language=${language}&page=${nextPage}`;

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState((prevState) => ({
        articles: [...prevState.articles, ...parsedData.articles],
        totalResults: parsedData.totalResults,
      }));
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: '35px 0px' }}>Quick-News</h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" style={{ margin: '10px 0px' }} key={element.url}>
                    <NewsItems
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={element.description ? element.description.slice(0, 90) : ""}
                      imgUrl={element.image}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
