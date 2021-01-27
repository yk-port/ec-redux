import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48
  }
});

const ImageArea = (props) => {
  const classes = useStyles();

  return (
    <div>
      <div className="p-grid__list-images">
        {images.length > 0 && (
            images.map(image => <ImagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id} /> )
        )}
      </div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input className="u-display-none" type="file" id="image" onChange={e => uploadImage(e)}/>
          </label>
        </IconButton>
      </div>
    </div>
  )
}

export default ImageArea;
