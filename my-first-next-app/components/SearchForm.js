import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/search?q=${value}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button>검색</button>
    </form>
  );
}