import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'science'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }

  async componentDidMount() {
    this.updateNews();
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89b3660ab7e145739eb96868b9bf631d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;;
    // console.log(url);
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let jsonDS = await data.json();
    // this.setState({
    //   articles: jsonDS.articles,
    //   totalResults: jsonDS.totalResults,
    //   loading: false
    // });
  }

  updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89b3660ab7e145739eb96868b9bf631d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let jsonDS = await data.json();
    this.setState({
      articles: jsonDS.articles,
      loading: false
    });
  }

  handlPrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89b3660ab7e145739eb96868b9bf631d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let jsonDS = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: jsonDS.articles,
    //   loading: false
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  handlNextClick = async () => {
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89b3660ab7e145739eb96868b9bf631d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let jsonDS = await data.json();
    //   this.setState({
    //     articles: jsonDS.articles,
    //     loading: false
    //   });
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines.</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={!element.title ? "" : element.title}
                  description={!element.description ? "" : element.description}
                  imageUrl={!element.urlToImage ? "https://static.wpb.tam.us.siteprotect.com/var/m_6/64/644/63319/707786-default-svp_news.jpg" : element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-end">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark mx-2" onClick={this.handlPrevClick}>&larr;Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark mx-2" onClick={this.handlNextClick}>Next&rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
