"use client";
import React, { useEffect, useRef, useState } from "react";
import Scrollbar from "smooth-scrollbar";
import "../app/globals.css";

const CustomScrollbar = ({ children }) => {
  const scrollRef = useRef(null);
  const thumbRef = useRef(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const scrollbar = Scrollbar.init(scrollRef.current, {
      damping: 0.05,
    });

    scrollbar.addListener(({ offset, limit }) => {
      const scrollPercentage = (offset.y / limit.y) * 100;
      const thumbPosition = Math.min(Math.max(scrollPercentage * 0.9, 0), 90);

      if (thumbRef.current) {
        thumbRef.current.style.top = `${thumbPosition}%`;
      }

      const totalSections = Math.floor(limit.y / window.innerHeight) + 1;
      const currentSection = Math.min(
        Math.floor(scrollPercentage / (100 / totalSections)) + 1,
        totalSections
      );
      setPageNumber(currentSection);
    });

    return () => {
      if (scrollbar) {
        scrollbar.destroy();
      }
    };
  }, []);

  return (
    <div
      id="fixed-div"
      className="custom-scrollbar "
      ref={scrollRef}
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <div className="scrollSpace">
        <div className="scroller-track">
          <div ref={thumbRef} className="scroller-thumb"></div>
        </div>
        <div className="page-no">
          <p className="page-no-info">0{pageNumber}</p>
        </div>
        <div className="scroll-info">
          <p className="scroll-page-info">Info</p>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CustomScrollbar;
