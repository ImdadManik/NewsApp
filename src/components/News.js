import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=89b3660ab7e145739eb96868b9bf631d&page=1&pageSize=20";
    let data = await fetch(url);
    let jsonDS = await data.json();
    this.setState({ articles: jsonDS.articles, totalResults: jsonDS.totalResults });
  }

  handlPrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=89b3660ab7e145739eb96868b9bf631d&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let jsonDS = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: jsonDS.articles
    });
  }

  handlNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=89b3660ab7e145739eb96868b9bf631d&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let jsonDS = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: jsonDS.articles
      });
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h1>NewsMonkey - Top Headlines.</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={!element.title ? "" : element.title}
                  description={!element.description ? "" : element.description}
                  imageUrl={!element.urlToImage ? "https://static.wpb.tam.us.siteprotect.com/var/m_6/64/644/63319/707786-default-svp_news.jpg" : element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-end">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark mx-2" onClick={this.handlPrevClick}>&larr;Previous</button>
          <button type="button" className="btn btn-dark mx-2" onClick={this.handlNextClick}>Next&rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
