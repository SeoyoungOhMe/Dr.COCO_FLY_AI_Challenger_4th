import Header from "../components/Header";
import styles from "../styles/mediapipe.module.css";
// import Image from "next/image";
import { useRef , useEffect , useCallback } from "react";
// import { drawCanvas } from "./utils/drawCanvas";
import { getMessaging , getToken } from "firebase/messaging";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { useState , ChangeEvent } from "react";
export default function Push() {

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

                setSubscribed("이제 푸시 알림을 받을 수 있습니다.");


            }
        })
        .catch((error) => {
            // 예외처리
            console.log( "토큰 못 받았음. 에러 발생" );
            console.log( error );

        });

    }

    // 클라이언트에서 서버의 send API 호출!!        
    // const sendPush = async ({ title, body }: 
    // {
    //     title: string;
    //     body: string;
    // }) => {
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
          

    const [subscribed, setSubscribed] = useState("알림 구독 설정이 되지 않았습니다.");
    const [id, setId] = useState("");
    const [hasId, setHasId] = useState(false);
    const handleIdChange = (event : ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
      };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
        
        <Header />
        
        <text style={{ margin: "20px auto", fontSize: "30px" }}>
            구독 페이지입니다.
        </text>
        
        <div
            style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            }}
        >
            {hasId?
            <h3>
                당신의 아이디는 {id}입니다.
            </h3>:
            <div  style={{margin: "30px 0px",display: "flex",justifyContent: "center",flexDirection: "row",alignItems: "center",}}>
                <input
                    className="userId"
                    type="text"
                    placeholder="아이디를 입력하세요.자유형식"
                    value={id}
                    onChange={handleIdChange}
                    style = {{ width : "200px" , marginRight : "20px" , height : "40px"}}
                />
                <button 
                    onClick={()=>{setHasId(true)}}  
                    style = {{ width : "100px" , height : "47px"  }}
                >
                    아이디 생성
                </button>
            </div>
            }

            <button onClick={onSubscriptionClick} style={{ width : "100px" , height : "100px"  }}>알림 구독 신청</button>

            <h3>{subscribed}</h3>

            <button onClick={()=>{sendPush(id,"dummy")}} style={{ width : "100px" , height : "100px" }}>서버에 push 요청하기</button>

        </div>
        </div>
    );
}
