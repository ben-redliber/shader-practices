import { useEffect, useState } from "react";

export default function useMousePos() {
  const [usePos, setPos] = useState({ x: null, y: null });

  useEffect(() => {
    const updateMousePos = (event: any) => {
      setPos({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", updateMousePos);
    return () => {
      window.removeEventListener("mousemove", updateMousePos);
    };
  }, [setPos]);

  return usePos;
}
