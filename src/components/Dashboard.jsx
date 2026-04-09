import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PerformanceCharts from './PerformanceCharts';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(7);

  useEffect(() => {
    fetchDashboardData();
  }, [days]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/dashboard/data?days=${days}`
      );
      if (response.data.success) {
        setDashboardData(response.data.data);
        setError(null);
      }
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Error fetching dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface p-8 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-on-surface-variant">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface p-8 flex items-center justify-center">
        <div className="text-center space-y-4 bg-surface-container-low p-8 rounded-xl ghost-border">
          <span className="material-symbols-outlined text-5xl text-error">error_outline</span>
          <p className="text-error font-semibold">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-primary text-on-primary font-headline font-bold px-6 py-2 rounded-lg hover:scale-[1.02] transition-transform"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-surface p-8 flex items-center justify-center">
        <div className="text-center space-y-4 bg-surface-container-low p-8 rounded-xl ghost-border">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant opacity-50">bar_chart</span>
          <p className="text-on-surface-variant font-semibold">No data available</p>
          <p className="text-sm text-on-surface-variant">Start testing APIs to see data here</p>
        </div>
      </div>
    );
  }

  const overview = dashboardData.overview;
  const apiStats = dashboardData.apiStats || [];
  const trend = dashboardData.trend || [];

  return (
    <div className="min-h-screen bg-surface p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-headline font-bold text-on-surface">Dashboard</h2>
          <p className="text-on-surface-variant mt-2">Performance analytics for your API tests</p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="appearance-none bg-surface-container-highest text-primary font-headline font-bold px-4 py-2 rounded-lg border border-outline-variant/20 focus:ring-2 focus:ring-primary/30 cursor-pointer text-xs"
        >
          <option value={7}>Last 7 days</option>
          <option value={14}>Last 14 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-low rounded-xl ghost-border p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <span className="material-symbols-outlined text-primary">assessment</span>
            </div>
            <p className="text-xs font-headline font-bold tracking-widest uppercase text-on-surface-variant">Total Tests</p>
          </div>
          <p className="text-3xl font-bold text-on-surface">{overview.totalTests}</p>
        </div>

        <div className="bg-surface-container-low rounded-xl ghost-border p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-secondary/10">
              <span className="material-symbols-outlined text-secondary">schedule</span>
            </div>
            <p className="text-xs font-headline font-bold tracking-widest uppercase text-on-surface-variant">Avg Response</p>
          </div>
          <p className="text-3xl font-bold text-on-surface">{overview.avgResponseTime}ms</p>
        </div>

        <div className="bg-surface-container-low rounded-xl ghost-border p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-error/10">
              <span className="material-symbols-outlined text-error">trending_down</span>
            </div>
            <p className="text-xs font-headline font-bold tracking-widest uppercase text-on-surface-variant">Slow APIs</p>
          </div>
          <p className="text-3xl font-bold text-on-surface">{overview.slowCount}</p>
          <p className="text-xs text-on-surface-variant mt-2">{overview.slowPercentage}% of tests</p>
        </div>

        <div className="bg-surface-container-low rounded-xl ghost-border p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-tertiary/10">
              <span className="material-symbols-outlined text-tertiary">api</span>
            </div>
            <p className="text-xs font-headline font-bold tracking-widest uppercase text-on-surface-variant">APIs Tested</p>
          </div>
          <p className="text-3xl font-bold text-on-surface">{overview.totalAPIs}</p>
        </div>
      </div>

      {/* Charts */}
      <PerformanceCharts trend={trend} />

      {/* API Performance Stats */}
      <div className="bg-surface-container-low rounded-xl ghost-border p-6">
        <h3 className="text-lg font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined">trending_up</span>
          API Performance Ranking
        </h3>
        
        {apiStats.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="px-6 py-4 text-left text-xs font-headline font-bold tracking-widest uppercase text-on-surface-variant">API URL</th>
                  <th className="px-6 py-4 text-left text-xs font-headline font-bold tracking-widest uppercase text-on-surface-variant">Avg Time</th>
                  <th className="px-6 py-4 text-left text-xs font-headline font-bold tracking-widest uppercase text-on-surface-variant">Tests</th>
                  <th className="px-6 py-4 text-left text-xs font-headline font-bold tracking-widest uppercase text-on-surface-variant">Slow Count</th>
                  <th className="px-6 py-4 text-left text-xs font-headline font-bold tracking-widest uppercase text-on-surface-variant">Slow %</th>
                </tr>
              </thead>
              <tbody>
                {apiStats.map((stat, idx) => (
                  <tr key={idx} className="border-b border-outline-variant/10 hover:bg-surface-container-highest transition-colors">
                    <td className="px-6 py-4 text-sm text-on-surface truncate max-w-md font-mono" title={stat.apiUrl}>
                      {stat.apiUrl}
                    </td>
                    <td className={`px-6 py-4 text-sm font-bold ${stat.avgResponseTime > 2000 ? 'text-error' : 'text-secondary'}`}>
                      {stat.avgResponseTime}ms
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface">{stat.totalTests}</td>
                    <td className="px-6 py-4 text-sm font-bold text-error">{stat.slowCount}</td>
                    <td className="px-6 py-4 text-sm text-on-surface">{stat.slowPercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant opacity-50">table_chart</span>
            <p className="text-on-surface-variant mt-4">No API data available yet</p>
            <p className="text-sm text-on-surface-variant mt-1">Start testing APIs to see performance trends over time</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
