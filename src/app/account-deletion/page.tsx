'use client';

import { useState } from 'react';

type Screen = 'initial' | 'loading' | 'success' | 'error';

export default function AccountDeletionPage() {
  const [screen, setScreen] = useState<Screen>('initial');
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleDelete() {
    if (!userId.trim()) {
      alert('사용자 ID를 입력해주세요.');
      return;
    }

    if (!confirm('정말로 계정을 삭제하시겠습니까?\n\n삭제된 데이터는 복구할 수 없습니다.')) return;
    if (!confirm('마지막 확인입니다.\n\n계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.\n정말로 진행하시겠습니까?')) return;

    setScreen('loading');

    try {
      const response = await fetch(
        `/api/account-deletion?userId=${encodeURIComponent(userId.trim())}`,
        { method: 'DELETE', headers: { 'Content-Type': 'application/json' } },
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setScreen('success');
    } catch (error) {
      setErrorMessage(`계정 삭제 중 오류가 발생했습니다: ${(error as Error).message}`);
      setScreen('error');
    }
  }

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }
      `}</style>

      <div style={{
        background: 'white', borderRadius: 20, boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        padding: 40, maxWidth: 500, width: '100%', textAlign: 'center',
      }}>
        <div style={{ fontSize: 64, marginBottom: 24, color: '#ff6b6b' }}>⚠️</div>
        <h1 style={{ color: '#2c3e50', marginBottom: 24, fontSize: 28, fontWeight: 700 }}>
          플리핀 계정 삭제 요청
        </h1>

        {screen === 'initial' && (
          <>
            <div style={{
              background: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: 12,
              padding: 20, marginBottom: 24, color: '#856404',
            }}>
              <h3 style={{ color: '#d63031', marginBottom: 12, fontSize: 18 }}>🚨 중요한 안내사항</h3>
              <p>계정을 삭제하면 다음 데이터가 영구적으로 삭제됩니다:</p>
              <ul style={{ textAlign: 'left', marginTop: 12, paddingLeft: 20 }}>
                <li style={{ marginBottom: 8, lineHeight: 1.4 }}>개인 정보 (생년월일, 성별 등)</li>
                <li style={{ marginBottom: 8, lineHeight: 1.4 }}>미션 기록 및 진행 상황</li>
                <li style={{ marginBottom: 8, lineHeight: 1.4 }}>운세 정보</li>
                <li style={{ marginBottom: 8, lineHeight: 1.4 }}>저축 금액 및 분석 데이터</li>
                <li style={{ marginBottom: 8, lineHeight: 1.4 }}>기타 모든 앱 사용 데이터</li>
              </ul>
              <p><strong>⚠️ 삭제된 데이터는 복구할 수 없습니다.</strong></p>
            </div>

            <div style={{
              background: '#f8f9fa', borderRadius: 8, padding: 16, marginBottom: 24, color: '#495057',
            }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
                사용자 ID를 입력하세요:
              </label>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/deletion_guide.png" style={{ width: '40%', paddingBottom: 10 }} alt="ID 확인 가이드" />
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDelete()}
                placeholder="사용자 ID를 입력하세요"
                style={{
                  width: '100%', padding: 12, border: '1px solid #ddd',
                  borderRadius: 6, fontSize: 16, marginBottom: 12, boxSizing: 'border-box',
                }}
              />
              <small style={{ color: '#666', display: 'block', textAlign: 'left' }}>
                앱에서 확인할 수 있는 사용자 ID를 정확히 입력해주세요.
              </small>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
              <button onClick={handleDelete} style={{
                padding: '14px 28px', border: 'none', borderRadius: 8, fontSize: 16,
                fontWeight: 600, cursor: 'pointer', background: '#e74c3c', color: 'white', minWidth: 120,
              }}>
                계정 삭제
              </button>
              <button onClick={() => window.close()} style={{
                padding: '14px 28px', border: 'none', borderRadius: 8, fontSize: 16,
                fontWeight: 600, cursor: 'pointer', background: '#6c757d', color: 'white', minWidth: 120,
              }}>
                취소
              </button>
            </div>
          </>
        )}

        {screen === 'loading' && (
          <div>
            <div style={{
              display: 'inline-block', width: 20, height: 20,
              border: '3px solid #f3f3f3', borderTop: '3px solid #3498db',
              borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: 8,
            }} />
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <p>계정 삭제 처리 중...</p>
          </div>
        )}

        {screen === 'success' && (
          <>
            <div style={{
              background: '#d4edda', border: '1px solid #c3e6cb', borderRadius: 8,
              padding: 20, marginBottom: 24, color: '#155724',
            }}>
              <h3>✅ 계정 삭제 완료</h3>
              <p>계정이 성공적으로 삭제되었습니다.</p>
              <p>모든 데이터가 영구적으로 삭제되었으며, 복구할 수 없습니다.</p>
            </div>
            <p>플리핀 앱을 이용해 주셔서 감사했습니다.</p>
          </>
        )}

        {screen === 'error' && (
          <>
            <div style={{
              background: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: 8,
              padding: 20, marginBottom: 24, color: '#721c24',
            }}>
              <h3>❌ 삭제 실패</h3>
              <p>{errorMessage}</p>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
              <button onClick={() => setScreen('initial')} style={{
                padding: '14px 28px', border: 'none', borderRadius: 8, fontSize: 16,
                fontWeight: 600, cursor: 'pointer', background: '#e74c3c', color: 'white', minWidth: 120,
              }}>
                다시 시도
              </button>
              <button onClick={() => window.close()} style={{
                padding: '14px 28px', border: 'none', borderRadius: 8, fontSize: 16,
                fontWeight: 600, cursor: 'pointer', background: '#6c757d', color: 'white', minWidth: 120,
              }}>
                닫기
              </button>
            </div>
          </>
        )}

        <div style={{
          marginTop: 32, paddingTop: 24, borderTop: '1px solid #eee', color: '#6c757d', fontSize: 14,
        }}>
          <p>계정 삭제에 대한 문의사항이 있으시면 고객센터로 연락해 주세요.</p>
        </div>
      </div>
    </>
  );
}
