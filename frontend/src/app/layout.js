import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import Head from 'next/head';
import '../styles/globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Head>
            <title>Pulmo-Track</title>
            <meta name="description" content="AI-powered Personalized Lung Cancer Rehabilitation & Tracking Web App" />
          </Head>
          <header className="flex justify-between items-center p-4 gap-4 h-16 bg-white shadow-md">
            <h1 className="text-2xl font-bold text-primary">Pulmo-Track</h1>
            <div>
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main className="bg-gray-100 min-h-screen">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
