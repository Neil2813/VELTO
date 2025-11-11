import { useBudget } from '../contexts/BudgetContext';
import { useAuth } from '../contexts/AuthContext';

interface ChartsProps {
  chartType: 'pie' | 'bar' | 'line' | 'area';
}

export function PieChart({ data, colors }: { data: Record<string, number>; colors: string[] }) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);
  if (total === 0) return <div className="text-center py-8 opacity-70">No data available</div>;

  const slices: Array<{ label: string; value: number; color: string; percentage: number }> = [];
  let currentAngle = 0;
  const entries = Object.entries(data);

  entries.forEach((entry, index) => {
    const percentage = (entry[1] / total) * 100;
    slices.push({
      label: entry[0],
      value: entry[1],
      color: colors[index % colors.length],
      percentage,
    });
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <svg viewBox="0 0 200 200" className="w-64 h-64 mx-auto">
        {slices.reduce((elements, slice, index) => {
          const startAngle =
            slices.slice(0, index).reduce((sum, s) => sum + (s.percentage / 100) * 360, 0) * (Math.PI / 180);
          const endAngle = startAngle + (slice.percentage / 100) * 360 * (Math.PI / 180);
          const startX = 100 + 80 * Math.cos(startAngle - Math.PI / 2);
          const startY = 100 + 80 * Math.sin(startAngle - Math.PI / 2);
          const endX = 100 + 80 * Math.cos(endAngle - Math.PI / 2);
          const endY = 100 + 80 * Math.sin(endAngle - Math.PI / 2);
          const largeArc = slice.percentage > 50 ? 1 : 0;

          elements.push(
            <path
              key={`slice-${index}`}
              d={`M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArc} 1 ${endX} ${endY} Z`}
              fill={slice.color}
              stroke="rgb(0, 0, 0)"
              strokeWidth="2"
            />
          );

          return elements;
        }, [] as JSX.Element[])}
      </svg>

      <div className="flex-1 space-y-3">
        {slices.map((slice, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: slice.color }} />
                <span className="font-medium">{slice.label}</span>
              </div>
              <span className="text-sm opacity-70">${slice.value.toFixed(2)}</span>
            </div>
            <div className="w-full bg-white bg-opacity-10 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{ width: `${slice.percentage}%`, backgroundColor: slice.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BarChart({ data, colors }: { data: Record<string, number>; colors: string[] }) {
  const maxValue = Math.max(...Object.values(data), 1);
  const entries = Object.entries(data);

  return (
    <div className="space-y-6">
      {entries.map(([label, value], index) => (
        <div key={label}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{label}</span>
            <span className="text-sm opacity-70">${value.toFixed(2)}</span>
          </div>
          <div className="w-full h-8 bg-white bg-opacity-10 rounded-lg overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${(value / maxValue) * 100}%`,
                backgroundColor: colors[index % colors.length],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LineChart({ data, colors }: { data: Record<string, number>; colors: string[] }) {
  const entries = Object.entries(data);
  const maxValue = Math.max(...Object.values(data), 1);
  const width = 600;
  const height = 300;
  const padding = 40;

  const points = entries.map((entry, index) => ({
    x: padding + (index / (entries.length - 1 || 1)) * (width - 2 * padding),
    y: height - padding - (entry[1] / maxValue) * (height - 2 * padding),
    value: entry[1],
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full border border-white border-opacity-10 rounded-lg">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="white" strokeOpacity="0.2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="white" strokeOpacity="0.2" />

        {entries.map((entry, index) => (
          <text
            key={`label-${index}`}
            x={points[index]?.x || 0}
            y={height - 10}
            textAnchor="middle"
            fill="white"
            opacity="0.7"
            fontSize="12"
          >
            {entry[0].substring(0, 3)}
          </text>
        ))}

        <polyline points={pathD} fill="none" stroke={colors[0]} strokeWidth="3" />

        {points.map((p, i) => (
          <circle
            key={`dot-${i}`}
            cx={p.x}
            cy={p.y}
            r="4"
            fill={colors[0]}
            stroke="white"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {entries.map(([label, value], index) => (
          <div key={label} className="bg-white bg-opacity-5 p-3 rounded-lg">
            <p className="text-sm opacity-70">{label}</p>
            <p className="text-lg font-semibold">${value.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AreaChart({ data, colors }: { data: Record<string, number>; colors: string[] }) {
  const entries = Object.entries(data);
  const maxValue = Math.max(...Object.values(data), 1);
  const width = 600;
  const height = 300;
  const padding = 40;

  const points = entries.map((entry, index) => ({
    x: padding + (index / (entries.length - 1 || 1)) * (width - 2 * padding),
    y: height - padding - (entry[1] / maxValue) * (height - 2 * padding),
    value: entry[1],
  }));

  const pathD =
    points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') +
    ` L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colors[0]} stopOpacity="0" />
          </linearGradient>
        </defs>

        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="white" strokeOpacity="0.2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="white" strokeOpacity="0.2" />

        <path d={pathD} fill="url(#areaGradient)" />

        {entries.map((entry, index) => (
          <text
            key={`label-${index}`}
            x={points[index]?.x || 0}
            y={height - 10}
            textAnchor="middle"
            fill="white"
            opacity="0.7"
            fontSize="12"
          >
            {entry[0].substring(0, 3)}
          </text>
        ))}

        <polyline
          points={points.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke={colors[0]}
          strokeWidth="3"
        />

        {points.map((p, i) => (
          <circle
            key={`dot-${i}`}
            cx={p.x}
            cy={p.y}
            r="4"
            fill={colors[0]}
            stroke="white"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {entries.map(([label, value], index) => (
          <div key={label} className="bg-white bg-opacity-5 p-3 rounded-lg">
            <p className="text-sm opacity-70">{label}</p>
            <p className="text-lg font-semibold">${value.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BudgetCharts() {
  const { user } = useAuth();
  const { getMonthlyAnalysis } = useBudget();
  const [chartType, setChartType] = useState<'pie' | 'bar' | 'line' | 'area'>('pie');

  const analysis = getMonthlyAnalysis();
  const colors = [
    'rgb(16, 185, 129)',
    'rgb(59, 130, 246)',
    'rgb(245, 158, 11)',
    'rgb(239, 68, 68)',
    'rgb(139, 92, 246)',
    'rgb(20, 184, 166)',
  ];

  if (!user?.profileCompleted) {
    return <div className="text-center py-12 opacity-70">Complete your profile to view charts</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(['pie', 'bar', 'line', 'area'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            className={`px-4 py-2 rounded-lg border transition-all capitalize ${
              chartType === type
                ? 'border-emerald-400 bg-emerald-400 bg-opacity-20'
                : 'border-white border-opacity-20 hover:border-opacity-40'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="bg-white bg-opacity-5 p-6 rounded-lg border border-white border-opacity-10">
        {chartType === 'pie' && <PieChart data={analysis} colors={colors} />}
        {chartType === 'bar' && <BarChart data={analysis} colors={colors} />}
        {chartType === 'line' && <LineChart data={analysis} colors={colors} />}
        {chartType === 'area' && <AreaChart data={analysis} colors={colors} />}
      </div>
    </div>
  );
}

import { useState } from 'react';
