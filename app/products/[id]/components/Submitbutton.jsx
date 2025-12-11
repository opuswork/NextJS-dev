'use client';

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children = "Submit" }) {
    const { pending } = useFormStatus();
  return <button>{pending ? "리뷰 제출 중..." : children}</button>;
}