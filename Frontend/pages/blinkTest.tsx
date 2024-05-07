import Header from "../components/Header";
import styles from "../styles/mediapipe.module.css";
import { useRef, useEffect } from "react";
import { FaceLandmarker, FilesetResolver, DrawingUtils, FaceDetectorResult } from "@mediapipe/tasks-vision";

export default function BlinkTest() {

  const videoRef = useRef<HTMLVideoElement>(null);
  const blinkCanvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<FaceDetectorResult>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const runningMode = "VIDEO"
  const blinkSectionRef = useRef<HTMLDivElement>(null);
  const moveSectionRef = useRef<HTMLDivElement>(null);

  let faceLandmarker: FaceLandmarker;
  let canvasElement: HTMLCanvasElement;
  let canvasCtx: CanvasRenderingContext2D;
  const videoWidth = 480;
  let lastVideoTime = -1;
  let results: any = undefined;

  let video : HTMLVideoElement;


  // Updated: Function to handle video file selection
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && videoRef.current) {
      videoRef.current.src = URL.createObjectURL(file);
      videoRef.current.load();
      videoRef.current.play();
    }
  };

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

  // Initialization and drawing functions remain unchanged...
  async function predictVideo() {
    if (!canvasCtx) return;

    console.log(video)
  
    const drawingUtils = new DrawingUtils(canvasCtx);
    const radio = video.videoHeight / video.videoWidth;
    video.style.width = videoWidth + "px";
    video.style.height = videoWidth * radio + "px";
    canvasElement.style.width = videoWidth + "px";
    canvasElement.style.height = videoWidth * radio + "px";
    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;
  
    let startTimeMs = performance.now();
    // Check to ensure video is playing to avoid unnecessary processing
    if (video.paused || video.ended) return;
  
    // Process the current video frame
    results = await faceLandmarker.detectForVideo(video, startTimeMs);
  
    // Draw results if available
    if (results && results.faceLandmarks) {
      // Drawing code remains the same
    }
  
    // Consider using 'timeupdate' event on video element to trigger this function
    // instead of requestAnimationFrame for uploaded video processing
  }

  useEffect(() => {
    createFaceLandmarker().then(() => {
      canvasElement = blinkCanvasRef.current!;
      canvasCtx = blinkCanvasRef.current!.getContext("2d")!;

      // 비디오의 재생 위치가 변경될 때마다 handleVideoFrame 함수를 호출
      videoRef.current?.addEventListener('timeupdate', () => { video = videoRef.current!; predictVideo();});

  
      // 컴포넌트가 언마운트 되거나 useEffect가 다시 실행될 때 이벤트 리스너를 제거
      return () => {
        videoRef.current?.removeEventListener('timeupdate', predictVideo);
      };
    });
  }, []); // 의존성 배열이 비어있으므로 컴포넌트 마운트 시 한 번만 실행됩니다.

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      
      <Header />
      
      <text style={{ margin: "20px auto", fontSize: "30px" }}>
        MediaPipe Experiment
      </text>

      {/* Updated: Added file input for video upload */}
      <input type="file" accept="video/*" onChange={handleVideoUpload} style={{ margin: "20px auto" }}/>

      <div ref={blinkSectionRef} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>

        <div className="cam-container" style={{position: "relative", height: "360px", width: "480px"}}>
          {/* Updated: Removed webcamRef and used videoRef for uploaded video */}
          <video ref={videoRef} style={{position: "absolute", top: 0, left: 0, width: "480px", height: "360px"}} playsInline></video>
          <canvas ref={blinkCanvasRef} style={{position: "absolute", top: 0, left: 0, width: "480px", height: "360px"}}></canvas>
        </div>

        <div className="blend-shapes">
          <ul className="blend-shapes-list" id="video-blend-shapes" ref={ulRef}></ul>
        </div>

      </div>

      {/* Other parts of the component remain unchanged... */}

    </div>
  );
}