import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/products?q=${q}`)
      .then((res) => setProducts(res.data.results))
      .catch(console.error);
  }, [q]);

  return (
      <>
        <Head>
          <title>Codeit Mall</title>
        </Head>  
        <main>
          <h1>검색결과 페이지: {q}</h1>
          <SearchForm />
          <ProductList products={products} />
        </main>
      </>
  );
}