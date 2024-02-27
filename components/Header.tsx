import Image from "next/image";
import Link from "next/link"

// const imageLoader = ( src: string, width: number, quality: number) => {
//   return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
// };

// const imageLoader = ({ src, width, quality }) => {
//   return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
// };

const Header = () => {

  const headerStyle = {
    backgroundColor: '#EFECCD', // 박스 색상 설정
    //margin: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: "25px 0", // 상단과 하단에 패딩 추가
    // alignItems: "center", // 필요한 경우 주석 해제
  };

  return (
    
    // <div
    //   style={{
    //     margin: "10px auto",
    //     display: "flex",
    //     flexDirection: "row",
    //     justifyContent: "center",
    //     // alignItems : "center"
    //   }}
    // >
    <div style={headerStyle}>
      <Link href = "/">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Image
            src="/coco1024.png"
            alt=""
            width={0}
            height={0}
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
