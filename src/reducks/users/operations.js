import { signInAction } from './actions';
import { push } from 'connected-react-router';
// signInやsignUpの時にfirebaseのauthとFirebaseTimestampを使いたいのでimportしておく
import { auth, db, FirebaseTimestamp } from '../../firebase';

export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn

    if (!isSignedIn) {
      const url = 'https://api.github.com/users/yk-port';

      const response = await fetch(url)
                              .then(res => res.json())
                              .catch(() => null);
      const userName = response.login;

      dispatch(signInAction({
        isSignedIn: true,
        uid: '0001',
        userName
      }));

      dispatch(push('/'))
    }
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // validation定義する
    if ( username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('必須項目が未入力です');
      return false;
    }
    if ( password !== confirmPassword) {
      alert('パスワードが一致しません');
      return false;
    }

    // emailとpasswordでユーザーを新規登録するfirebaseの機能を使う
    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;

        // もしユーザーが存在したら(ユーザーの作成に成功したら)uidと「いつユーザーが作成されたか」を把握するためにFirebaseTimestampを使って時間を登録する
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            role: 'customer',
            uid,
            username,
            email,
             created_at: timestamp,
            updated_at: timestamp
          };

          // firebaseのデータストアに登録する
          db.collection('users').doc(uid).set(userInitialData)
            .then(() => {
              dispatch(push('/'))
            });
        }
      })
  }
}
