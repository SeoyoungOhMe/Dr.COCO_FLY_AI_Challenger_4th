import Header from "../components/Header";
import styles from "../styles/elements.module.css";
import Image from "next/image";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";


export default function SelectVideos() {

  const thumbnails = [

    '/thumbnails/wakeUp_fixed.png',
    '/thumbnails/flip_fixed.png',
    '/thumbnails/dark_wakeUp.png',
    '/thumbnails/dark_flip.png',

  ];

  function getFileNameFromSrc(src:string): string{
    const file_name_with_extension = src.split('/').pop() as string;
    const file_name = file_name_with_extension.split('.')[0];
    return file_name;
  }


  return (
    <div style={{ display: "flex", flexDirection: "column" , alignItems : "center" }}>
      <Header />
      <text style={{ margin: "20px auto", fontSize: "30px", fontFamily: 'IBMPlexSansKR-Regular' }}>
        실행해보고 싶은 영상을 선택하세요
      </text>

      <div  style={{ width : "400px" }}>

        <Carousel
            showArrows={true}
            centerMode={true}
            centerSlidePercentage={100}
            showThumbs={false}
            showStatus={true}
            autoPlay={true}
            infiniteLoop={true}
            swipeable = {true}
            emulateTouch= {true}
            swipeScrollTolerance={0.01}

        >       
            {thumbnails.map((src, index) => (
              <Link href={`/showVideo?data=${getFileNameFromSrc(src)}`} key={index}>
                <div className={styles.imageContainer} key={index} >
                  <Image src={src} alt={`Image ${index}`} width={400} height={650}   />
                </div>
              </Link>
            ))}
            
        </Carousel>
      </div>

      
    </div>
  );
}
