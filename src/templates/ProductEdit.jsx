import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit';
import { saveProduct } from '../reducks/products/operations';
import ImageArea from '../components/Product/ImageArea';

const ProductEdit = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState(''),
        [description, setDescription] = useState(''),
        [category, setCategory] = useState(''),
        [gender, setGender] = useState(''),
        [images, setImages] = useState([]),
        [price, setPrice] = useState('');

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
        {/* <SetSizesArea sizes={sizes} setSizes={setSizes} /> */}
        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() => dispatch(saveProduct(name, description, category, gender, price))}
          />
        </div>
      </div>
    </section>
  )
}; 

export default ProductEdit;
