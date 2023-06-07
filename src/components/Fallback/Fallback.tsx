import './Fallback.css';
import React, { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

export default function Fallback({ onFallback }: { onFallback: MouseEventHandler }) {
  return (
    <div className="fallback">
      <h1 className="fallback__heading">Something went wrong.</h1>
      <Link to="/" onClick={onFallback} className="fallback__button">Go to the main page</Link>
    </div>
  );
}
