import React, {Component} from 'react';
import './App.css';
import Products from './components/Products';
import FilterBar from './components/FilterBar';
import Basket from './components/Basket';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
       products: [], filteredProducts: [], cartItems: []
    }
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleAddToCard = this.handleAddToCard.bind(this); 
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  componentWillMount(){

    if (localStorage.getItem('cartItems')) {
      this.setState({ cartItems: JSON.parse(localStorage.getItem('cartItems')) });
    }
     
    fetch("http://localhost:8000/products").then(res=> res.json())
    .then( data => this.setState({
      products: data,
      filteredProducts: data
    }));
  }

  handleSortChange(e){
    this.setState({sort : e.target.value});
    this.listProducts();
  }

  handleSizeChange(e){
    this.setState({size : e.target.value});
    this.listProducts();
  }

  listProducts(){
    this.setState( state => {
      if( state.sort !== ""){
        state.products.sort((a,b) => (state.sort==="lowestprice") ? 
        (a.price > b.price? 1: -1)
        : (a.price < b.price ? 1: -1)
        )
      } else {
        state.products.sort((a,b) => (a.id < b.id? 1 : -1));
      }

      if(state.size !== "") {
        return { filteredProducts : state.products.filter( a=> 
          a.availableSizes.indexOf(state.size.toUpperCase())>=0)}
      }
      return {filteredProducts : state.products};
    })
  }

  handleAddToCard(e, product){
    this.setState( state => {
      const cartItems = state.cartItems;
      let inCart = false;
        cartItems.forEach(item => {
          if (item.id === product.id){
            inCart = true;
            item.count++;
          }
        });
        if(!inCart){
          cartItems.push({...product, count:1});
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return cartItems;
    })
  }

  handleRemoveFromCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(a => a.id !== product.id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    })
  }

  render(){
     return (
    <div className="container">
      <h1>Ecommerce Shopping Card Application</h1>
      <hr/>
      <div className="row">
        <div className="col-md-8">
          <FilterBar sort={this.state.sort} size={this.state.size}
                    handleSizeChange={this.handleSizeChange}
                    handleSortChange={this.handleSortChange}
                    count={this.state.filteredProducts.length}/>
          <hr/>
          <Products products={this.state.filteredProducts} handleAddToCard={this.handleAddToCard} />
        </div>
        <div className="col-md-4">
          <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
        </div>
      </div>
    </div>
  );
  }
 
}

export default App;
