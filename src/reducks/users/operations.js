import { signInAction, signOutAction } from './actions';
import { push } from 'connected-react-router';
// signInやsignUpの時にfirebaseのauthとFirebaseTimestampを使いたいのでimportしておく
import { auth, db, FirebaseTimestamp } from '../../firebase';

// 認証リッスンをするための関数
// もしユーザーが存在していたら、signInActionを動かしてreduxのstateを更新してログインしている扱いにする
export const listenAuthState = () => {
  return async (dispatch) => {
    // 戻り値をuserと定義して受け取る
    return auth.onAuthStateChanged(user => {
      // userが存在してる 即ち userの認証が完了していれば、ユーザーの情報を取得してReduxのStoreの値を更新する
      if (user) {
        const uid = user.uid;

        db.collection('users').doc(uid).get()
          .then(snapshot => {
            const data = snapshot.data();

            dispatch(signInAction({
              isSignedIn: true,
              role: data.role,
              uid,
              userName: data.username
            }))
          })
      } else {
        // もしユーザーが存在していなかったら 即ち ユーザーが認証されていなかったら、ログインページにリダイレクトさせる
        dispatch(push('/login'))
      }
    })
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    // validation定義する
    if ( email === '' || password === '') {
      alert('必須項目が未入力です');
      return false;
    }

    // emailとpasswordでログインするfirebaseの機能を使う
    return auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;

        // もしユーザーが存在したら(ユーザーのログインに成功したら)FirebaseのDBの中にあるユーザーのuidと一致する情報を取得する
        if (user) {
          const uid = user.uid;

          db.collection('users').doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data();

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid,
                userName: data.username
              }))
            })
        }
      })
  }
}

export const logout = () => {
  return async (dispatch) => {
    // サインアウトする 即ち ReduxのStoreの値を初期化すること
    // firebaseでサインアウトするためのメソッドがあるのでそれを使う
    auth.signOut()
      .then(() => {
        // firebaseのauthenticateでのサインアウト（auth.signOut()）が完了したら、ReduxのStoreの状態をサインアウト（初期化）する処理を実行する
        dispatch(signOutAction());
        dispatch(push('/login'));
      })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === '') {
      alert('必須項目が未入力です');
      return false;
    } else {
      // firebaseの既存のメソッドで、パスワードリセットするメソッドを使う
      auth.sendPasswordResetEmail(email)
        .then(() => {
          alert('入力されたアドレスにパスワードリセット用のメールをお送りしました。');
          dispatch(push('/login'))
        }).catch(() => {
          alert('パスワードリセットに失敗しました。');
        })
    }
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // validation定義する
    if ( username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('必須項目が未入力です');
      // return false とすることで、以降の処理は実行されずに終了する
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

        // もしユーザーが存在したら(ユーザーのアカウント登録に成功したら)uidと「いつユーザーが作成されたか」を把握するためにFirebaseTimestampを使って時間を登録する
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
