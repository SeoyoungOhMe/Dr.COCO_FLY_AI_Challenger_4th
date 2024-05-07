import React from 'react';
//import 'styles//logo.css'; 

export default function Logo() {
    return (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '33%',
          transform: 'translate(-50%, -33%)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <img src="/coco_transparent.png" alt="코코박사 로고" style={{ width: '100px' }} />
          <span style={{ fontFamily: 'DNFBitBitv2', marginTop: '10px' }}>코코박사</span>
        </div>
      );
}