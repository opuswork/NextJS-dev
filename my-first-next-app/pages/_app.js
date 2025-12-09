import Header from "@/components/Header";
import { ThemeProvider } from "@/lib/ThemeContext";
// Global css는 _app.js에서만 호출 가능
import "@/styles/globals.css";
import "@/styles/typo.css";
import Head from "next/head";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <title>Codeit Mall</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={notoSansKR.className}>
        <Header />
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}