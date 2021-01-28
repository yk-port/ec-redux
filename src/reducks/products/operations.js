import { push } from 'connected-react-router';
// firebaseのdbとFirebaseTimestampを使いたいのでimportしておく
import { db, FirebaseTimestamp } from '../../firebase';

// Firebaseのproductsコレクションに対してメソッドを使うことが多くなるので、予めproductsRefという名前で定数として用意しておく
const productsRef = db.collection('products');

// テンプレート内で「商品を保存する」ためのイベントボタンがクリックされた時の処理
export const saveProduct = (id, name, description, category, gender, price, images) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      category,
      description,
      gender,
      images,
      name,
      // 値を10進数の数値型にする処理
      price: parseInt(price, 10),
      updated_at: timestamp
    };

    // 新規作成時の処理（idの値が空だった時）
    if (id === '') {
      const ref = productsRef.doc();
      // 保存したいプロダクトが新規で発生した時のみ、idの採番と保存された日時を登録する
      const id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    // setメソッドは該当のデータを上書きしてしまうので、それを防ぐために第二引数に{ merge: true }を指定する
    return productsRef.doc(id).set(data, { merge: true })
      .then(() => {
        dispatch(push('/'))
      }).catch((error) => {
        // エラーを出力する例外処理を指定
        throw new Error(error)
      })
  }
};