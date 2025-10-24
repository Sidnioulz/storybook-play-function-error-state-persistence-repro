import React, { useMemo } from 'react';
import './frog.css';

export interface FrogProps {
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  onRibbit?: (type: string, date: Date, duration: number, volume: number) => void;
}

export const Frog = ({ 
  size = 'medium', 
  backgroundColor,
  onRibbit 
}: FrogProps) => {
  const classes = useMemo(() => {
    return `frog frog--${size}`;
  }, [size]);

  const style = useMemo(() => ({
    backgroundColor: backgroundColor,
  }), [backgroundColor]);

  const handleClick = async () => {
    const frogData = await fetch(`/frog?size=${size}`);
    const frog = await frogData.json();
    console.log(new Date(frog.date));
    onRibbit?.(frog.type, new Date(frog.date), frog.duration, frog.volume);
  };

  return (
    <button type="button" className={classes} onClick={handleClick} style={style}>
      Ribbit
    </button>
  );
};

export default Frog;
