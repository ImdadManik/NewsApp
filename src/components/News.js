import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'; 

export class News extends Component {
  apiKey = 'fa7b383e7cc54ee59c72342a0e1820e1';
  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'science'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalize(this.props.category)}`;
  }

  capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  async componentDidMount() {
     this.updateNews();
  }

  updateNews = async () => {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let jsonDS = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: jsonDS.articles,
      loading: false,
      totalResults: jsonDS.totalResults
    });
    this.props.setProgress(100);
  }

  handlPrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  handlNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1, loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let jsonDS = await data.json();
    this.setState({
      articles: this.state.articles.concat(jsonDS.articles),
      totalResults: jsonDS.totalResults,
      loading: false
    });
  }

  render() {
    return (
      <>
        <h1 className="text-center">NewsMonkey - Top {this.capitalize(this.props.category)} Headlines.</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, index) => {
                return (
                  <div className="col-md-4" key={element.url + index}>
                    <NewsItem
                      title={!element.title ? "" : element.title}
                      description={!element.description ? "" : element.description}
                      imageUrl={!element.urlToImage ? "https://static.wpb.tam.us.siteprotect.com/var/m_6/64/644/63319/707786-default-svp_news.jpg" : element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name} />
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