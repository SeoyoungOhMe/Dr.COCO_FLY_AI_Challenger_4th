
import React, { useState, useEffect, useRef } from 'react';

const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // 메뉴 박스에 대한 ref 생성

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation(); // 메뉴를 열 때의 이벤트 버블링을 막습니다.
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 메뉴 박스 외부 클릭 시 메뉴 닫기
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // 문서 전체에 클릭 이벤트 리스너를 추가합니다.
    document.addEventListener('mousedown', handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const buttonStyle: React.CSSProperties = {
    background: '##607D8B',
    border: '1px solid #ccc',
    cursor: 'pointer',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    height: '50px',
  };

  const dotStyle: React.CSSProperties = {
    height: '3px',
    width: '25px',
    backgroundColor: '#333',
    margin: '3px 0',
  };

  const menuContentStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: '#fff',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    padding: '12px 16px',
    zIndex: 1,
    top: '0',
    right: '0',
    height: '100vh',
    transition: 'opacity 1s ease, transform 1s ease', // 애니메이션 효과 추가
    opacity: isOpen ? 1 : 0, // 메뉴 상태에 따라 opacity 조정
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)', // 메뉴 상태에 따라 위치 조정
    pointerEvents: isOpen ? 'auto' : 'none', // 메뉴가 닫혔을 때 클릭 이벤트 방지
  };

  return (
    <div ref={menuRef}> {/* 메뉴 박스에 ref 적용 */}
      <button onClick={toggleMenu} style={buttonStyle}>
        <div style={dotStyle}></div>
        <div style={dotStyle}></div>
        <div style={dotStyle}></div>
      </button>
      {isOpen && (
        <div style={menuContentStyle}>

        {/* href에 들어갈 링크는 챗봇 팀에게 받아서 수정해야 함. 일단 임시로 네이버 링크로 해둠. */}
          <a href="https://www.naver.com" rel="noopener noreferrer" style={{color: '#000', textDecoration: 'none'}}>
            수면 레포트
          </a>

        </div>
      )}
    </div>
  );
};

export default MenuButton;
