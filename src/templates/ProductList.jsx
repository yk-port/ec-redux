import React from 'react';

const ProductList = () => {
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
