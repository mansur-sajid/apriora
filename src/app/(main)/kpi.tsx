'use client';

import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const fixedHeights = [
  [20, 25, 30],
  [25, 20, 35],
  [30, 15, 25],
  [22, 28, 20],
  [18, 30, 22],
];

export default function KPI({
  title,
  value,
  percentage,
  comparison,
  icon,
  bgClass,
  direction = 'up', // 'up', 'down', or 'neutral'
}) {
  const getDirectionIcon = () => {
    if (direction === 'up') {
      return <ArrowUpRight className="w-4 h-4 mr-1 text-green-600" />;
    } else if (direction === 'down') {
      return <ArrowDownRight className="w-4 h-4 mr-1 text-red-600" />;
    }
    return <Minus className="w-4 h-4 mr-1 text-gray-500" />;
  };

  const getDirectionColor = () => {
    if (direction === 'up') return 'text-green-600';
    if (direction === 'down') return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <div className={`${bgClass} flex-[1] rounded-2xl p-6 w-full max-w-sm shadow-md h-70`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-bold">{title}</p>
          <div className="flex items-center mt-1">
            <h2 className="text-5xl font-semibold"> +{value}</h2>
            <div className="pl-2">
              <div className="flex items-center text-sm font-medium px-2 py-1 bg-white rounded-full ml-2 shadow-sm">
                {getDirectionIcon()}
                <span className={getDirectionColor()}>
                  {Math.abs(Math.round(percentage))}%
                </span>
              </div>
              <p className="text-sm mt-1 pl-2 text-gray-600 font-thin">{comparison}</p>
            </div>
          </div>
        </div>
        <div>{icon}</div>
      </div>

      <div className="flex items-end justify-end mt-6 space-x-3 h-32">
        {fixedHeights.map((group, colIdx) => (
          <div key={colIdx} className="flex flex-col justify-end items-center space-y-1">
            {group.map((height, barIdx) => {
              let style = {
                height: `${height}px`,
                width: '35px',
                borderRadius: '0.375rem',
              };

              if (barIdx === 0) {
                style = {
                  ...style,
                  backgroundImage: `radial-gradient(rgb(84, 82, 110) 30%, transparent 30%), radial-gradient(rgb(84, 82, 110) 30%, transparent 30%)`,
                  backgroundPosition: '0px 0px, 5px 5px',
                  backgroundSize: '10px 10px',
                  backgroundColor: 'transparent',
                };
              } else if (barIdx === 1) {
                style = {
                  ...style,
                  backgroundImage:
                    'linear-gradient(45deg, #54526e 25%, transparent 25%, transparent 50%, #54526e 50%, #54526e 75%, transparent 75%, transparent 100%)',
                  backgroundSize: '10px 10px',
                };
              } else {
                style = {
                  ...style,
                  background: 'linear-gradient(to top,rgb(122, 125, 130), #54526e)',
                };
              }

              return <div key={barIdx} style={style}></div>;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
