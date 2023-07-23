'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import OffcanvasExample from '@/components/navbar/Navbar';
import Start from '@/components/start/Start';
import Footer from '@/components/footer/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html dir='rtl' lang="en">
        <body>
          <Provider store={store}>
            <Start />
            <OffcanvasExample />
            {children}
            <Footer />
          </Provider>
        </body>
      </html>
    </>
  )
}
