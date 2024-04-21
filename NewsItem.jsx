import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date } = this.props
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={!imageUrl ? "https://s.yimg.com/ny/api/res/1.2/36VJkdzWZw10B1QnrXJapQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-09/c6d9b560-524d-11ee-ae77-bddecb66f1e7" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toLocaleString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;
