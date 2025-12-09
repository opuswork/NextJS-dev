import styles from '@/components/Header.module.css'

export default function Header() {
  return (
    <header className={styles.intro}>
      <img src="/vercel.svg" width={20} height={20} />
      <span className='title'>여기는 헤더입니다.</span>
    </header>
  );
}