import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router"; // useRouter 훅을 import합니다.

// const imageLoader = ( src: string, width: number, quality: number) => {
//   return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
// };

// const imageLoader = ({ src, width, quality }) => {
//   return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
// };

const Header = () => {
  const router = useRouter(); // useRouter를 사용하여 라우터 인스턴스를 가져옵니다.

  const headerStyle = {
    backgroundColor: '#EFECCD', // 박스 색상 설정
    //margin: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: "25px 0", // 상단과 하단에 패딩 추가
    //alignItems: "center", // 필요한 경우 주석 해제

  };

  return (
    
    <div style={headerStyle}>
      {/* 뒤로 가기 버튼 추가 */}
      <button onClick={() => router.back()} 
      style={{ 
          position: 'absolute', 
          left: '20px', 
          top: '50px', 
          transform: 'translateY(-50%)', // 버튼을 세로 중앙에 위치
          background: 'none', 
          border: 'none',
          cursor: 'pointer' // 마우스 오버시 포인터 변경 
        }}>
        <img src="/back_icon.png" alt="Back" style={{ height: "30px" }} /> {/* 이 경로에 뒤로 가기 아이콘 이미지 경로를 지정하세요 */}
      </button>
      <Link href = "/">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",

            textDecoration: "none", // 텍스트의 밑줄 제거
            color: "inherit", // 텍스트 색상을 상속받아 기본 설정을 유지
          }}>
          <Image
            src="/coco1024.png"
            alt=""
            // width={0}
            // height={0}
            width={50} // 이미지의 너비를 지정
            height={50} // 이미지의 높이를 지정
            style={{ height: "50px", width: "auto", marginRight: "20px" }}
            loader={({ src, width }) => {
              return src + "?w=" + width;
            }}
          />
          <text style={{ fontSize: "50px", fontFamily: 'TTHakgyoansimUndongjangL' }}>코코박사</text>
        </div>
      </Link>
    </div>
  );
};

export default Header;