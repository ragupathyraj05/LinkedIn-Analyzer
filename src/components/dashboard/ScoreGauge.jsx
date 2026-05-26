import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getScoreLabel, getScoreColor } from '@/lib/scoreUtils';

export default function ScoreGauge({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Calculate percentage (0-5 scale to 0-100 for SVG dashoffset)
  const percentage = (score / 5) * 100;
  
  // SVG settings
  const size = 200;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Arc is 3/4 of a circle
  const arcLength = circumference * 0.75;
  const dashOffset = arcLength - (arcLength * percentage) / 100;
  
  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5s animation
    const increment = score / (duration / 16); // 60fps
    
    const animate = () => {
      start += increment;
      if (start < score) {
        setAnimatedScore(start);
        requestAnimationFrame(animate);
      } else {
        setAnimatedScore(score);
      }
    };
    
    requestAnimationFrame(animate);
  }, [score]);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Arc */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute transform rotate-135"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-bg)" // fallback, we will use tailwind class wrapper
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={arcLength + ' ' + circumference}
            className="stroke-gray-200"
          />
        </svg>

        {/* Foreground Arc */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute transform rotate-135"
        >
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={arcLength + ' ' + circumference}
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`${getScoreColor(score).replace('text-', 'stroke-')}`}
            style={{
               // map text-danger to red-600, warning to orange-500, success to green-600
               stroke: score < 2 ? 'var(--danger)' : score < 3.5 ? 'var(--warning)' : 'var(--success)'
            }}
          />
        </svg>

        {/* Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="font-display text-5xl font-bold text-text-primary"
          >
            {animatedScore.toFixed(1)}
          </motion.span>
          <span className="text-sm font-medium text-text-secondary mt-1">out of 5.0</span>
        </div>
      </div>
      
      {/* Label Box */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-[-20px] rounded-full px-4 py-1.5 font-semibold text-sm shadow-sm z-10"
        style={{
          backgroundColor: 'var(--surface)',
          color: score < 2 ? 'var(--danger)' : score < 3.5 ? 'var(--warning)' : 'var(--success)',
          border: '1px solid var(--border)'
        }}
      >
        {getScoreLabel(score)}
      </motion.div>
    </div>
  );
}
