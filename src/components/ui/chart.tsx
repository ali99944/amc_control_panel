/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import type { ChartData } from "../../types/statistics"

interface ChartProps {
  data: ChartData
  type: 'line' | 'bar' | 'doughnut' | 'area'
  height?: number
  className?: string
  showLegend?: boolean
  showGrid?: boolean
}

// Convert our ChartData format to recharts format
const convertDataFormat = (data: ChartData) => {
  if (!data.labels || !data.datasets || data.labels.length === 0 || data.datasets.length === 0) {
    return [];
  }

  return data.labels.map((label, index) => {
    const item: Record<string, any> = { name: label };
    
    data.datasets.forEach((dataset) => {
      if (dataset.data && dataset.data[index] !== undefined) {
        item[dataset.label] = dataset.data[index];
      }
    });
    
    return item;
  });
}

// Format large numbers
const formatValue = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatValue(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Empty state component
const EmptyState = ({ height }: { height: number }) => (
  <div 
    className="flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-lg" 
    style={{ height }}
  >
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
    <p className="mt-2">لا توجد بيانات متاحة</p>
  </div>
);

export default function Chart({
  data,
  type,
  height = 300,
  className = "",
  showLegend = true,
  showGrid = true,
}: ChartProps) {
  // Convert data to recharts format
  const chartData = convertDataFormat(data);
  
  // Check if we have data to display
  const hasData = chartData.length > 0 && data.datasets.length > 0;
  
  // If no data, show empty state
  if (!hasData) {
    return <EmptyState height={height} />;
  }

  // Get colors from datasets or use defaults
  const getColors = () => {
    return data.datasets.map(dataset => 
      dataset.backgroundColor || dataset.borderColor || '#3b82f6'
    );
  };

  // Bar Chart
  if (type === 'bar') {
    return (
      <div className={`bg-white rounded-lg p-4 ${className}`} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />}
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatValue}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && data.datasets.length > 1 && (
              <Legend 
                verticalAlign="top" 
                height={36} 
                wrapperStyle={{ fontSize: '12px' }}
              />
            )}
            {data.datasets.map((dataset, index) => (
              <Bar 
                key={index}
                dataKey={dataset.label}
                fill={dataset.backgroundColor || '#3b82f6'}
                radius={[4, 4, 0, 0]}
                barSize={data.datasets.length > 1 ? 15 : 30}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Line Chart
  if (type === 'line') {
    return (
      <div className={`bg-white rounded-lg p-4 ${className}`} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />}
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatValue}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && data.datasets.length > 1 && (
              <Legend 
                verticalAlign="top" 
                height={36} 
                wrapperStyle={{ fontSize: '12px' }}
              />
            )}
            {data.datasets.map((dataset, index) => (
              <Line 
                key={index}
                type="monotone"
                dataKey={dataset.label}
                stroke={dataset.borderColor || '#3b82f6'}
                strokeWidth={2}
                dot={{ r: 3, fill: dataset.borderColor || '#3b82f6' }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Area Chart
  if (type === 'area') {
    return (
      <div className={`bg-white rounded-lg p-4 ${className}`} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />}
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatValue}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && data.datasets.length > 1 && (
              <Legend 
                verticalAlign="top" 
                height={36} 
                wrapperStyle={{ fontSize: '12px' }}
              />
            )}
            {data.datasets.map((dataset, index) => (
              <Area 
                key={index}
                type="monotone"
                dataKey={dataset.label}
                stroke={dataset.borderColor || '#3b82f6'}
                fill={dataset.backgroundColor || 'rgba(59, 130, 246, 0.2)'}
                strokeWidth={2}
                activeDot={{ r: 5 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Doughnut Chart (using PieChart with innerRadius)
  if (type === 'doughnut') {
    const COLORS = getColors();
    const total = data.datasets[0]?.data.reduce((sum, value) => sum + value, 0) || 0;
    
    return (
      <div className={`bg-white rounded-lg p-4 ${className}`} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.labels.map((label, index) => ({
                name: label,
                value: data.datasets[0]?.data[index] || 0
              }))}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
            >
              {data.labels.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatValue(Number(value))} />
          </PieChart>
        </ResponsiveContainer>
        
        {showLegend && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {data.labels.map((label, index) => {
              const value = data.datasets[0]?.data[index] || 0;
              const percentage = ((value / total) * 100).toFixed(1);
              
              return (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-600 truncate mr-2">
                    {label} ({percentage}%)
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return <div>Chart type not supported</div>;
}
