import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import './globals.css';

export const metadata = {
  title: 'SkillHub Admin',
  description: 'Admin Panel',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
