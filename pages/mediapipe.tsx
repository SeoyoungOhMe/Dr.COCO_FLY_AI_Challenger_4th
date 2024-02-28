import Header from "../components/Header";
import styles from "../styles/mediapipe.module.css";
// import Image from "next/image";
import Webcam from "react-webcam";
import { Camera } from "@mediapipe/camera_utils";
import { useRef , useEffect , useCallback, useState } from "react";
import { FaceLandmarker, FilesetResolver, DrawingUtils , FaceDetectorResult, PoseLandmarker } from "@mediapipe/tasks-vision";
// import { drawCanvas } from "./utils/drawCanvas";
import axios from 'axios';
import { Slider, Switch } from 'antd';
import Image from "next/image";



export default function MediaPipe() {

  const [blink_score, set_blink_score] = useState(0.0);
  const [movement_score, set_movement_score] = useState(0.0);
  const [flip, set_flip] = useState(0);
  const [silence , set_silence ] = useState(1);
  const [baby_cry, set_baby_cry ] = useState(0);
  const [baby_laughter, set_baby_laughter] = useState(0);
  const [isSleeping , setIsSleeping] = useState(false);

  const webcamRef = useRef<HTMLVideoElement>(null);
  const blinkCanvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<FaceDetectorResult>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const runningMode = "VIDEO";
  const blinkSectionRef = useRef<HTMLDivElement>(null);
  const moveSectionRef = useRef<HTMLDivElement>(null);

  let video : HTMLVideoElement;
  let video2 : HTMLVideoElement;
  let faceLandmarker:FaceLandmarker;
  let canvasElement : HTMLCanvasElement;
  let canvasCtx : CanvasRenderingContext2D;
  const videoWidth = 1000;
  let lastVideoTime = -1;
  let results:any = undefined;
  let resultsPose:any = undefined;
  let pose_landmarks_for_1sec:any = [];

  // functions for faceLandMark ( blinkScore )

  // faceLandMark initialization 함수 -> 소스가 동영상 파일이더라도 그대로
  async function createFaceLandmarker() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: "GPU"
      },
      outputFaceBlendshapes: true,
      runningMode,
      numFaces: 2
    });
    console.log("페이스 랜드마크 로딩이 완료되었습니다.")
  }
  
  // faceLandMark ,poseLandmark detect Result 를 얻고 canvas에 그림 그리는 함수
  async function predictWebcam() {

    //canvasCtx가 정의된 이후에 실행되어야 에러가 나지 않음.
    if( canvasCtx == null )
      return;

    if( faceLandmarker == null )
      return;

    if( poseLandmarker == null )
      return;

    const drawingUtils = new DrawingUtils(canvasCtx);
    const radio = video.videoHeight / video.videoWidth;
    video.style.width = videoWidth + "px";
    video.style.height = videoWidth * radio + "px";
    canvasElement.style.width = videoWidth + "px";
    canvasElement.style.height = videoWidth * radio + "px";
    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;

    // input 이 프레임별 사진이 들어가는 것이 아니라 그냥 실시간 영상이 들어간다.
    let startTimeMs = performance.now();

    if (video.videoWidth > 0 && video.videoHeight > 0) {
      if (lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime;
        results = faceLandmarker.detectForVideo(video, startTimeMs);
        resultsPose = poseLandmarker.detectForVideo(video, startTimeMs);
      }
    }

    if (results!.faceLandmarks) {
      for (const landmarks of results!.faceLandmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_TESSELATION,
          { color: "#C0C0C070", lineWidth: 1 }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
          { color: "#FF3030" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
          { color: "#FF3030" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
          { color: "#30FF30" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
          { color: "#30FF30" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
          { color: "#E0E0E0" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LIPS,
          { color: "#E0E0E0" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
          { color: "#FF3030" }
        );
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
          { color: "#30FF30" }
        );
      }
    }

    if (resultsPose!.landmarks) {

      // canvasCtx.save();
      // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      for (const landmark of resultsPose.landmarks) {
        // console.log(landmark);
        pose_landmarks_for_1sec.push( landmark );
        const reducedLandmark = landmark.slice(11);
        drawingUtils.drawLandmarks( reducedLandmark, {
          radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1)
        });
        drawingUtils.drawConnectors( landmark, PoseLandmarker.POSE_CONNECTIONS);
      }
      // canvasCtx.restore();

    }

    const videoBlendShapes = ulRef.current!
    drawBlendShapes(videoBlendShapes, results!.faceBlendshapes);

    // 웹캠이 켜져있을 때만 진행
    window.requestAnimationFrame(predictWebcam);
    
  }

  // faceLandmark 점수를 html ul 로 바꾸어 렌더링하는 함수 -> 점수를 표시할때만 필요함
  function drawBlendShapes(el: HTMLElement, blendShapes: any[]) {

    if (!blendShapes.length) {
      return;
    }
  
    // console.log(blendShapes[0]);

    const blinkScores = blendShapes[0].categories.slice(9,11);
    set_blink_score( parseFloat( ((blinkScores[0].score + blinkScores[1].score)/2).toFixed(3) )  );
    
    let htmlMaker = "";
    blinkScores.map((shape:any) => {
      htmlMaker += `
        <li class="blend-shapes-item">
          <span class="blend-shapes-label">${
            shape.displayName || shape.categoryName
          }</span>
          <span class="blend-shapes-value" style="width: calc(${
            +shape.score * 100
          }% - 120px)">${(+shape.score).toFixed(4)}</span>
        </li>
      `;
    });

    if( el! ){
      el.innerHTML = htmlMaker;
    }
  }

  // functions for faceLandMark ( blinkScore )

  // functions for pose LandMark ( movementScore )
  let poseLandmarker:PoseLandmarker;
  async function createPoseLandmarker() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task`,
        delegate: "GPU"
      },
      runningMode: runningMode,
      numPoses: 2
    });
    console.log("포즈 랜드마크 로딩이 완료되었습니다.")
  };

  function clear_pose_data_for_1sec(){
    pose_landmarks_for_1sec = [];
  }

  function calculateMovementScoreForOneSecond(data_for_1sec: any): number {
    let allFinalValues: number[] = [];
    let prevLandmarksList: any = [];
  
    data_for_1sec.forEach((currFrame:any, frameIndex:number) => {

      let recognizedLandmarksCount = 0;
      let totalDistance = 0;
      let finalMovement = 0;
      let min_x = Infinity, min_y = Infinity, max_x = 0, max_y = 0;
      let centerPointsSumX = 0;
      let centerPointsSumY = 0;
      let centerPointsCount = 0;
  
      currFrame.forEach((landmark:any, idx:number) => {
        // 중심점 계산 로직 유지
        if ([11, 12, 23, 24].includes(idx)) {
          centerPointsSumX += landmark.x;
          centerPointsSumY += landmark.y;
          centerPointsCount += 1;
        }
  
        let centerPointXPixel = 0, centerPointYPixel = 0;
        if (centerPointsCount > 0) {
          let centerPointX = centerPointsSumX / centerPointsCount;
          let centerPointY = centerPointsSumY / centerPointsCount;
          // 이미지 좌표 변환 대신 직접 계산된 값을 사용
          centerPointXPixel = centerPointX;
          centerPointYPixel = centerPointY;
        }
  
        if ([0, 15, 16, 17, 18, 19, 20, 27, 28].includes(idx)) {
          recognizedLandmarksCount += 1;
          
          let landmarkX = landmark.x - centerPointXPixel;
          let landmarkY = landmark.y - centerPointYPixel;
          
          min_x = Math.min(min_x, landmarkX);
          min_y = Math.min(min_y, landmarkY);
          max_x = Math.max(max_x, landmarkX);
          max_y = Math.max(max_y, landmarkY);
        }
      });
  
      if (prevLandmarksList.length > 0 && currFrame.length > 0) {
        currFrame.forEach((curr:any, idx:number) => {
          if (idx < prevLandmarksList.length) {
            const prev = prevLandmarksList[idx];
            totalDistance += Math.sqrt(Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2));
          }
        });
  
        const rectDiagonal = Math.sqrt(Math.pow(max_x - min_x, 2) + Math.pow(max_y - min_y, 2));
        if (rectDiagonal > 0) {
          finalMovement = totalDistance / (rectDiagonal * recognizedLandmarksCount);
          allFinalValues.push(finalMovement);
        }
      }
  
      prevLandmarksList = currFrame;
    });
  
    if (allFinalValues.length > 0) {
      const avgFinalValue = allFinalValues.reduce((a, b) => a + b, 0) / allFinalValues.length;
      return avgFinalValue;
    } else {
      console.log("No final movement data available for this second.");
      return NaN;
    }
  }

  let movementScore_for_1sec=0;

  function callMovementCalculation(){
    if(  pose_landmarks_for_1sec.length > 10  )
    {
      // console.log("1초간의 포즈 데이터입니다");
      // console.log( pose_landmarks_for_1sec );
      movementScore_for_1sec = calculateMovementScoreForOneSecond( pose_landmarks_for_1sec );
      set_movement_score( parseFloat( movementScore_for_1sec.toFixed(3) ) );
      // console.log( "움직임점수 : " , movementScore_for_1sec );
      clear_pose_data_for_1sec();
    }
  }

  // functions for pose LandMark ( movementScore )
  useEffect(() => {
    Promise.all([createFaceLandmarker(), createPoseLandmarker()]).then(() => {
      video = webcamRef.current!
      // video2 = webcamRef2.current!
      canvasElement = blinkCanvasRef.current!
      canvasCtx = blinkCanvasRef.current!.getContext("2d")!;

      // 웹캡을 실행하여 실행
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        // video2.srcObject = stream;
        video.addEventListener("loadeddata", ()=>{
          predictWebcam();
          // 1초마다 periodicFunction 함수를 실행
          const intervalId = setInterval(() => {
            callMovementCalculation();
            callFlipCalculation();

          }, 1000);
          // 컴포넌트가 언마운트될 때 interval을 정리
          return () => clearInterval(intervalId);
        });
      });

    });

  }, []);


  const postData = async () => {
    const data = {
      blink_score: blink_score,
      move_score: movement_score,
      flip: 0.0,
      silence: 1,
      baby_cry: 0,
      baby_laughter: 0
    };

    try {
      const response = await axios.post('/api/proxy', data);
      console.log(data);
      console.log('Response:', response.data[0]);
      setIsSleeping(response.data[0] === 0 ? false : true);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  // 수면여부 판단 api call
  const updateEvent = () => {
    const now = Date.now();
    const diff = now - lastUpdateTime;
    if (diff >= 1000) {
      postData();
      setLastUpdateTime(now);
    }
  };

  useEffect( ()=>{ updateEvent(); } , [blink_score , movement_score] );

  // 뒤집기 코드 시작
  const [isFlipped, setIsFlipped] = useState(false);
  type Landmark = {
    x: number;
    y: number;
    z: number;
    visibility: number;
  };
  function findPerpendicularFoot(A: Landmark, B: Landmark, C: Landmark): Landmark {
    const BC = {x: C.x - B.x, y: C.y - B.y};
    const BC_length_squared = BC.x * BC.x + BC.y * BC.y;
    const BA_dot_BC = (A.x - B.x) * BC.x + (A.y - B.y) * BC.y;
    const t = BA_dot_BC / BC_length_squared;
    return {x: B.x + t * BC.x, y: B.y + t * BC.y, z: 0, visibility: 1};
  }
  function shoulderDetection(foot: Landmark, nose: Landmark, leftShoulder: Landmark, rightShoulder: Landmark): boolean {
    // foot만큼 평행이동하여 foot을 원점으로 설정
    const translatedNose = { x: nose.x - foot.x, y: nose.y - foot.y, z: nose.z, visibility: nose.visibility };
    const translatedLeftShoulder = { x: leftShoulder.x - foot.x, y: leftShoulder.y - foot.y, z: leftShoulder.z, visibility: leftShoulder.visibility };
    const translatedRightShoulder = { x: rightShoulder.x - foot.x, y: rightShoulder.y - foot.y, z: rightShoulder.z, visibility: rightShoulder.visibility };

    console.log("left : ", translatedLeftShoulder.x);
    console.log("right : ", translatedRightShoulder.x);
    
    return translatedLeftShoulder.x < translatedRightShoulder.x;
  }
  function flipDetectionCam(data_for_1sec: any ): boolean {
    let flipCount = 0; // 플립된 프레임의 수를 세기 위한 변수

    for (let idx = 0; idx < data_for_1sec.length; idx++) {

      const landmark = data_for_1sec[idx];

      if (landmark.length >= 33) { // 각 프레임에 최소 33개의 랜드마크가 있어야 함
        const nose = landmark[0]; // 코 랜드마크
        const leftShoulder = landmark[11]; // 왼쪽 어깨 랜드마크
        const rightShoulder = landmark[12]; // 오른쪽 어깨 랜드마크
  
        // 수선의 발 좌표 구하기
        const foot = findPerpendicularFoot(nose, leftShoulder, rightShoulder);
  
        // 플립 감지
        const flip = shoulderDetection(foot, nose, leftShoulder, rightShoulder);
  
        if (flip) {
          flipCount += 1; // 플립된 프레임이면 카운트 증가
        }
      } else {
        console.log(`Frame ${idx}: Cannot Detect`);
        return false; // 감지할 수 없는 경우, 즉시 false 반환
      }
    }
    console.log( "1초 동안의 데이터에 대해 플립 수 : " , flipCount , " / " , data_for_1sec.length );
  
    // 플립된 프레임이 전체의 절반을 초과하는지 확인
    return flipCount > data_for_1sec.length / 2;
  }
  let isFlipped_for_1sec = false;
  function callFlipCalculation(){
    console.log( pose_landmarks_for_1sec );
    // isFlipped_for_1sec = flipDetectionCam( pose_landmarks_for_1sec );
    // setIsFlipped( isFlipped_for_1sec );
    if( pose_landmarks_for_1sec.length > 0 ){
      let flippedNow = flipDetectionCam(pose_landmarks_for_1sec);
      // 이미 뒤집힌 상태이거나 현재 프레임에서 뒤집힌 상태가 감지된 경우
      if (flippedNow) {
        setIsFlipped(true);
      }
      else {
        setIsFlipped(false);
      }
    }
  }

  const baseStyle = {
    borderRadius: '20px', // 모서리를 둥글게
    backgroundColor: '#e0e0e0', // 배경색을 light gray로
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과 추가
    padding: '20px', // 안쪽 여백 추가
    margin: '20px 0 40px 0',
  };

  // 뒤집기 코드 끝

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      
      <Header />
      
      <div ref={blinkSectionRef} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* <div className="cam-container" style={{position: "relative", height: "360px", width: "480px"}}>
          <video ref={webcamRef} style={{position: "absolute", top: 0, left: 0, width: "480px", height: "360px"}} autoPlay playsInline></video>
          <canvas ref={blinkCanvasRef} style={{position: "absolute", top: 0, left: 0, width: "480px", height: "360px"}}></canvas>
        </div> */}

        <div className="cam-container" style={{position: "relative", height: "780px", width: "900px"}}>
          <video ref={webcamRef} style={{position: "absolute", top: 0, left: 0, width: "640px", height: "600px"}} autoPlay playsInline></video>
          <canvas ref={blinkCanvasRef} style={{position: "absolute", top: 0, left: 0, width: "640px", height: "480px"}}></canvas>
        </div>



        <div className="blend-shapes" style={{ ...baseStyle, display: "flex", flexDirection: "column", width: "400px"  }}>
          <ul className="blend-shapes-list" id="video-blend-shapes" ref={ulRef} style={{display:"none"}}></ul>
          
          {/* <span>움직임 점수 : {movement_score} </span> */}
          <span style={{fontFamily: 'IBMPlexSansKR-Regular' }}> 움직임 점수 </span>
          <div style={{width: "100%" , display : "flex" , flexDirection : "row" as "row" , alignItems : "center" , justifyContent: "space-between" }}>
              <Image src="/moveLittle.png" alt="" width={0} height={0} style={{ height: "20px", width: "14px", marginRight: "10px" }} loader={({ src, width }) => { return src + "?w=" + width; }} />
              <div style={{ width : "360px" }}>
              <Slider min={0} max={1} value={movement_score} step={0.001} disabled={false} />
              </div>
              <Image src="/moveMany.png" alt="" width={0} height={0} style={{ height: "20px", width: "20px", marginLeft: "10px" }} loader={({ src, width }) => { return src + "?w=" + width; }} />
          </div>

          {/* <span>눈감음 점수 : {blink_score} </span> */}
          <span style={{fontFamily: 'IBMPlexSansKR-Regular' }}>눈감음 점수</span>
          <div style={{width: "100%" , display : "flex" , flexDirection : "row" as "row" , alignItems : "center" , justifyContent: "space-between" }}>
            <Image src="/eyeOpen.png" alt="" width={0} height={0} style={{ height: "20px", width: "20px", marginRight: "10px" }} loader={({ src, width }) => { return src + "?w=" + width; }} />
            <div style={{ width : "360px" }}>
              <Slider min={0} max={1} value={   blink_score  } step={0.001} disabled={false} />
            </div>
            <Image src="/eyeClose.png" alt="" width={0} height={0} style={{ height: "20px", width: "20px", marginLeft: "10px" }} loader={({ src, width }) => { return src + "?w=" + width; }} />
          </div>

          
          
          <span>{isSleeping ? "당신은 자고 있어요." : "당신은 깨어 있네요." }</span>
          <br></br>
          <span>{isFlipped ? "당신은 뒤집었어요." : "당신은 뒤집지 않았어요." }</span>
           
        </div>
        
      </div>

    </div>
  );
}
