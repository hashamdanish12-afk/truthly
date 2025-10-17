import Head from 'next/head';
import Link from 'next/link';
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#EDEDED] font-sans">
      <Head>
        <title>Truthly — Unfiltered</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="sticky top-0 bg-[#111] border-b border-[#2E2E2E] z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-bold text-[#00FF88]">Truthly</div>
          <nav className="flex gap-4 text-[#EDEDED]">
            <Link href="/">Home</Link>
            <Link href="/trending">Trending</Link>
            <Link href="/genz">Gen Z</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">{children}</main>
      <footer className="text-center p-6 text-[#777] border-t border-[#2E2E2E]">© {new Date().getFullYear()} Truthly</footer>
    </div>
  );
}
