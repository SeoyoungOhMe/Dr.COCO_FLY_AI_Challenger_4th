import React from 'react';
import Header from "../components/Header";

const sleepReport = () => {
  // 인라인 스타일 정의
  const style = {
    margin: 0,
    padding: 0,
    width: '100%',
    
  };

  const imgStyle = {
    width: "60%",
    display: "block", // 이미지를 블록 요소로 설정
    marginLeft: "auto", // 왼쪽 마진을 자동으로 설정
    marginRight: "auto", // 오른쪽 마진을 자동으로 설정
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", }}>
      <Header />
        <div style={style} className="background-image">
        <img src="\report.png" alt="수면 레포트 배경 이미지" style={imgStyle} />
        </div>
    </div>
  );
};

export default sleepReport;

