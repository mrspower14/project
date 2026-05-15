import styles from '@/app/layout.module.css'
import Link from 'next/link';
import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body>
        <div className={styles.container}>
          <header className={styles.header}>
            <Link href='/' className={styles.home_link}>
            <div className={styles.header_container}>
              <Image src="/movie.png" alt="영화 둘러보기" width={30} height={30}/>&nbsp;영화 골라보기
            </div>
            </Link>
          </header>
          <main>{children}</main>
          <footer>&copy; 2026 영화정보 All right reserved</footer>
        </div>
      </body>
    </html>
  );
}
