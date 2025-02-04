'use client';
import Link from 'next/link';
import { MdOutlineDescription } from "react-icons/md";
import { PiMonitorPlayFill } from "react-icons/pi";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex gap-6 flex-col sm:flex-row">
        <Link
          href="/script"
          className="flex items-center justify-center gap-2 w-48 px-8 py-3 rounded-lg bg-purple-950 text-white text-lg font-medium hover:bg-purple-800 transition-colors"
        >
          <MdOutlineDescription className="text-2xl" />
          Script
        </Link>
        <Link
          href="/teleprompter"
          className="flex items-center justify-center gap-2 w-48 px-8 py-3 rounded-lg bg-purple-950 text-white text-lg font-medium hover:bg-purple-800 transition-colors"
        >
          <PiMonitorPlayFill className="text-2xl" />
          Teleprompter
        </Link>
      </div>
    </div>
  );
}
