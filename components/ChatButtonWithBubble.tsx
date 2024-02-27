import React, { useEffect } from 'react';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { sendPush } from '../utils/sendPush'; // 실제 경로에 맞게 조정 필요


export default function ChatButtonWithBubble(props: any) {

  const blinkScore = props.blinkScore;
  const movementScore = props.movementScore;
  const flipped = props.flipped;
  const isSleeping = props.isSleeping;
  const [message, setMessage] = useState("");
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [sentMovementAlarm , setSentMovementAlarm] = useState(false);
  const [sentFlipAlarm,setSentFlipAlarm] = useState(false);
  const [sentSleepingAlarm, setSentSleepingAlarm] = useState(false);

  const fadeOut = keyframes`
  0%, 50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const FadeOutDiv = styled.div`
  animation: ${fadeOut} 4s forwards;
`;
  
  // 메세지를 결정하는 로직
  useEffect(() => {

    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdate;

    // 메시지가 바뀐 지 3초가 지났는지 확인
    if (timeSinceLastUpdate > 4000) {

      if (movementScore > 0.8) {

        if( !sentMovementAlarm ){

          sendPush( "동동이아버님" , "동동이가 많이 움직이고 있어요!가서 확인해보는 게 어떨까요?" ).then(() => {
            setMessage("동동이가 많이 움직이고 있어요! 가서 확인해보는 게 어떨까요?");
            setLastUpdate(now); // 마지막 업데이트 시간을 현재 시간으로 설정
            console.log("푸시 전송 성공");
          }).catch((error) => {
            console.log(error);
          });

          setSentMovementAlarm(true);
        }

      } else {
        setMessage(""); // 조건에 따라 메시지를 비웁니다.
      }

      if( flipped === "yes" ) {

        if( !sentFlipAlarm ){

          sendPush( "동동이아버님" , "동동이가 몸을 뒤집었어요. 이 상태가 계속되면 위험할 수 있어요." ).then(() => {
            setMessage("동동이가 몸을 뒤집었어요. 이 상태가 계속되면 위험할 수 있어요.");
            setLastUpdate(now); // 마지막 업데이트 시간을 현재 시간으로 설정
            console.log("푸시 전송 성공");
          }).catch((error) => {
            console.log(error);
          });

          setSentFlipAlarm(true);

        }

      } else {
        setMessage(""); // 조건에 따라 메시지를 비웁니다.
      }

      if( isSleeping === "no" ) {
        // setMessage("동동이가 깬 것 같아요. 가서 확인해보는 게 어떨까요?");
        // setLastUpdate(now); // 마지막 업데이트 시간을 현재 시간으로 설정

        if( !sentSleepingAlarm ){

          sendPush( "동동이아버님" , "동동이가 깬 것 같아요. 가서 확인해보는 게 어떨까요?" ).then(() => {
            setMessage("동동이가 깬 것 같아요. 가서 확인해보는 게 어떨까요?");
            setLastUpdate(now); // 마지막 업데이트 시간을 현재 시간으로 설정
            console.log("푸시 전송 성공");
          }).catch((error) => {
            console.log(error);
          });

          setSentSleepingAlarm(true);

        }

      } else {
        setMessage(""); // 조건에 따라 메시지를 비웁니다.
      }

    }

  }, [blinkScore, movementScore, flipped, isSleeping, lastUpdate]);


  // 컨테이너 스타일
  const containerStyle = {
    position: 'relative' as 'relative',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '390px',
    zIndex: 1,
  };

  // 말풍선 컨테이너 스타일 (말풍선과 삼각형을 포함)
  const bubbleContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    marginBottom: '5px', // 버튼과의 간격
  };

  // 말풍선 스타일
  const bubbleStyle = {
    maxWidth: '98%',
    borderRadius: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    zIndex: 2,
    backgroundColor: '#EFECCD',
    color: 'black',
  };

  // 말풍선 삼각형(화살표) 스타일
  const bubbleArrowStyle = {
    width: '0',
    height: '0',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: '10px solid #EFECCD', // 삼각형의 색상
  };

  // 버튼 스타일
  const buttonStyle = {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#EFECCD',
    zIndex: 1,
  };

  // 챗봇 내의 로고 스타일
  const imgStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <>
    
      {(message!="")?
      // <FadeOutDiv>
      <div style={containerStyle} >
          <div style={bubbleContainerStyle}>
            <div style={bubbleStyle}>
              {message}
            </div>
            <div style={bubbleArrowStyle}></div>
          </div>
          
        <button style={buttonStyle}>
          <img src="/coco_transparent.png" alt="Coco" style={imgStyle} />
        </button>
      </div> 
      // </FadeOutDiv>

      : null }
      
    </>
  );
}
