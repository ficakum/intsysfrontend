import { useEffect, useState } from "react";

type TWindowSize = [number, number];

export const useWindowResize = (): TWindowSize => {
  const initSize: TWindowSize = [
    document.body.clientWidth,
    document.body.clientHeight,
  ];
  const [windowSize, setWindowSize] = useState<TWindowSize>(initSize);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize([document.body.clientWidth, document.body.clientHeight]);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
