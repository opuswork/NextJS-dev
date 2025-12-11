// 다이나믹 라우트에서 SSG로 라우팅 하고 싶은 경우,
// generateStaticParams 서버 함수 활용
import Image from "next/image";
import { notFound } from "next/navigation";
import Reviews from "@/components/Reviews";
import { Suspense } from "react";
import { createReviewAction } from "../../actions";
import SubmitButton from "./components/Submitbutton";

// generateStaticParams 함수는 빌드 타임에 호출되어 page를 static하게 만들겠다.
export async function generateStaticParams() {
  const response = await fetch(
    "https://learn.codeit.kr/api/codeitmall/products"
  );
  const data = await response.json();

  // 반환 값 [{ id: "1" }, ...]
  return data.results.map((product) => {
    return { id: product.id.toString() };
  });
}


// fetch을 중복해서 쓰지만 next가 최적화해서 하나로 합쳐줌
export async function generateMetadata({ params }) {
  const { id } = await params;
  const response = await fetch(
    `https://learn.codeit.kr/api/codeitmall/products/${id}`,
  );

  const product = await response.json();

  // 생성하고자 하는 metadata 객체 응답
  return {
    title: `${product.name} - Codeit Mall`,
  };
}


// [id]의 id 값은 params에서 받음
export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  // if (Number(id) > 9) {
  //   notFound();
  // }

  // fetch을 중복해서 쓰지만 next가 최적화해서 하나로 합쳐줌
  const response = await fetch(
    `https://learn.codeit.kr/api/codeitmall/products/${id}`,
    { cache: "force-cache" } // SSG
  );

  if (response.status === 404) {
    notFound();
  }

  const data = await response.json();
  console.log(data);

  return (
    <main>
      <h1>{data.name}</h1>
      <Image src={data.imgUrl} alt={data.name} width={300} height={300} loading="eager"></Image>

      <hr/>

      <h2>Size Reviews</h2>
      <Suspense fallback={<p>리뷰 로딩중...</p>}>
        <Reviews productId={id} />
      </Suspense>
      {/* Reviews 컴포넌트는 SSR 컴포넌트: 서버에서 리뷰 데이터를 가져와서 렌더링, 
      product detail page는 SSG-빌드타임에 만들어짐, reviews는 SSR 요청이 있을때마다 만들어짐 
      Suspense: 기다렸다가(스트리밍중..) 가져옴
      만들어진 부분은 먼저 보내고, 만들어지고 있는 부분은 만들어지는데로 보낸다.*/}


      <h2>Size Review</h2>
      <form action={createReviewAction} style={{paddingBottom:"500px"}}>
        <input type="hidden" name="productId" value={id} required></input>
        <select name="sex">
          <option value="">Choose Sex</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input type="number" name="height" placeholder="Height (cm)" required></input>
        <select name="size" placeholder="Size" required>
          <option value="">Choose Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <select name="fit" required>
          <option value="">Choose Fit</option>
          <option value="small">small</option>
          <option value="good">good</option>
          <option value="big">big</option>
        </select>

        <SubmitButton>Submit Review</SubmitButton>
      </form>
    </main>
  );
}