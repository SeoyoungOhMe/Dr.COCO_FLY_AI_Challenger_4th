import Header from "../components/Header";
// import Head from "next/head";
// import Image from "next/image";
import InitWebCam from "../components/InitWebCam";
import styles from "../styles/elements.module.css";
import RunHuman from "../components/RunHuman";
import overlay from '../styles/videoOverlay.module.css';
import Image from "next/image";
import { useState } from "react";


// const imageLoader = ({ src = "" }) =>
//   `https://vladmandic.github.io/human-next/public${src}`;

export default function CameraPage() {

  const [isRotated, setRotated] = useState(false);
  const [isRotated2, setRotated2] = useState(false);

  const handleImageClick = () => {
    setRotated(!isRotated);
  };

  const handleImageClick2 = () => {
    setRotated2(!isRotated2);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <text style={{ margin: "20px auto", fontSize: "30px" }}>
        카메라 페이지 입니다
      </text>
      <div className={overlay.videContainer}>
        <canvas id="canvas" className={styles.output} />
        {/* placeholder element that will be used by human for output */}
        <video id="video" className={styles.webcam} autoPlay muted />
        {/* placeholder element that will be used by webcam */}
        <Image
          className={`${overlay.overlayImage} ${isRotated ? overlay.rotated : ''}`}
          src="/chrong.png" // Image file path in the 'public' directory
          alt="Overlay Image"
          width={0}
          height={0}
          style={{ height: "200px", width: "auto", marginRight: "20px" }}
          quality={100} // Image quality (adjust as needed)
          loader={({ src, width }) => {
            return src + "?w=" + width;
          }}
          onClick={handleImageClick}
        />
        <Image
          className={`${overlay.overlayImage2} ${isRotated2 ? overlay.rotated : ''}`}
          src="/pororo.png" // Image file path in the 'public' directory
          alt="Overlay Image"
          width={0}
          height={0}
          style={{ height: "200px", width: "auto", marginRight: "20px" }}
          quality={100} // Image quality (adjust as needed)
          loader={({ src, width }) => {
            return src + "?w=" + width;
          }}
          onClick={handleImageClick2}
        />
      </div>
      <div id="status" className={styles.status}></div>
      <div id="log" className={styles.log}></div>
      <div id="performance" className={styles.performance}></div>
      <InitWebCam elementId="video" />
      {/* initialized webcam using htmlvideo element with specified id */}
      <RunHuman inputId="video" outputId="canvas" />
      {/* loads and start human using specified input video element and output canvas element */}
    </div>
  );
}
