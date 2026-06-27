import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function ContinueReadingButton() {
  const navigate = useNavigate();

  // هنا بنخزن الـ slug بدل id
  const [lastSlug, setLastSlug] = useState<string | null>(null);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("last-read-saint") || "null"
    );

    if (saved?.slug) {
      setLastSlug(saved.slug);
    }
  }, []);

  // لو مفيش حاجة مقروءة قبل كده
  if (!lastSlug) return null;

  return (
    <div className="bg-transparent p-4 flex justify-center">
      <Button
        variant="accent"
        onClick={() => navigate(`/saint/${lastSlug}`)}
      >
        <span className="text-xl">👀</span>
        <span className="font-medium">كمل القراءة</span>
      </Button>
    </div>
  );
}