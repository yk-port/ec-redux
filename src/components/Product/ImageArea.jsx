import React, { useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/styles';
import { storage } from '../../firebase';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48
  }
});

const ImageArea = (props) => {
  const classes = useStyles();

  const uploadImage = useCallback((event) => {
    // 画像をアップした時に、どのファイルがアップされ方を取得する時は event.target.files で取得できる
    const file = event.target.files;
    // event.target.filesで取得したファイルをそのままCloudStorageにアップすることはできない
    // Blobオブジェクトに変換する必要がある（第一引数にアップしたい画像ファイルを、第二引数にはその画像のタイプを指定）
    let blob = new Blob(file, { type: 'image/jpeg' });

    // CloudStorageにアップする時、そのファイルを名をランダムな文字列に変換したい（CloudStorage上で同じファイル名が存在したら、そこでファイル名の競合が起こってしまうため）
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    // Array.from()は、引数の文字列から配列を生成するメソッド
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
                          .map((n) => S[n%S.length]).join('');

    // firebaseのindex.jsで定義したstorage（Firebaseのstorageインスタンス）に対して.refメソッドを与える
    // imagesというCloudStorage上のディレクトリにfileNameの値をアップロードするための用意
    const uploadRef = storage.ref('images').child(fileName);
    // 上で指定した場所（uploadRef）にputメソッドを使ってアップロードするファイル（blob）を指定する
    const uploadTask = uploadRef.put(blob);

    // 画像のアップロードが完了したら、その画像ファイルのダウンロードできるURLを取得したい ※uploadTask.snapshot.ref.getDownloadURL()
    uploadTask.then(() => {
      uploadTask.snapshot.ref.getDownloadURL()
        // ダウンロードしたURLを、HTMLのimageタグのsrcの箇所に反映させたい
        .then((downloadURL) => {
          // src属性に値を渡す時に参照できるオブジェクトを用意しておく
          const newImage = { id: fileName, path: downloadURL };
          // 親コンポーネントから渡ってたsetImagesメソッド（imegesを更新する関数）を使う
          // useStateは更新する前のstateの値を参照できる（更新前のstateを参照するには、prevStateを使う）
          // imagesの中にある既存のデータを展開して、さらに今回追加するデータ（newImage ※オブジェクト）を追加して更新する
          props.setImages((prevState => [...prevState, newImage]))
        });
    })
  }, [props.setImages])

  return (
    <div>
      {/* <div className="p-grid__list-images">
        {images.length > 0 && (
            images.map(image => <ImagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id} /> )
        )}
      </div> */}
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
};

export default ImageArea;
