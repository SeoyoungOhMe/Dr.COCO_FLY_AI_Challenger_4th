import Header from "../components/Header";
import styles from "../styles/mediapipe.module.css";
// import Image from "next/image";
import Webcam from "react-webcam";
import { Camera } from "@mediapipe/camera_utils";
import { useRef , useEffect , useCallback } from "react";
import { FaceLandmarker, FilesetResolver, DrawingUtils , FaceDetectorResult, PoseLandmarker } from "@mediapipe/tasks-vision";
// import { drawCanvas } from "./utils/drawCanvas";


export default function AudioTest() {

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
    </div>
  );
}
