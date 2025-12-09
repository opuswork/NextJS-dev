import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

//html 정적생성할 경로를 반환
export async function getStaticPaths() {
  const response = await axios.get("/products"); //9개 만큼만 html 생성
  const products = response.data.results;

    const paths = products.map((product) => ({
        params: { id: product.id.toString() }
    }));

    return {
        paths,
        fallback: false, //없는 페이지는 404
    };
}

// 서버사이드 렌더링(SSG) 함수
export async function getStaticProps({ params }) {
    const response = await axios.get(`/products/${params.id}`);
    const product = response.data;

    return { props: { product } /* 컴포넌트에 전달할 props */ };
}

// 서버사이드 렌더링(SSR) 함수
// export async function getServerSideProps({ params }) {
//     const response = await axios.get(`/products/${params.id}`);
//     const product = response.data;

//     return {
//         props: { product }, // 컴포넌트에 전달할 props
//     };
// }

export default function ProductDetail({ product }) {
  return (
    <main>
      <h1>{product.name}</h1>
      <img width={300} height={300} src={product.imgUrl} alt={product.name} />
    </main>
  );
}

