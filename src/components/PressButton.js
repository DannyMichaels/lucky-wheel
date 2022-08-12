import React, { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';

export default function PressButton({ setPower, disabled, style }) {
  const [pressed, setPressed] = useState(false);
  const [width, setWidth] = useState(0);
  const [springProps, set] = useSpring(() => ({
    width: '0%',
    backgroundColor: 'hotpink',
  }));
  useEffect(() => {
    if (pressed)
      set({
        from: { width: '0%', backgroundColor: 'hotpink' },
        to: { width: '100%', backgroundColor: 'red' },
        immediate: false,
        config: { duration: 2000 },
      });
    else {
      setPower(parseInt(width));
      set({ to: { width: '0%', backgroundColor: 'hotpink' }, immediate: true });
    }
  }, [pressed]);

  const togglePressed = () => {
    setPressed((prevState) => !prevState);
  };

  return (
    <button
      className="button"
      onMouseDown={togglePressed}
      onMouseUp={togglePressed}
      onTouchStart={togglePressed}
      onTouchEnd={togglePressed}>
      <animated.div
        className="button__fill"
        style={{
          width: springProps.width,
          background: springProps.backgroundColor,
        }}
      />
      <animated.div className="button__content">
        {springProps.width.interpolate((x) => {
          setWidth(parseInt(x));
          return x === '0%' ? 'Start Spinning!' : parseInt(x) + '%';
        })}
      </animated.div>
    </button>
  );
}
