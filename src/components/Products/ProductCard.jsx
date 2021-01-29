import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImage from '../../assets/img/src/no_image.png'
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

// makeStylesでthemeを使う時→アプリ全体で管理しているmaterialUIのテーマ（色とかフォントサイズとかブレイクポイントとか）を↓
// 変更したい時はthemeを引数に取る ※部分的にcssを摘要したいときは引数にthemeを指定しなくてOK
const useStyles = makeStyles((theme) => ({
  root: {
    // ブレイクポイントを指定するときに↓のような書き方をする（.downは〜以下のとき、という意味）
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)'
    },
    // ブレイクポイントを指定するときに↓のような書き方をする（.upは〜以上のとき、という意味）
    [theme.breakpoints.up('md')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)'
    }
  },
  content: {
    display: 'flex',
    padding: '16 8',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16
    }
  },
  icon: {
    marginRight: 0,
    marginLeft: 'auto'
  },
  media: {
    height: 0,
    paddingTop: '100%'
  },
  price: {
    color: theme.palette.secondary.dark,
    fontSize: 16
  },
  productName: {
    boxOrient: 'vertical',
    display: '-webkit-box',
    fontSize: 14,
    lineHeight: '18px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      height: 36,
      lineClamp: 2,
    },
    [theme.breakpoints.up('md')]: {
      height: 18,
      lineClamp: 1,
    }
  }
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const images = props.images.length > 0 ?
                 props.images :
                 [NoImage];

  // 数値型に対してtoLocaleString()をして3桁区切りで表示する
  const price = props.price.toLocaleString();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={images[0].path}
        onClick={() => dispatch(push('products/' + props.id))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push('products/' + props.id))}>
          <Typography className={classes.productName} color="textSecondary" component="p">
            {props.name}
          </Typography>
          <Typography className={classes.price} component="p">
            ¥{price}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard;
