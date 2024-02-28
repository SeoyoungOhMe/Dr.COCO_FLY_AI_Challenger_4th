import Header from "../components/Header";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";

import { getMessaging } from "firebase/messaging";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB20EDjG92vkOcIpYHoZOV6Ta4EJFBQuPM",
//   authDomain: "flyai-push-test.firebaseapp.com",
//   projectId: "flyai-push-test",
//   storageBucket: "flyai-push-test.appspot.com",
//   messagingSenderId: "540464874627",
//   appId: "1:540464874627:web:e6c189885ac1fee103c7b6"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
//   const messaging = getMessaging(app);
//   console.log("파이어베이스 초기화 완료")
// }

export default function MainPage() {
  const [HTTPlog, setHTTPlog] = useState("HTTP POST 보내기 전입니다.");
  const [catDog, setCatDog] = useState("Predict 요청 보내기 전입니다.");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const sendImageToServer = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      const blob = new Blob([selectedFile], { type: selectedFile.type });

      // Replace 'YOUR_SERVER_ENDPOINT' with the actual endpoint on your server
      const response = await fetch("YOUR_SERVER_ENDPOINT", {
        method: "POST",
        body: blob,
      });

      // Handle the response from the server as needed
      const data = await response.json();
      console.log("Server response:", data);
      setCatDog("사진 보내는데 성공");
    } catch (error) {
      console.error("Error sending image to server:", error);
      setCatDog("사진 보내는데 실패");
    }
  };

  const onPOSTclick = (event: any) => {
    event.preventDefault();
    const data = { col0: "태규야", col1: "안녕" };
    axios
      .post("http://localhost:8000/apitest/apitestAPI", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        setHTTPlog("성공적");
      })
      .catch((err) => {
        console.log(err);
        setHTTPlog(err.message);
      });
  };

  // Common button style extracted as a constant
  const buttonStyle = {
    fontFamily: 'IBMPlexSansKR-Regular',
    fontSize: "22px", // 글씨 크기를 약간 더 크게
    fontWeight: "bold", // 글씨를 굵게
    color: "#333333", // 글씨 색상을 어두운 색으로 설정하여 대비를 높임
    height: "100px",
    width: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "0px solid #B89778", // 버튼의 테두리를 추가/조정하여 더 입체적으로 보이게 함
    borderRadius: "30px",
    //boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // 그림자를 조정하여 더 입체적으로 보이게 함
    cursor: "pointer",
    transition: "all 0.2s ease-in-out", // 호버 효과 시 변화를 부드럽게
    marginBottom: "50px",
    backgroundColor: '#EFECCD',
    //backgroundImage: "linear-gradient(to right, #EFECCD, #B89778)",
  };

 
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <text style={{ margin: "50px auto", fontSize: "40px", fontFamily: 'IBMPlexSansKR-Regular', fontWeight: "bold"  }}>
        우리 아이 코 자게 도와주는 육아전문가 코코박사
      </text>
      <div
        style={{
          // marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link href="selectVideos">
            <button
              style={buttonStyle}
            >
              우리 아이 영상 보기
            </button>
        </Link>

        <Link href="mediapipe">
            <button
              style={buttonStyle}
            >
              카메라로 코코박사 체험하기
            </button>
        </Link>

        <Link href="https://flyai-drcoco.streamlit.app/">
            <button
              style={buttonStyle}
            >
              코코박사에게 물어보기
            </button>
        </Link>

        {/* <Link href="">
            <button
              style={buttonStyle}
            >
              수면 레포트 보러 가기
            </button>
        </Link> */}

        
    <Link href="/sleepReport">
      <button style={buttonStyle}>수면 레포트 보러 가기</button>
    </Link>
                    


        {/* <Link href="push">
            <button
              style={buttonStyle}
            >
              푸시 알림 설정으로 이동하기
            </button>
        </Link>


        <Link href="seoyoungTestBed">
            <button
              style={buttonStyle}
            >
              서영테스트베드
            </button>
        </Link>

        <Link href="startPage">
            <button
              style={buttonStyle}
            >
              시작 페이지
            </button>
        </Link> */}

      </div>
        
    </div>
  );
}
