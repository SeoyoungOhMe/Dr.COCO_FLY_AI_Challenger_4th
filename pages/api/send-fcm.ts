import { ServiceAccount } from "firebase-admin";
import admin from "firebase-admin"
// import { db } from 'config/firebase' // 위에서 정의한 firebase 설정 파일
import { QuerySnapshot, doc, getDoc, query, where } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { FirebaseApp } from "firebase/app";
import { Messaging } from "firebase/messaging";
import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore } from "firebase/firestore";
import { collection, addDoc , getDocs } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { MulticastMessage } from "firebase-admin/lib/messaging/messaging-api";



interface NotificationData {
    data: {
      title: string;
      body: string;
      image: string;
    }
  }
  
// const sendFCMNotification = async (data: NotificationData) => {
const sendFCMNotification = async ( data : any ) => {

    // console.log(data);
    // data: { title, body, userId}
    const userId = data.data.userId;
    console.log("유저아이디 : " , userId);
  
    const firebaseConfig = {
      apiKey: 'AIzaSyB20EDjG92vkOcIpYHoZOV6Ta4EJFBQuPM',
      authDomain: 'flyai-push-test.firebaseapp.com',
      projectId: 'flyai-push-test',
      storageBucket: 'flyai-push-test.appspot.com',
      messagingSenderId: '540464874627',
      appId: '1:540464874627:web:e6c189885ac1fee103c7b6'
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Firebase Admin SDK 초기화
    const serviceAccount: ServiceAccount = {
      projectId: "540464874627",
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL!,
    };
  
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    // 토큰 불러오기. userId 로 
    // 데이터베이스 필요!!!

    // 'tokens' 컬렉션에서 'userId' 필드가 targetUserId와 일치하는 문서를 찾기 위한 쿼리 생성
    const q = query(collection(db, 'tokens'), where('userId', '==', userId));

    // 쿼리 실행
    const querySnapshot = await getDocs(q);
    let token: string | undefined = undefined;
    querySnapshot.forEach((doc) => {
      // 찾은 문서의 'tokenData' 필드 가져오기
      token = doc.data().tokenData;
    });
  
    // 푸시 데이터
    // api 호출할 때 받아올 데이터와 방금 불러온 토큰
    const notificationData = {
      ...data,
      tokens: [token!]
    }

  
    // 푸시 발송
    // sendMulticast()는 여러개의 토큰으로 푸시를 전송한다.
    // 외에도 단일 토큰에 발송하는 등의 다양한 메소드 존재
    try {

      // const tmp = await admin.appCheck();
      // console.log( tmp )

      const res = await admin.messaging().sendEachForMulticast(notificationData);
      // 이후에 수행할 로직
      // console.log('메시지 전송 성공:', res);
      // console.log( 'api에서 메세지 발송했습니다. ' )
      // console.log( notificationData )
      return res;
    } catch (error) {
      // 에러가 발생한 경우 처리
      console.error('메시지 전송 중 에러 발생:', error);
      return null;
    }
    
  
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("이거 실행되나?");

  if (req.method === "POST") {
    const { message } = req.body;
    await sendFCMNotification(message)
      .then((result) => {
        console.log("200전");
        res.status(200).json({result});
        console.log("200후");
    })
      .catch((error) => console.log(error));
  } else {
    res.status(405).end();
  }
};

export default handler;