import Header from "../components/Header";
import styles from "../styles/elements.module.css";
import Image from "next/image";
import { useState } from "react";
import BoxRow from "components/status";
import ChatButtonWithBubble from "components/ChatButtonWithBubble";
import LiveButton from "components/LiveButton";
import MenuButton from "components/MenuButton";

export default function SeoyoungTestBed() {

  // 스타일 정의
  const containerStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
  };

  const textStyle = {
    margin: "20px auto",
    fontSize: "30px",
  };

  // LiveButton을 감쌀 새로운 컨테이너 스타일
  const liveButtonContainerStyle = {
    alignSelf: "flex-start", // 이 컨테이너만 왼쪽 정렬
    width: "100%", // 부모 컨테이너의 전체 너비 사용
  };

  const spaceStyle = {
    display: 'flex',
    justifyContent: 'space-between', // 양 끝에 버튼을 배치합니다.
    alignItems: 'center', // 세로로 중앙 정렬합니다.
    width: '390px', // 전체 컨테이너 너비 390px로 설정
    padding: '10px', // 컨테이너 패딩

  };

  return (
    <div style={containerStyle}>
      <Header />
      <div style={textStyle}>
        서영 테스트 베드 페이지 입니다
      </div>
      <BoxRow/>

      <div style={spaceStyle}>
        <div style={liveButtonContainerStyle}>
          <LiveButton />
        </div>
        <MenuButton />
      </div>
      
      <ChatButtonWithBubble/>
      
    </div>
  );
}