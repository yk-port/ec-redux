import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, PrimaryButton } from '../components/UIkit';
import { resetPassword } from '../reducks/users/operations';

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');　

  // 親コンポーネントから子コンポーネントに関数を渡す時は、useCallbackを使ってメモ化するとパフォーマンスが上がる
  // 引数のeventにはonChangeでイベントリスナーが発火した時のeventが入って、event.target.valueでその値が取得できる
  // 呼び出す時は()をつけない e.q) onChange={inputUsername()} ← ()は不要
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  },[setEmail]);

  return (
    <div className="c-section-container">
      <h2 className="u-text-center u-text__headline">パスワードのリセット</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"パスワードをリセットする"}
          onClick={() => dispatch(resetPassword(email))}
        />
      </div>
    </div>
  )
}

export default Reset;
