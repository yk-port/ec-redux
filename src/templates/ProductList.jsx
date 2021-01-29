import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ProductCard } from '../components/Products';

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 && (
          products.map(product => {
            return (
              <ProductCard
                id={product.id} images={product.images}
                price={product.price} productName={product.productName}
              />
            )
          })
        )}
      </div>
    </section>
  )
}

export default ProductList;
