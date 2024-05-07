import Header from "../components/Header";
import styles from "../styles/elements.module.css";
import Image from "next/image";
import { useState } from "react";
import Logo from "components/Logo";
import { useRouter } from 'next/router';
import Link from "next/link";
import { getMessaging , getToken } from "firebase/messaging";
import { collection, addDoc } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import axios from "axios";




export default function StartPage() {

    // 입력 값 상태
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  
  // 스타일 정의
  const containerStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    position: 'relative' as 'relative', // 전체 컨테이너에 대한 상대 위치 설정
    height: '100vh', // 전체 화면 높이를 차지하도록 설정
    backgroundColor: 'white',
    
    justifyContent: 'center', // 새로 추가: 세로 중앙 정렬
  };

//   const headerWrapperStyle = {
//     position: 'absolute',
//     top: '33%', // 화면의 세로 기준에서 3분의 1 지점에 위치
//     width: '100%', // 가로 폭을 전체로 설정
//     display: 'flex',
//     justifyContent: 'center', // 가로 중앙 정렬
//   };

  const textStyle = {
    margin: "20px auto",
    fontSize: "30px",
    
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    width: '100%', // 폼 너비를 전체로 설정
    maxWidth: '300px', // 최대 폼 너비를 300px로 설정
    
  };

  const inputStyle = {
    width: '100%', // 입력 필드 너비를 전체로 설정
    padding: '10px',
    margin: '5px 0', // 위 아래 마진 설정
    borderColor : 'lightgrey',
    borderRadius: '50px', // 버튼 모서리 둥글게 설정
    marginBottom: "20px", /* 아래쪽 마진을 20px로 설정 */
    marginTop: "10px",
  };

  const buttonStyle = {
    width: '100%', // 버튼 너비를 전체로 설정
    padding: '10px',
    margin: '5px 0', // 위 아래 마진 설정
    backgroundColor: '#EFECCD', // 버튼 배경색 설정
    border: 'none', // 테두리 없음
    borderRadius: '50px', // 버튼 모서리 둥글게 설정
  };

  const router = useRouter();

  const sendPush = async (userId:string , bubbleMessage:string ) => {

    const title = userId + "님을 위한 알림";
    const body = bubbleMessage;

    const message = { data: {title,body,userId} };
    console.log( window?.location?.origin + "/api/send-fcm" )

    // axios.request({
    //     method: "POST",
    //     url: window?.location?.origin + "/api/send-fcm",
    //     data: { message },
    // });

    try {
        const response = await axios.post(window?.location?.origin + "/api/send-fcm", { message });
        console.log("RESPONSE:", response.data);
    } catch (error) {
        console.error("Error sending push notification:", error);
    }
};

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    if( !subscribed ) return;

    sendPush(id,`코코박사에 오신 것을 환영합니다.`);

    // 아기 이름 , 유저 아이디!!
    // name , id
    localStorage.setItem("childName", name);
    localStorage.setItem("parentId" , id);

    // 폼 제출 로직 처리...
    // 처리 후 index 페이지로 리디렉션
    router.push('/mainPage');
  };


  const headerStyle = {
    backgroundColor: 'white', // 박스 색상 설정
    //margin: "auto",
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "center",
    width: "100%",
    padding: "25px 0", // 상단과 하단에 패딩 추가
    //alignItems: "center", // 필요한 경우 주석 해제

  };

  const firebaseConfig = {
    apiKey: "AIzaSyB20EDjG92vkOcIpYHoZOV6Ta4EJFBQuPM",
    authDomain: "flyai-push-test.firebaseapp.com",
    projectId: "flyai-push-test",
    storageBucket: "flyai-push-test.appspot.com",
    messagingSenderId: "540464874627",
    appId: "1:540464874627:web:e6c189885ac1fee103c7b6"
  };
  
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  const messaging = getMessaging(app);
  console.log("파이어베이스 초기화 완료")
  }

  const [subscribed, setSubscribed] = useState(false);

  const onSubscriptionClick = () => {

    // 1. 푸시 권한 요청 및 승인받기
    Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.log("푸시 거절됨");
        } else {
            console.log("푸시 승인됨");
            console.log(permission);
        }
    });

    // 2. vap id 를 통해 토큰 발급 받기 
    let messaging;
    if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
      messaging = getMessaging(app);
    }
    else{
      messaging = getMessaging(app);
    }

    console.log( messaging );
    console.log( process.env.NEXT_PUBLIC_VAPID_KEY! );

    getToken( messaging, {
        vapidKey : process.env.NEXT_PUBLIC_VAPID_KEY!,
    })
    .then(async (currentToken) => {
        if (!currentToken) {
            // 토큰 생성 불가시 처리할 내용, 주로 브라우저 푸시 허용이 안된 경우에 해당한다.
            console.log( "토큰 못 받았음" );

        } else {
            // 토큰을 받았다면 호다닥 서버에 저장. 어떻게 하는데?
            console.log( "토큰도 받았음" );
            console.log( currentToken );

            // 임시방편으로 FIRE STORE 활용. 이후에는 서버 활용하기  
            try {
                const docRef = await addDoc(collection(db, "tokens"), {
                    userId : id,
                    tokenData : currentToken 
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
            }
            setSubscribed(true);
        }
    })
    .catch((error) => {
        // 예외처리
        console.log( "토큰 못 받았음. 에러 발생" );
        console.log( error );

    });

}


  return (
    
    <div style={containerStyle}>
      {/* <Header /> */}
      <div style={headerStyle}>
      {/* 뒤로 가기 버튼 추가 */}
      <button onClick={() => router.back()} 
      style={{ 
          position: 'absolute', 
          left: '20px', 
          top: '50px', 
          transform: 'translateY(-50%)', // 버튼을 세로 중앙에 위치
          background: 'none', 
          border: 'none',
          cursor: 'pointer' // 마우스 오버시 포인터 변경 
        }}>
        <img src="/back_icon.png" alt="Back" style={{ height: "30px" }} /> {/* 이 경로에 뒤로 가기 아이콘 이미지 경로를 지정하세요 */}
      </button>
      {/* <Link href = "/mainPage"> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",

            textDecoration: "none", // 텍스트의 밑줄 제거
            color: "inherit", // 텍스트 색상을 상속받아 기본 설정을 유지
          }}>
          <Image
            src="/coco1024.png"
            alt=""
            // width={0}
            // height={0}
            width={50} // 이미지의 너비를 지정
            height={50} // 이미지의 높이를 지정
            style={{ height: "50px", width: "auto", marginRight: "20px" }}
            loader={({ src, width }) => {
              return src + "?w=" + width;
            }}
          />
          <text style={{ fontSize: "50px", fontFamily: 'TTHakgyoansimUndongjangL' }}>코코박사</text>
        </div>
      {/* </Link> */}
    </div>

      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          style={inputStyle}
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder="아기 이름"
          style={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label style={{fontFamily: 'IBMPlexSansKR-Regular'}}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => { if(e.target.checked) {setAgreed(e.target.checked);onSubscriptionClick();} }}
            style={{marginBottom: "20px", marginTop: "10px", fontFamily: 'IBMPlexSansKR-Regular'}}
          />
          &nbsp;푸시 알림 설정에 동의합니다. (필수)
        </label>
        <button
            type="submit"
            style={{...buttonStyle, fontFamily: 'IBMPlexSansKR-Regular',}}
            onClick={handleSubmit}
            >
            { subscribed ? "시작하기" : "알림 설정하지 않고 체험하기." }
        </button>
        
      </form>
      
    </div>
  );
}
