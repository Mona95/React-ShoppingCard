import React, {Component} from 'react';
import util from '../util';

class Products extends Component{

    render() {
        const productItems = this.props.products.map(
            product => (
                <div key={product.id} className="col-md-4">
                    <div className="thumbnail text-center">
                        <a href={`#${product.id}`} onClick={(e) => this.props.handleAddToCard(e, product)}>
                            <img alt={product.title} src={`/products/${product.sku}_2.jpg`}/>
                            <p style={{fontSize:13}}>
                                {product.title}
                            </p>
                        </a>
                        <div>
                            <b style={{marginRight:9}}>Price:{util.formatCurrency   (product.price)}</b>
                            <button className="btn btn-primary"
                            onClick={(e) => this.props.handleAddToCard(e, product)}>Add To Card</button>
                        </div>
                    </div> 
                </div>
                
            )
                             
        );
        return (
            <div className="row">
                {productItems}
            </div>
        )
    }
}

export default Products;