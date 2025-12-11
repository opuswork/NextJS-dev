'use server';

import { revalidatePath, revalidateTag } from "next/cache";

export async function createReviewAction(formData) {
    const productId = formData.get('productId');
    const sex = formData.get('sex');
    const height = formData.get('height');  //String
    const size = formData.get('size');
    const fit = formData.get('fit');

    console.log({ productId, sex, height, size, fit });

    // 리뷰 생성 API 호출

    const response =  await fetch("https://learn.codeit.kr/api/codeitmall/size_reviews", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId,
                sex,
                height,
                size,
                fit
            })
        }
    );

    if (!response.ok) {
        throw new Error("리뷰 생성에 실패했습니다.");
    }
    const data = await response.json();
    console.log("리뷰 생성 완료:", data);

    // revalidatePath("https://learn.codeit.kr/api/codeitmall/size_reviews" + `?productId=${productId}`); // 해당 경로를 재검증하여 최신 리뷰 반영

    revalidateTag(`size-reviews-${productId}`); // 태그 기반 재검증으로 최신 리뷰 반영
}

