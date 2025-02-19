import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  title: 'Pulmo-Track',
  description: 'AI-powered Personalized Lung Cancer Rehabilitation & Tracking Web App',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="antialiased bg-gray-100 text-gray-900 min-h-screen flex flex-col">
          {/* HEADER */}
          <header className="flex justify-between items-center p-4 gap-4 h-16 bg-white shadow-md">
            <h1 className="text-2xl font-bold text-blue-600">Pulmo-Track</h1>
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

          {/* MAIN CONTENT */}
          <main className="flex-1">{children}</main>

          {/* FOOTER */}
          <footer className="bg-white p-4 shadow-md text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Pulmo-Track. All rights reserved.</p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
