// 必要なモジュール（アプリで使うモジュール）をimportする
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import { firebaseConfig } from './config';

// Firebase SDK snippetでペーストした内容を使ってfirebaseを初期化する
// これをすることでこのアプリ内でfirebaseを使えるようにした
firebase.initializeApp(firebaseConfig);

// firebaseのauthに関する機能を使う時はfirebase.auth()を使うが、今後頻繁に使うときを考慮して定数にしてexportしておく
export const auth = firebase.auth();

// 同じ感じで、firebaseでよく使う機能は予め定数にしてexportしておく
export const db = firebase.firestore();
export const storage = firebase.storage ();
export const functions = firebase.functions();

// railsでいうcreated_atとかに該当する
export const FirebaseTimestamp = firebase.firestore.Timestamp;
