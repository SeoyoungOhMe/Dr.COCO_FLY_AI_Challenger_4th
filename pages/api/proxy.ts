// pages/api/proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 클라이언트로부터 받은 데이터
  const data = req.body;

  try {
    // 외부 API에 데이터를 POST 요청
    const response = await axios.post('http://3.35.120.59:8000/svm_process/svm_process/', data);
    // 외부 API의 응답을 클라이언트에 전달
    res.status(200).json(response.data);
  } catch (error) {
    // 에러 처리
    res.status(500).json({ error: 'Something went wrong' });
  }
}
