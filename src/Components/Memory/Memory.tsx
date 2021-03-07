import React, { useEffect } from 'react';
import './Memory.module.css';

export const Memory: React.FC<any> = ({ MEMORY_INFO }) => {
  useEffect(() => {
    console.log(MEMORY_INFO);
  }, []);

  return (
    <div>
      <h1>Hello Memory</h1>
    </div>
  );
};
