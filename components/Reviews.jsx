
//global components/Reviews.jsx
// SSR 컴포넌트
// 일반 컴포넌트에서도 fetch 사용 가능
export default async function Reviews({ productId }) {

    await new Promise((resolve) => setTimeout(resolve, 2000)); // 의도적으로 2초 지연 후, html을 만듬.

    const response = await fetch("https://learn.codeit.kr/api/codeitmall/size_reviews" + `?productId=${productId}`,
        { cache: 'no-store' } // 항상 최신 리뷰를 불러오기 위해 캐시 사용 안함
    );
    const data = await response.json();
    const reviews = data.results;

    return (<ul>
        {
            reviews.map(
                review => 
                <li key={review.id}>
                    {review.sex}
                    {review.height}
                    {review.size}
                    {review.fit}
                </li>
            )
        }
        </ul>
        );
}



