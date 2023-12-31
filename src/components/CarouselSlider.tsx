import React, { useState, useEffect, useRef } from 'react';
import '../style.css';

const CarouselSlider = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [positions, setPositions] = useState<number[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);

  const itemCount = 5;

  useEffect(() => {
    initializeData();
    window.addEventListener('resize', initializeData);
    return () => {
      window.removeEventListener('resize', initializeData);
    };
  }, []);

  const initializeData = () => {
    if (!wrapperRef.current || !itemsRef.current) return;

    const width = wrapperRef.current.clientWidth;
    const interval = 500;
    const margin = (width - interval) / 2;
    const initX = Math.floor((interval - margin) * -1);
    let pos = [];

    for (let i = 0; i < itemCount; i++) {
      pos.push(initX - interval * i);
    }

    setPositions(pos);
  };

  const moveItems = (idx: number) => {
    setCurrentIdx(idx);
    if (itemsRef.current) {
      itemsRef.current.style.left = `${positions[idx]}px`;
    }
  };

  const handleNext = () => {
    if (currentIdx < itemCount - 1) {
      moveItems(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      moveItems(currentIdx - 1);
    }
  };

  return (
    <section id="slider">
      <button className="button prev" onClick={handlePrev}>
        🔙
      </button>
      <main id="wrapper" ref={wrapperRef}>
        <ul id="items" ref={itemsRef}>
          <li className="item">
            <div className="content pink">1</div>
          </li>
          <li className="item">
            <div className="content yellow">2</div>
          </li>
          <li className="item">
            <div className="content skyblue">3</div>
          </li>
          <li className="item">
            <div className="content orange">4</div>
          </li>
        </ul>
      </main>
      <button className="button next" onClick={handleNext}>
        🔜
      </button>
    </section>
  );
};

export default CarouselSlider;
