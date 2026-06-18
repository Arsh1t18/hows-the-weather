import React from 'react';
import { motion } from 'framer-motion';

const SkeletonBox = ({ className }) => (
  <div className={`shimmer-bg rounded-2xl ${className}`} />
);

const LoadingSkeleton = () => (
  <motion.div
    className="space-y-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* Main card skeleton */}
    <div className="glass-card p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <SkeletonBox className="h-10 w-48" />
          <SkeletonBox className="h-6 w-24" />
          <SkeletonBox className="h-24 w-40" />
          <div className="flex gap-3">
            <SkeletonBox className="h-10 w-28" />
            <SkeletonBox className="h-10 w-28" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <SkeletonBox className="h-40 w-40 rounded-full" />
          <div className="flex gap-3">
            <SkeletonBox className="h-16 w-24" />
            <SkeletonBox className="h-16 w-24" />
          </div>
        </div>
      </div>
    </div>

    {/* Forecast skeleton */}
    <div className="glass-card p-6">
      <SkeletonBox className="h-5 w-36 mb-4" />
      <div className="flex gap-3">
        {[...Array(7)].map((_, i) => (
          <SkeletonBox key={i} className="h-32 w-32 flex-shrink-0" />
        ))}
      </div>
    </div>

    {/* Hourly chart skeleton */}
    <div className="glass-card p-6">
      <SkeletonBox className="h-5 w-40 mb-4" />
      <SkeletonBox className="h-48 w-full" />
    </div>

    {/* Metrics grid skeleton */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <SkeletonBox key={i} className="h-32" />
      ))}
    </div>
  </motion.div>
);

export default LoadingSkeleton;
