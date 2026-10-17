// Vercel Serverless Function: 관리자 로그인 서버 검증
export default function handler(req, res) {
  // CORS 및 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { password } = req.body || {};
    // 버셀 환경변수 ADMIN_PASSWORD 확인 (없을 경우 기본값 2042)
    const expectedPassword = process.env.ADMIN_PASSWORD || '2042';

    if (!password) {
      return res.status(400).json({ success: false, message: '비밀번호를 입력해 주세요.' });
    }

    if (String(password).trim() === String(expectedPassword).trim()) {
      // 서버 검증 성공 (랜덤 세션 토큰 반환)
      const token = 'big_heroes_' + Date.now() + '_' + Math.random().toString(36).substring(2);
      return res.status(200).json({
        success: true,
        message: '인증 성공',
        token: token
      });
    } else {
      return res.status(401).json({
        success: false,
        message: '비밀번호가 올바르지 않아요.'
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
}
