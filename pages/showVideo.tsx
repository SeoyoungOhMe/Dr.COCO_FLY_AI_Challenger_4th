import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from "../components/Header";
import BoxRow from 'components/status';
import styles from "../styles/elements.module.css";
import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import { FaceLandmarker, FilesetResolver, DrawingUtils , FaceDetectorResult, PoseLandmarker } from "@mediapipe/tasks-vision";
import ChatButtonWithBubble from 'components/ChatButtonWithBubble';
import { Slider, Switch } from 'antd';



export default function ShowVideo() {

  const router = useRouter();
  const { data: fileName } = router.query as { data: string };
  const videoRef = useRef<HTMLVideoElement>(null); // 비디오 태그를 위한 ref 생성
  const filePath = `videos/${fileName}.mp4`;
  console.log(  filePath );


  // precomputed_scores_for_each_video
  const movement_score_for_video = {
    "flip" : [0.41020383790500703, 0.26525753716688816, 0.39116765828722777, 0.2858376463560873, 0.15662783481235132, 1, 0.5622604145126965, 0.10101081270733915, 0.0839901868710114, 0.093089534160193, 0.1066957890455948, 0.27651095978884, 0.12914313741403427, 0.24583207260112588, 0.2268552417799364, 0.050027441324268444, 0.1369631758180206, 0.3518530687752122, 0.21460203102418324, 0.18353533472201922, 0.5208149786048838, 0.838106890682024, 0.9330205939825466, 0.6566925087177803, 0.22034598780507428, 0.504140508981494, 0.7777363734387663, 0.46594342948936124, 0.39941779079714296, 0.972315221099219, 0.25334783966939584, 0.18566491778182745].map(num => +num.toFixed(3)),
    "wakeUp" : [0.5999290902212965, 0.07833715549736309, 0.8856269855493263, 0.6359351600242531, 0.7714390234037731, 0.8347275986604137, 0.2279252874353108, 0.3235525580332021, 0.4005921794419054, 0.17659596546215614, 0.8096239172491252, 0.808406077479377, 0.709439394565709, 0.7084295914042827, 1, 0.6864104895998072, 0.48288092944316846, 0.3313055676058185, 0.7622090327440647, 0.6068084858710274, 0.27576938614545154, 0.23802103950959203, 1, 1, 1, 0.8571041362255912, 0.7734259524775594, 1, 0.7306078833678313, 0.6938456966804567, 1, 0.7823875469685456, 0.8535347678409675, 1, 0.5782129673914073, 0.8337862740673327, 1, 1, 1, 0.41281699460718696, 1, 0.9770090071384833, 0.8093665871459704, 0.47631321839414753, 0.5768780641716202, 1, 1, 1, 0.4673299465526157, 0.43160837704837596, 1, 1, 0.6690924491128002, 0.5156855514960018, 0.5720403933972218, 0.3072770154436274].map(num => +num.toFixed(3)),
    // flip은 32개 wakeUp은 56개
    "dark_flip" : [0.41020383790500703, 0.26525753716688816, 0.39116765828722777, 0.2858376463560873, 0.15662783481235132, 1, 0.5622604145126965, 0.10101081270733915, 0.0839901868710114, 0.093089534160193, 0.1066957890455948, 0.27651095978884, 0.12914313741403427, 0.24583207260112588, 0.2268552417799364, 0.050027441324268444, 0.1369631758180206, 0.3518530687752122, 0.21460203102418324, 0.18353533472201922, 0.5208149786048838, 0.838106890682024, 0.9330205939825466, 0.6566925087177803, 0.22034598780507428, 0.504140508981494, 0.7777363734387663, 0.46594342948936124, 0.39941779079714296, 0.972315221099219, 0.25334783966939584, 0.18566491778182745].map(num => +num.toFixed(3)),
    "dark_wakeUp" : [0.5999290902212965, 0.07833715549736309, 0.8856269855493263, 0.6359351600242531, 0.7714390234037731, 0.8347275986604137, 0.2279252874353108, 0.3235525580332021, 0.4005921794419054, 0.17659596546215614, 0.8096239172491252, 0.808406077479377, 0.709439394565709, 0.7084295914042827, 1, 0.6864104895998072, 0.48288092944316846, 0.3313055676058185, 0.7622090327440647, 0.6068084858710274, 0.27576938614545154, 0.23802103950959203, 1, 1, 1, 0.8571041362255912, 0.7734259524775594, 1, 0.7306078833678313, 0.6938456966804567, 1, 0.7823875469685456, 0.8535347678409675, 1, 0.5782129673914073, 0.8337862740673327, 1, 1, 1, 0.41281699460718696, 1, 0.9770090071384833, 0.8093665871459704, 0.47631321839414753, 0.5768780641716202, 1, 1, 1, 0.4673299465526157, 0.43160837704837596, 1, 1, 0.6690924491128002, 0.5156855514960018, 0.5720403933972218, 0.3072770154436274].map(num => +num.toFixed(3))
    
  }
  const blink_score_for_video = {
    "flip": [0.008204076758100141, 0.005305150743337763, 0.007823353165744555, 0.005716752927121746, 0.0031325566962470265, 0.0210223559021087, 0.01124520829025393, 0.002020216254146783, 0.0016798037374202279, 0.00186179068320386, 0.002133915780911896, 0.0055302191957768, 0.0025828627482806857, 0.004916641452022518, 0.004537104835598728, 0.0010005488264853688, 0.0027392635163604115, 0.007037061375504245, 0.004292040620483665, 0.0036707066944403842, 0.010416299572097677, 0.01676213781364048, 0.01866041187965093, 0.013133850174355605, 0.004406919756101486, 0.01008281017962988, 0.015554727468775327, 0.009318868589787225, 0.00798835581594286, 0.01944630442198438, 0.005066956793387917, 0.003713298355636549].map(num => +num.toFixed(3)) ,
    "wakeUp":[0.01199858180442593, 0.0015667431099472618, 0.017712539710986526, 0.012718703200485062, 0.015428780468075462, 0.016694551973208273, 0.004558505748706216, 0.006471051160664042, 0.008011843588838108, 0.0035319193092431225, 0.016192478344982504, 0.01616812154958754, 0.01418878789131418, 0.014168591828085655, 0.032196574430402476, 0.013728209791996144, 0.00965761858886337, 0.0066261113521163695, 0.015244180654881295, 0.012136169717420549, 0.005515387722909031, 0.00476042079019184, 0.020587535138991114, 0.06123413147903313, 0.052856626002328155, 0.017142082724511825, 0.015468519049551188, 0.023349413844325078, 0.014612157667356627, 0.013876913933609134, 0.021786000433327006, 0.015647750939370913, 0.01707069535681935, 0.02702988473117799, 0.011564259347828145, 0.016675725481346656, 0.06881853049674436, 0.029050403595610022, 0.022605133259030203, 0.008256339892143739, 0.04210070205711977, 0.019540180142769665, 0.01618733174291941, 0.009526264367882951, 0.011537561283432404, 0.021407653526714063, 0.04258185983079246, 0.042533626046972264, 0.009346598931052314, 0.008632167540967519, 0.02060320262677447, 0.029624250224225636, 0.013381848982256004, 0.010313711029920037, 0.011440807867944436, 0.006145540308872548].map(num => +num.toFixed(3)),
    "dark_flip": [0.008204076758100141, 0.005305150743337763, 0.007823353165744555, 0.005716752927121746, 0.0031325566962470265, 0.0210223559021087, 0.01124520829025393, 0.002020216254146783, 0.0016798037374202279, 0.00186179068320386, 0.002133915780911896, 0.0055302191957768, 0.0025828627482806857, 0.004916641452022518, 0.004537104835598728, 0.0010005488264853688, 0.0027392635163604115, 0.007037061375504245, 0.004292040620483665, 0.0036707066944403842, 0.010416299572097677, 0.01676213781364048, 0.01866041187965093, 0.013133850174355605, 0.004406919756101486, 0.01008281017962988, 0.015554727468775327, 0.009318868589787225, 0.00798835581594286, 0.01944630442198438, 0.005066956793387917, 0.003713298355636549].map(num => +num.toFixed(3)) ,
    "dark_wakeUp":[0.01199858180442593, 0.0015667431099472618, 0.017712539710986526, 0.012718703200485062, 0.015428780468075462, 0.016694551973208273, 0.004558505748706216, 0.006471051160664042, 0.008011843588838108, 0.0035319193092431225, 0.016192478344982504, 0.01616812154958754, 0.01418878789131418, 0.014168591828085655, 0.032196574430402476, 0.013728209791996144, 0.00965761858886337, 0.0066261113521163695, 0.015244180654881295, 0.012136169717420549, 0.005515387722909031, 0.00476042079019184, 0.020587535138991114, 0.06123413147903313, 0.052856626002328155, 0.017142082724511825, 0.015468519049551188, 0.023349413844325078, 0.014612157667356627, 0.013876913933609134, 0.021786000433327006, 0.015647750939370913, 0.01707069535681935, 0.02702988473117799, 0.011564259347828145, 0.016675725481346656, 0.06881853049674436, 0.029050403595610022, 0.022605133259030203, 0.008256339892143739, 0.04210070205711977, 0.019540180142769665, 0.01618733174291941, 0.009526264367882951, 0.011537561283432404, 0.021407653526714063, 0.04258185983079246, 0.042533626046972264, 0.009346598931052314, 0.008632167540967519, 0.02060320262677447, 0.029624250224225636, 0.013381848982256004, 0.010313711029920037, 0.011440807867944436, 0.006145540308872548].map(num => +num.toFixed(3))  ,
  
  }
  const flipped_for_video = {
    "flip": new Array(32).fill( "no" ).fill("yes", 21, 29),
    "wakeUp" : new Array(56).fill( "no"),
    "dark_flip": new Array(32).fill( "no" ).fill("yes", 21, 29),
    "dark_wakeUp" : new Array(56).fill( "no"),
  }
  const isSleeping_for_video = {
    "flip": new Array(32).fill( "no" ),
    "wakeUp" : new Array(56).fill( "yes").fill("no",4,56),
    "dark_flip": new Array(32).fill( "no" ),
    "dark_wakeUp" : new Array(56).fill( "yes").fill("no",4,56),
  }

  const [movementScore,setMovementScore] = useState( 0.0 );
  const [blinkScore,setBlinkScore] = useState( 0.0 );
  const [flipped , setFlipped] = useState("no");
  const [isSleeping , setIsSleeping ] = useState("yes");
  
  // 코코 메세지 보여주기 위한 함수 
  useEffect( ()=>{} , [blinkScore,movementScore,flipped,isSleeping] )

  
  // 비디오가 재생 중일 때 매 초 onTick 함수 실행
  useEffect(() => {

    const timerId = setInterval(() => {
      if (videoRef.current && !videoRef.current.paused && !videoRef.current.ended) {
        onTick();
      }
    }, 1000);
    return () => clearInterval(timerId); // 컴포넌트 언마운트 또는 비디오 재생이 멈출 때 타이머 정리

  }, []);


  // 1초마다 실행할 함수
  let videoSecond : number;
  function onTick() {

    videoSecond = Math.floor( videoRef.current!.currentTime );

    const fileNamee = fileName as keyof typeof movement_score_for_video

    // wakeUp 은 영상 56개 , flip 은 영상 32개 있음. 
    if( videoSecond > movement_score_for_video[fileNamee].length - 1 )
        videoSecond =  movement_score_for_video[fileNamee].length - 1;

    setMovementScore( movement_score_for_video[fileNamee][videoSecond] );

    const fileNameee = fileName as keyof typeof blink_score_for_video
    setBlinkScore( blink_score_for_video[fileNameee][videoSecond] );

    const fileNameeee = fileName as keyof typeof flipped_for_video
    setFlipped( flipped_for_video[fileNameeee][videoSecond] )

    const fileNameeeee = fileName as keyof typeof isSleeping_for_video
    setIsSleeping( isSleeping_for_video[fileNameeeee][videoSecond] )

  }

  ///// 랜드마크 표시를 위한 부분 시작 /////
  const [displayLandmark,setDisplayLandmark] = useState( false );
  const blinkCanvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<FaceDetectorResult>(null);
  const runningMode = "VIDEO";
  let video : HTMLVideoElement;
  let faceLandmarker:FaceLandmarker;
  let canvasElement : HTMLCanvasElement;
  let canvasCtx : CanvasRenderingContext2D;
  const videoWidth = 400;
  let lastVideoTime = -1;
  let results:any = undefined;
  let resultsPose:any = undefined;


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
    console.log("로딩이 완료되었습니다.")
  }

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

  // faceLandMark detect Result 를 얻고 canvas에 그림 그리는 함수
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

    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      results = faceLandmarker.detectForVideo(video, startTimeMs);
      resultsPose = poseLandmarker.detectForVideo(video, startTimeMs);
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
      console.log("포즈 결과에요");
      console.log( resultsPose.landmarks );
      // canvasCtx.save();
      // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      for (const landmark of resultsPose.landmarks) {
        console.log(landmark);
        const reducedLandmark = landmark.slice(11);
        drawingUtils.drawLandmarks( reducedLandmark, {
          radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1)
        });
        drawingUtils.drawConnectors( landmark, PoseLandmarker.POSE_CONNECTIONS);
      }
      // canvasCtx.restore();

    }

    // 웹캠이 켜져있을 때만 진행
    window.requestAnimationFrame(predictWebcam);

    // 웹캠이 켜져있을 때만 진행
    // window.requestAnimationFrame(predictWebcam);
    
  }

  useEffect(() => {

    Promise.all([createFaceLandmarker(), createPoseLandmarker()]).then(() => {
      video = videoRef.current!
      canvasElement = blinkCanvasRef.current!
      canvasCtx = blinkCanvasRef.current!.getContext("2d")!;
      video.addEventListener("timeupdate", predictWebcam );
    });

  }, []);
  ///// 랜드마크 표시를 위한 부분 끝 /////

  const baseStyle = {
    borderRadius: '8px', // 모서리를 둥글게
    backgroundColor: '#e0e0e0', // 배경색을 light gray로
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과 추가
    padding: '20px', // 안쪽 여백 추가
    margin: '20px 0 40px 0',
  };

  return (

    <div style={{ display: "flex", flexDirection: "column" , alignItems : "center" }}>
      <Header />

      {/* <span style={{ margin: "20px auto", fontSize: "30px" }}>
        동영상 상영 페이지입니다.{filePath}
      </span> */}
      <div style={{...baseStyle, position: "relative" , width: "400px"}}>
            <span style={{fontFamily: 'IBMPlexSansKR-Regular' }}> 움직임 점수 : {movementScore} </span>
            {/* <Slider min={0} max={1} value={movementScore} step={0.001} disabled={false} /> */}
            <div style={{width: "100%" , display : "flex" , flexDirection : "row" as "row" , alignItems : "center" , justifyContent: "space-between" }}>
              <Image src="/moveLittle.png" alt="" width={0} height={0} style={{ height: "20px", width: "14px", marginRight: "10px" }} loader={({ src, width }) => { return src + "?w=" + width; }} />
              <div style={{ width : "360px" }}>
              <Slider min={0} max={1} value={movementScore} step={0.001} disabled={false} />
              </div>
              <Image src="/moveMany.png" alt="" width={0} height={0} style={{ height: "20px", width: "20px", marginLeft: "10px" }} loader={({ src, width }) => { return src + "?w=" + width; }} />
            </div>

            <span style={{fontFamily: 'IBMPlexSansKR-Regular' }}> 눈감음 점수 : {blinkScore} </span>
            <div style={{width: "100%" , display : "flex" , flexDirection : "row" as "row" , alignItems : "center",  justifyContent: "space-between" }}>
              <Image src="/eyeOpen.png" alt="" width={0} height={0} style={{ height: "20px", width: "20px", marginRight: "10px" }} loader={({ src, width }) => { return src + "?w=" + width; }} />
              <div style={{ width : "360px" }}>
              <Slider min={0} max={1} value={blinkScore} step={0.001} disabled={false} />
              </div>
              <Image src="/eyeClose.png" alt="" width={0} height={0} style={{ height: "20px", width: "20px", marginLeft: "10px" }} loader={({ src, width }) => { return src + "?w=" + width; }} />
            </div>
            <span style={{fontFamily: 'IBMPlexSansKR-Regular' }}>랜드마크 표시하기 :</span>  <Switch defaultValue={displayLandmark} onChange={ ()=>{ setDisplayLandmark(!displayLandmark) } }/>
      </div>

      <div style={{position: "relative", width: "400px", display: "flex", flexDirection: "column" , alignItems : "center" }} id="videoContainer">
        <video controls width="100%" ref={videoRef}  style={{position: "absolute", top: 0, left: 0, width: "100%"}}>
            <source src={filePath} type="video/mp4" />
            브라우저가 video 태그를 지원하지 않습니다.
        </video>
        <canvas ref={blinkCanvasRef} style={{position: "absolute", top: 0, left: 0, width: "100%", display: displayLandmark ? "block" : "none"  }}> </canvas>
        <BoxRow flipped={flipped} isSleeping={isSleeping}></BoxRow>
        <div  style={{height : "430px"}}></div>
        <ChatButtonWithBubble blinkScore={blinkScore} movementScore={movementScore} flipped={flipped} isSleeping={isSleeping} ></ChatButtonWithBubble>
        <div  style={{height : "300px"}}></div>
      </div>
      

      

    </div>
  );
}