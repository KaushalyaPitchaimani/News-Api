import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'





export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: "8",
        category: "general"

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("hello from news component")
        this.state = {
            articles: [],
            page: 1

        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}- NewsShorts`;
    }

    async updateNews() {
        const url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url)
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
        console.log(parsedData)
    }

    async componentDidMount() {
        this.updateNews();

    }

    handlePrevClick = async () => {

        this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }
    handleNextClick = async () => {

        this.setState({ page: this.state.page + 1 })
        this.updateNews();


    }
    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>News Short - Top {this.capitalizeFirstLetter(
                    this.props.category
                )} Headlines</h2>



                <div className='row'>
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description}
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                        </div>
                    })}


                </div>


                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next&rarr;</button>
                </div>



            </div>
        )
    }
}

export default News
