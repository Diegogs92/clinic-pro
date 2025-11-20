'use client';

import { useState, useRef, useEffect } from 'react';

interface ViewOption {
  value: string;
  label: string;
}

interface GlassViewSelectorProps {
  options: ViewOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function GlassViewSelector({ options, value, onChange }: GlassViewSelectorProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bubbleStyle, setBubbleStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = options.findIndex(opt => opt.value === value);

  useEffect(() => {
    const updateBubble = (index: number) => {
      const button = buttonRefs.current[index];
      const container = containerRef.current;

      if (button && container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();

        setBubbleStyle({
          left: `${buttonRect.left - containerRect.left}px`,
          width: `${buttonRect.width}px`,
          opacity: 1,
        });
      }
    };

    if (hoveredIndex !== null) {
      updateBubble(hoveredIndex);
    } else if (activeIndex !== -1) {
      updateBubble(activeIndex);
    }
  }, [hoveredIndex, activeIndex]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-1 bg-white/70 dark:bg-elegant-900/70 rounded-lg p-1 backdrop-blur-xl border border-elegant-200 dark:border-elegant-700/50 shadow-lg shadow-elegant-200/50 dark:shadow-elegant-900/50 w-fit"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Burbuja deslizante glass rectangular */}
      <div
        className="absolute top-1 bottom-1 rounded-md bg-gradient-to-r from-primary/90 to-primary-light/90 backdrop-blur-md shadow-lg shadow-primary/30 transition-all duration-300 ease-out pointer-events-none"
        style={bubbleStyle}
      />

      {options.map((option, index) => {
        const isActive = index === activeIndex;
        const isHovered = index === hoveredIndex;
        const isHighlighted = (hoveredIndex !== null && isHovered) || (hoveredIndex === null && isActive);

        return (
          <button
            key={option.value}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            onClick={() => onChange(option.value)}
            onMouseEnter={() => setHoveredIndex(index)}
            className={`
              relative z-10 px-4 py-2 rounded-md text-sm font-medium
              transition-colors duration-300 ease-out
              ${isHighlighted
                ? 'text-white'
                : 'text-elegant-600 dark:text-elegant-300'
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
