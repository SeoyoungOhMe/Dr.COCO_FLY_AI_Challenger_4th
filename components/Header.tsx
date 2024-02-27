import Image from "next/image";
import Link from "next/link"

// const imageLoader = ( src: string, width: number, quality: number) => {
//   return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
// };

// const imageLoader = ({ src, width, quality }) => {
//   return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
// };

const Header = () => {
  return (
    
    <div
      style={{
        margin: "10px auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        // alignItems : "center"
      }}
    >
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
