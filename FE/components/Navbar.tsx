'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useOpenSheet } from '@/app/hooks/useOpenSheet';
const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const openSheet = useOpenSheet();
  return (
    <div className="px-8 my-4 flex flex-row-reverse items-center justify-between">
      <Avatar
        onClick={() => {
          router.push('/profile');
        }}
        className="cursor-pointer"
      >
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex items-center text-gray-500 gap-4 cursor-pointer">
        <Link
          className={pathname === '/' ? 'text-black font-bold' : ''}
          href="/"
        >
          Dashboard
        </Link>
        <Link
          className={
            pathname.includes('datasensor') ? 'text-black font-bold' : ''
          }
          href="/datasensor"
        >
          Data sensor
        </Link>
        <Link
          className={
            pathname.includes('actionhistory') ? 'text-black font-bold' : ''
          }
          href="/actionhistory"
        >
          Action history
        </Link>

        <Link
          className={pathname.includes('profile') ? 'text-black font-bold' : ''}
          href="/profile"
        >
          Profile
        </Link>
      </div>
      {/* <MenuIcon onClick={() => openSheet.onOpen()} className="cursor-pointer" /> */}
      {/* <Sheet open={openSheet.isOpen} onOpenChange={openSheet.onClose}>
        <SheetContent side="left">
          <div
            onClick={() => {
              router.push('/');
              openSheet.onClose();
            }}
            className={`border cursor-pointer mt-4 p-2 rounded-md ${
              pathname === '/' ? 'bg-gray-100' : ''
            }`}
          >
            Dashboard
          </div>
          <div
            onClick={() => {
              router.push('/datasensor');
              openSheet.onClose();
            }}
            className={`border cursor-pointer mt-4 p-2 rounded-md ${
              pathname.includes('/datasensor') ? 'bg-gray-100' : ''
            }`}
          >
            Data sensors
          </div>
          <div
            onClick={() => {
              router.push('/actionhistory');
              openSheet.onClose();
            }}
            className={`border cursor-pointer mt-4 p-2 rounded-md ${
              pathname.includes('/actionhistory') ? 'bg-gray-100' : ''
            }`}
          >
            Action history
          </div>
        </SheetContent>
      </Sheet> */}
    </div>
  );
};

export default Navbar;
