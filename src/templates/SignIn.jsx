import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, PrimaryButton } from '../components/UIkit';
import { signIn } from '../reducks/users/operations';

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

  // 親コンポーネントから子コンポーネントに関数を渡す時は、useCallbackを使ってメモ化するとパフォーマンスが上がる
  // 引数のeventにはonChangeでイベントリスナーが発火した時のeventが入って、event.target.valueでその値が取得できる
  // 呼び出す時は()をつけない e.q) onChange={inputUsername()} ← ()は不要
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  },[setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  },[setPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text-center u-text__headline">ログイン</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={"パスワード（半角英数字で6文字以上）"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"ログイン"}
          onClick={() => dispatch(signIn(email, password))}
        />
      </div>
    </div>
  )
}

export default SignIn
