import React, { useRef, useState, useEffect, useCallback } from 'react';

interface DesktopScaleContainerProps {
  children: React.ReactNode;
  designWidth?: number;
  className?: string;
  padding?: number;
}

export const DesktopScaleContainer: React.FC<DesktopScaleContainerProps> = ({
  children,
  designWidth = 760,
  className = '',
  padding = 16,
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | undefined>(undefined);

  const updateDimensions = useCallback(() => {
    if (!outerRef.current || !innerRef.current) return;
    const outerWidth = outerRef.current.clientWidth;
    const availableWidth = Math.max(0, outerWidth - padding);

    if (availableWidth < designWidth && availableWidth > 0) {
      const newScale = availableWidth / designWidth;
      setScale(newScale);

      const naturalHeight = innerRef.current.offsetHeight;
      if (naturalHeight > 0) {
        setScaledHeight(Math.ceil(naturalHeight * newScale));
      }
    } else {
      setScale(1);
      setScaledHeight(undefined);
    }
  }, [designWidth, padding]);

  useEffect(() => {
    updateDimensions();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateDimensions();
      });
      if (outerRef.current) resizeObserver.observe(outerRef.current);
      if (innerRef.current) resizeObserver.observe(innerRef.current);
    }

    window.addEventListener('resize', updateDimensions);
    window.addEventListener('orientationchange', updateDimensions);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
    };
  }, [updateDimensions]);

  return (
    <div
      ref={outerRef}
      className={`w-full flex justify-center items-start overflow-x-clip overflow-y-visible ${className}`}
      style={{
        height: scaledHeight !== undefined ? `${scaledHeight}px` : 'auto',
      }}
    >
      <div
        ref={innerRef}
        className="py-1 px-0.5"
        style={{
          width: `${designWidth}px`,
          minWidth: `${designWidth}px`,
          maxWidth: `${designWidth}px`,
          flexShrink: 0,
          transform: scale < 1 ? `scale(${scale})` : 'none',
          transformOrigin: 'top center',
          transition: 'transform 0.12s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};
