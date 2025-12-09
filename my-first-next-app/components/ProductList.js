import Link from "next/link";
import styles from "./ProductList.module.css";
import Image from "next/image";

export default function ProductList({ products = [] }) {
  return (
    <ul className={styles.productList}>
      {products.map((product) => (
        <li key={product.id}>
          <Link className={styles.product} href={`/products/${product.id}`}>
            <Image
              src={product.imgUrl}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
              alt={product.name}
              loading="eager"
            />
          </Link>

          <div>
            <span className={styles.productName}>{product.name}</span>
            <br />
            {product.price.toLocaleString()}원
          </div>
        </li>
      ))}
    </ul>
  );
}