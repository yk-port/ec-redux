import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  sliderBox: {
      [theme.breakpoints.down('sm')]: {
          margin: '0 auto 24px auto',
          height: 320,
          width: 320
      },
      [theme.breakpoints.up('sm')]: {
          margin: '0 auto',
          height: 400,
          width: 400
      },
  },
  detail: {
      textAlign: 'left',
      [theme.breakpoints.down('sm')]: {
          margin: '0 auto 16px auto',
          height: 320,
          width: 320
      },
      [theme.breakpoints.up('sm')]: {
          margin: '0 auto',
          height: 'auto',
          width: 400
      },
  },
  price: {
      fontSize: 36
  }
}))
 
const ProductDetail = () => {
  const classes = useStyles()
  const selector = useSelector(state => state);
  // reduxのStoreで管理しているルーティングの情報の中にlocation.pathnameがあり、今のURLのパスを取得できる
  const path = selector.router.location.pathname;
  // 取得したパスを分解して、product/hogeのhogeの部分を取得する
  const id = path.split('/product/')[1];

  const [product, setProduct] = useState(null);

  // 初めにrenderされたらFirebaseのdbから情報を取得してproductにセットする
  useEffect(() => {
    db.collection('products').doc(id).get()
      .then(doc => {
        const data = doc.data();
        setProduct(data);
      })
  }, [])

  return (
    <section className="c-section-wrapin">
      {/* productが存在していたら、を冒頭に指定する */}
      {product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images}/>
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>¥{(product.price).toLocaleString()}</p>
            <div className="module-spacer--small"/>
            <SizeTable addProduct={addProduct} sizes={product.sizes} />
            <div className="module-spacer--small"/>
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetail;
