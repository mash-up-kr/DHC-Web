import type { Metadata } from 'next';
import AccountDeletionClient from './_components/AccountDeletionClient';

export const metadata: Metadata = {
  title: '플리핀 계정 삭제',
  robots: { index: false, follow: false },
};

export default function AccountDeletionPage() {
  return <AccountDeletionClient />;
}
