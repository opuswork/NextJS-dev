import { useTheme } from "@/lib/ThemeContext";

export default function Setting() {
  const { theme, setTheme } = useTheme();

  function handleChange(e) {
    setTheme(e.target.value);
  }

  return (
    <main>
      <h1>설정</h1>
      <section>
        <h2>테마 설정</h2>
        <select value={theme} onChange={handleChange}>
          <option value="light">라이트</option>
          <option value="dark">다크</option>
        </select>
      </section>
    </main>
  );
}