import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip as ChartJSTooltip, Legend as ChartJSLegend } from 'chart.js';
import { Line as ChartJSLine, Bar as ChartJSBar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, ChartJSTooltip, ChartJSLegend);

// Kinetic Color Palette from tailwind config
const KINETIC_COLORS = {
  primary: '#3bbffa',
  secondary: '#69f6b8',
  error: '#ff716c',
  tertiary: '#ffb148',
  surfaceContainer: '#1a2c3e',
  onSurface: '#e6e6e6',
  onSurfaceVariant: '#9db7cb'
};

const PerformanceCharts = ({ trend = [] }) => {
  if (!trend || trend.length === 0) {
    return (
      <div className="bg-surface-container-low rounded-xl ghost-border p-8 text-center">
        <span className="material-symbols-outlined text-5xl text-on-surface-variant opacity-50">trending_up</span>
        <p className="text-on-surface-variant mt-4 font-semibold">No trend data available yet</p>
        <p className="text-sm text-on-surface-variant mt-1">Add more API tests to see performance trends over time</p>
      </div>
    );
  }

  // Prepare data for Line chart (Response time trend)
  const lineChartData = {
    labels: trend.map(t => t.date || new Date(t.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Average Response Time (ms)',
        data: trend.map(t => t.avgResponseTime),
        borderColor: KINETIC_COLORS.primary,
        backgroundColor: KINETIC_COLORS.primary + '20',
        pointBackgroundColor: KINETIC_COLORS.primary,
        pointBorderColor: KINETIC_COLORS.primary,
        pointHoverBackgroundColor: KINETIC_COLORS.primary,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
        yAxisID: 'y',
        borderWidth: 2
      },
      {
        label: 'Slow Count',
        data: trend.map(t => t.slowCount),
        borderColor: KINETIC_COLORS.error,
        backgroundColor: KINETIC_COLORS.error + '20',
        pointBackgroundColor: KINETIC_COLORS.error,
        pointBorderColor: KINETIC_COLORS.error,
        pointHoverBackgroundColor: KINETIC_COLORS.error,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: false,
        yAxisID: 'y1',
        borderWidth: 2
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: KINETIC_COLORS.onSurface,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 12,
            weight: 'bold'
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: KINETIC_COLORS.surfaceContainer,
        titleColor: KINETIC_COLORS.onSurface,
        bodyColor: KINETIC_COLORS.onSurface,
        borderColor: KINETIC_COLORS.primary,
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y.toFixed(2);
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: KINETIC_COLORS.onSurfaceVariant,
          font: {
            size: 11
          }
        },
        grid: {
          color: KINETIC_COLORS.primary + '20',
          drawBorder: false
        },
        title: {
          display: true,
          text: 'Response Time (ms)',
          color: KINETIC_COLORS.onSurface,
          font: {
            weight: 'bold',
            size: 12
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: KINETIC_COLORS.onSurfaceVariant,
          font: {
            size: 11
          }
        },
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Slow Count',
          color: KINETIC_COLORS.onSurface,
          font: {
            weight: 'bold',
            size: 12
          }
        }
      },
      x: {
        ticks: {
          color: KINETIC_COLORS.onSurfaceVariant,
          font: {
            size: 11
          }
        },
        grid: {
          color: KINETIC_COLORS.primary + '10',
          drawBorder: false
        }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: KINETIC_COLORS.onSurface,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 12,
            weight: 'bold'
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'rect'
        }
      },
      tooltip: {
        backgroundColor: KINETIC_COLORS.surfaceContainer,
        titleColor: KINETIC_COLORS.onSurface,
        bodyColor: KINETIC_COLORS.onSurface,
        borderColor: KINETIC_COLORS.primary,
        borderWidth: 1,
        padding: 12,
        displayColors: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: KINETIC_COLORS.onSurfaceVariant,
          font: {
            size: 11
          }
        },
        grid: {
          color: KINETIC_COLORS.primary + '20',
          drawBorder: false
        },
        title: {
          display: true,
          text: 'Count',
          color: KINETIC_COLORS.onSurface,
          font: {
            weight: 'bold',
            size: 12
          }
        }
      },
      x: {
        ticks: {
          color: KINETIC_COLORS.onSurfaceVariant,
          font: {
            size: 11
          }
        },
        grid: {
          color: KINETIC_COLORS.primary + '10',
          drawBorder: false
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart - Response Time Trend */}
      <div className="bg-surface-container-low rounded-xl ghost-border p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-primary">trending_up</span>
          <h3 className="text-lg font-headline font-bold text-on-surface">Response Time Trend</h3>
        </div>
        <div className="relative flex-1 min-h-80">
          <ChartJSLine data={lineChartData} options={lineChartOptions} />
        </div>
        <p className="text-xs text-on-surface-variant mt-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">info</span>
          Average response time and slow API count over your selected period
        </p>
      </div>

      {/* Bar Chart - Daily Statistics */}
      <div className="bg-surface-container-low rounded-xl ghost-border p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-secondary">bar_chart</span>
          <h3 className="text-lg font-headline font-bold text-on-surface">Daily Test Summary</h3>
        </div>
        <div className="relative flex-1 min-h-80">
          <ChartJSBar 
            data={{
              labels: trend.map(t => t.date || new Date(t.timestamp).toLocaleDateString()),
              datasets: [
                {
                  label: 'Total Tests',
                  data: trend.map(t => t.totalTests),
                  backgroundColor: KINETIC_COLORS.primary + '99',
                  borderColor: KINETIC_COLORS.primary,
                  borderWidth: 1,
                  borderRadius: 4
                },
                {
                  label: 'Slow Tests',
                  data: trend.map(t => t.slowCount),
                  backgroundColor: KINETIC_COLORS.error + '99',
                  borderColor: KINETIC_COLORS.error,
                  borderWidth: 1,
                  borderRadius: 4
                }
              ]
            }}
            options={barChartOptions}
          />
        </div>
        <p className="text-xs text-on-surface-variant mt-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">info</span>
          Total tests performed each day compared with slow performing APIs
        </p>
      </div>
    </div>
  );
};

export default PerformanceCharts;
