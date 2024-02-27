import Header from "../components/Header";
import styles from "../styles/elements.module.css";
import Image from "next/image";
import { useState } from "react";
import Logo from "components/Logo";
import { useRouter } from 'next/router';

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

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    
    // 폼 제출 로직 처리...

    // 처리 후 index 페이지로 리디렉션
    router.push('/');
  };



  return (
    <div style={containerStyle}>
        <Header />
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
        <label>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{marginBottom: "20px", marginTop: "10px",}}
          />
          푸시 알림 설정에 동의합니다. (필수)
        </label>
        <button
            type="submit"
            style={buttonStyle}
            onClick={handleSubmit}
            >
            시작하기
        </button>
        
      </form>
      
    </div>
  );
}
