'use client';

// error: 에러 객체
// reset: 에러 복구 함수: 페이지 컴포넌트로 돌아감
export default function ErrorPage({ error, reset }) {
  return (
    <main>
      <h2>에러가 발생했습니다!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>다시 시도</button>
    </main>
  );
}