import { useEffect, useState } from "react";

const useElementSize = (element) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(element.current.offsetWidth);
    };

    if (element.current) {
      setWidth(element.current.offsetWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [element]);

  return width;
};

export default useElementSize;
