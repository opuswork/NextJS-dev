import SearchForm from "@/components/SearchForm";
import ProductList from "@/components/ProductList";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Link from "next/link";
import Head from "next/head";

// 빌드 시에 데이터 미리 불러오기(SSG)
export async function getStaticProps() {
  const res = await axios.get("/products"); // 9개 상품 불러오기
  const products = res.data.results;
  const time = new Date().toISOString();
  
  return {
    props: { products, time },
    // ISR (revalidate 시간을 주면 끝)
    revalidate: 60 * 60 * 24, // 24시간마다 페이지 재생성(ISR 사용)
  };
}


export default function Home( { products, time } ) {
  return (
    <>
      <Head>
        <title>Codeit Mall</title>
      </Head>
      <main>
        <h1>Codeit Mall</h1>
        <p>{time}</p>
        <Link href="/settings">설정</Link>
        <SearchForm />
        <ProductList products={products} />
      </main>
    </>
  );
}