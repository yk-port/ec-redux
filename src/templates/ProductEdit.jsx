import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit';
import { saveProduct } from '../reducks/products/operations';
import { ImageArea, SetSizesArea } from "../components/Products";
import { db } from '../firebase';

const ProductEdit = () => {
  const dispatch = useDispatch();
  // 渡ってきているURLから、新規でプロダクトを作成なのか、既存のプロダクトを編集なのかを判定する
  // /product/edit → 新規作成 or /product/edit/hoge → 編集 として判定として、hogeに該当する部分の値を取得する
  let id = window.location.pathname.split('/product/edit')[1];
  if (id !== '') {
    id = id.split('/')[1];
  }

  const [name, setName] = useState(''),
        [description, setDescription] = useState(''),
        [category, setCategory] = useState(''),
        [gender, setGender] = useState(''),
        [images, setImages] = useState([]),
        [price, setPrice] = useState(''),
        [sizes, setSizes] = useState([]);

  // useCallbackを使って関数をメモ化する
  // 親で定義したメソッド・関数を子コンポーネントで使う時は、パフォーマンスを向上する観点でuseCallbackを使う
  const inputName = useCallback((event) => {
    setName(event.target.value)
  }, [setName]);

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
  }, [setDescription]);

  const inputPrice = useCallback((event) => {
    setPrice(event.target.value)
  }, [setPrice]);

  // 親コンポーネントでカテゴリーの要素を配列で定義しておく
  const categories = [
    { id: 'tops', name: 'トップス' },
    { id: 'shirts', name: 'シャツ' },
    { id: 'pants', name: 'パンツ' },
  ];

  const genders = [
    { id: 'all', name: 'すべて' },
    { id: 'male', name: 'メンズ' },
    { id: 'female', name: 'レディース' },
  ];

  useEffect(() => {
    // もしidに値が入っていたら、Firebaseのproductコレクションからインスタンスを取得したい
    if (id !== '') {
      db.collection('products').doc(id).get()
        .then(snapshot => {
          const data = snapshot.data();
          setImages(data.images);
          setName(data.name);
          setDescription(data.description);
          setCategory(data.categories);
          setGender(data.gender);
          setPrice(data.price);
          setSizes(data.sizes);
        })
    }
  }, [id]);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true} label={"商品名"} multiline={false} required={true}
          onChange={inputName} rows={1} value={name} type={"text"}
        />
        <TextInput
          fullWidth={true} label={"商品説明"} multiline={true} required={true}
          onChange={inputDescription} rows={5} value={description} type={"text"}
        />
        <SelectBox
          label={"カテゴリー"} options={categories} required={true} select={setCategory} value={category}
        />
        <SelectBox
          label={"性別"} options={genders} required={true} select={setGender} value={gender}
        />
        <TextInput
          fullWidth={true} label={"価格"} multiline={false} required={true}
          onChange={inputPrice} rows={1} value={price} type={"number"}
        />
        <div className="module-spacer--small"/>
        <SetSizesArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images, sizes))}
          />
        </div>
      </div>
    </section>
  )
}; 

export default ProductEdit;
