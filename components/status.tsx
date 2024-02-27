// 상단 상자 3개 제작
import React from 'react';

export default function BoxRow(  props:any ) {
  // 박스 스타일 정의
  const boxStyle = {
    width: '115px', // 너비 30px
    height: '30px', // 높이도 30px로 동일하게 설정하여 정사각형 형태 유지
    backgroundColor: 'rgb(200,200,200,0.5)', // 배경색 회색
    borderRadius: '5px', // 모서리 둥글게
    display: 'flex', // Flexbox를 사용하여 내부 요소를 가로로 배치
    alignItems: 'center', // 세로 중앙 정렬
    justifyItems: 'stretch', // 가로 중앙 정렬
    padding: '10px 5px 10px 5px', // 내부 여백 추가
    fontSize : '20px',
    fontWeight: 'bold'


  };

  // 버튼 스타일 정의
  const buttonStyle = {
    width: '50px', // 버튼 너비
    height: '35px', // 버튼 높이
    marginLeft: '5px', // 버튼과 텍스트 사이의 간격
    color: 'white', // 버튼 내 텍스트 색상을 흰색으로 설정
    borderRadius: '5px', // 버튼의 모서리를 둥글게
    border: 'none', // 버튼 테두리 제거
    cursor: 'pointer', // 마우스 오버 시 커서를 포인터로 변경
    fontSize : '25px',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',

  };

  // 컨테이너 스타일 정의
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around', // 박스 사이에 균일한 간격 배치
    width: '390px', // 전체 컨테이너 너비 390px로 설정
    margin: 'auto', // 컨테이너를 페이지 중앙에 위치
    position: "relative" as "relative", 
    zIndex: 1,
    marginTop : "10px"
  };

   // 이미지와 텍스트를 포함할 스타일
   const contentStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}> {/* 컨테이너를 가로로 정렬 */}
      <div style={boxStyle}>
        <div style={contentStyle}>
          <img src="/coco_transparent.png" alt="코코박사" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
          <span style={{fontFamily: 'TTHakgyoansimUndongjangL' }}>코코박사</span>
        </div>
      </div>
      <div style={{...boxStyle, justifyContent: 'flex-start'}}> {/* 두 번째 박스 스타일 수정 */}
        <span style={{ marginRight: '0px', fontFamily: 'IBMPlexSansKR-Regular' }}>뒤집음</span>
        <button style={{...buttonStyle, backgroundColor: (props.flipped==="no")? 'mediumseagreen' : 'red' ,}}>{props.flipped}</button>
      </div>
      <div style={{...boxStyle, justifyContent: 'flex-start'}}> {/* 두 번째 박스 스타일 수정 */}
        <span style={{ marginRight: '0px', fontFamily: 'IBMPlexSansKR-Regular' }}>수면&nbsp;</span>
        <button style={{...buttonStyle, backgroundColor: (props.isSleeping==="no") ? "orange" : 'cornflowerblue' }}>{props.isSleeping}</button>
      </div>
    </div>
  );
}