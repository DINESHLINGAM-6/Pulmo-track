import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '@/components/ui/button'; // Shadcn button UI component
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <div>
        <Link href="/" className="text-xl font-bold">Pulmo-Track</Link>
      </div>
      <div className="flex gap-4">
        <SignedOut>
          <Button variant="outline">
            <Link href="/signin">Sign In</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
