import React from 'react';

export default function LiveButton () {

    const liveButtonStyle = {
        display: 'flex',
        alignItems: 'center', // 세로 정렬 설정
        margin: '20px 0', // 위에서 20px, 아래로 0px의 마진을 추가
        justifyContent: 'flex-start', // 가로 정렬 설정 
        marginLeft: '20px',
      };
    
      const liveCircleStyle = {
        width: '20px',
        height: '20px',
        backgroundColor: 'red',
        borderRadius: '50%',
        marginRight: '10px',
      };
    
      const liveTextStyle = {
        color: 'white',
        fontWeight: 'bold',
      };
    
      return (
        <div style={liveButtonStyle}>
          <div style={liveCircleStyle}></div>
          <span style={liveTextStyle}>LIVE</span>
        </div>
      );
}