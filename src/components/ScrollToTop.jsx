import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50); // delay 50ms agar halaman selesai render dulu

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
