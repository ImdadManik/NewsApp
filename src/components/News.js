import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fa7b383e7cc54ee59c72342a0e1820e1&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let jsonDS = await data.json();
    props.setProgress(50);
    setArticles(jsonDS.articles);
    setTotalResults(jsonDS.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
    document.title = `${capitalize(props.category)} + NewMonkey`;
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fa7b383e7cc54ee59c72342a0e1820e1&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let jsonDS = await data.json();
    setArticles(articles.concat(jsonDS.articles));
    setTotalResults(jsonDS.totalResults);
    setLoading(false);
  }

  return (
    <>
      <h1 style={{ marginTop: '90px' }} className="text-center">NewsMonkey - Top {capitalize(props.category)} Headlines.</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}>
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
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
  )
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
};

News.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: 'science'
};

export default News;
