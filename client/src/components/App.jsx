import React from 'react';

import Overview from './overview/Overview.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';
import Outfit from './relatedItems/Outfit.jsx';
import QA from './qa/QA.jsx';
import Reviews from './reviews/Reviews.jsx';
import axios from 'axios';
import Star from './Star/Star.jsx';

import {calculateRating} from '../helpers.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      product: {},
      rating: 0,
      reviewsMeta: {}
    }
    this.reviewsRef = React.createRef();
  }

  componentDidMount() {
    this.getProducts()
    .then(()=> {
      this.getReviewsMeta()
    })
  }

  getProducts() {
    return axios.get('/products')
      .then(res => {
        console.log('Products: ', res.data)
        console.log('Product: ', res.data[4])
        return this.setState({
          products: res.data,
<<<<<<< HEAD
          product: res.data[4]
=======
          product: res.data[1]
>>>>>>> 10ea415783b48f9cb106a8e0686e60865e62f9f9
        })
      })
  }

  getReviewsMeta() {
    return axios.get(`/reviews/meta/${this.state.product.id}`)
      .then((res) => {
        console.log('Review Meta: ', res.data)
        return this.setState({
          reviewsMeta: res.data,
          rating: calculateRating(res.data.ratings)
        });
      })
  }

  selectProduct(product) {
    return this.setState({product}, () => {
      return this.getReviewsMeta()
    })
  }

  handleScrollToReviews(event) {
    window.scrollTo(0, this.reviewsRef.current.offsetTop);
  }

  render() {
    if (JSON.stringify(this.state.product) !=='{}' && JSON.stringify(this.state.reviewsMeta) !=='{}') {
      return (
        <div className='container'>
          <Overview product={this.state.product} handleScrollToReviews={this.handleScrollToReviews.bind(this)} rating={this.state.rating} />
          <RelatedItems product={this.state.product} product2={this.state.products[4]} selectProduct={this.selectProduct.bind(this)}/>
          <Outfit product={this.state.product}/>
          <QA product={this.state.product}/>
          {JSON.stringify(this.state.reviewsMeta) !=='{}' && <Reviews product={this.state.product} rating={this.state.rating} reviewsMeta={this.state.reviewsMeta} scrollToReviews={this.reviewsRef}/>}

        </div>
      )
    } else {
      return null;
    }




    // if (JSON.stringify(this.state.product) !=='{}' && this.state.reviews.length !== 0 && JSON.stringify(this.state.reviewsMeta) !=='{}') {
    //   return (
    //     <div className='container'>
    //       <Overview product={this.state.product} handleScrollToReviews={this.handleScrollToReviews.bind(this)} rating={this.state.rating}/>
    //       {/* <RelatedItems product={this.state.product}/> */}
    //       <QA product={this.state.product}/>
    //       <Reviews product={this.state.product} reviews={this.state.reviews} scrollToReviews={this.reviewsRef}/>
    //     </div>
    //   )
    // } else {
    //   return null;
    // }

  }
}

export default App;
