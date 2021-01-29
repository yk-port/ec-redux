export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const deleteProductAction = (product) => {
  return { 
    type: 'DELETE_PRODUCT',
    payload: product
  }
}

export const fetchProductsAction = (products) => {
  return {
    type: 'FETCH_PRODUCTS',
    payload: products
  }
};
