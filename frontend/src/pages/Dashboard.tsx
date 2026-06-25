import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  Activity, 
  TrendingUp, 
  Video, 
  Image as ImageIcon,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { useHistory } from '../context/HistoryContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { history } = useHistory();

  // 1. Calculate statistics from history
  const stats = useMemo(() => {
    const total = history.length;
    const fakes = history.filter(item => item.prediction === 'FAKE').length;
    const reals = history.filter(item => item.prediction === 'REAL').length;
    
    const avgConfidence = total > 0 
      ? (history.reduce((sum, item) => sum + item.confidence, 0) / total).toFixed(2)
      : '0.00';
      
    const avgSpeed = total > 0 
      ? (history.reduce((sum, item) => sum + item.processingTime, 0) / total).toFixed(2)
      : '0.00';

    const imagesCount = history.filter(item => item.mediaType === 'image').length;
    const videosCount = history.filter(item => item.mediaType === 'video').length;

    return {
      total,
      fakes,
      reals,
      avgConfidence,
      avgSpeed,
      imagesCount,
      videosCount
    };
  }, [history]);

  // 2. Prepare charts data
  // Daily detections mock timeline supplemented with actual counts
  const timelineData = useMemo(() => {
    // Standard mock database for 7 days
    const baseData = [
      { date: 'Jun 19', Fakes: 12, Reals: 28 },
      { date: 'Jun 20', Fakes: 19, Reals: 32 },
      { date: 'Jun 21', Fakes: 15, Reals: 45 },
      { date: 'Jun 22', Fakes: 24, Reals: 38 },
      { date: 'Jun 23', Fakes: 32, Reals: 41 },
      { date: 'Jun 24', Fakes: 28, Reals: 50 },
      { date: 'Jun 25', Fakes: stats.fakes + 8, Reals: stats.reals + 12 },
    ];
    return baseData;
  }, [stats]);

  // Distribution chart data
  const distributionData = useMemo(() => {
    return [
      { name: 'Fake Detections', value: stats.fakes || 1, color: '#6366F1' }, // Indigo
      { name: 'Real Detections', value: stats.reals || 1, color: '#06B6D4' }  // Cyan
    ];
  }, [stats]);

  // Media distribution
  const mediaTypeData = useMemo(() => {
    return [
      { name: 'Images', Count: stats.imagesCount || 2, amt: 2400 },
      { name: 'Videos', Count: stats.videosCount || 3, amt: 2200 }
    ];
  }, [stats]);

  // Framer motion reveal variants
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
  };

  return (
    <div className="flex flex-col min-h-screen pt-[73px]">
      <div className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Security Dashboard <Sparkles className="w-5 h-5 text-accent-cyan animate-pulse" />
            </h1>
            <p className="text-sm text-text-secondary">
              Real-time deepfake classification metrics, logs, and self-attention model statistics.
            </p>
          </div>
          <Link to="/detect">
            <Button variant="primary" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
              New Scan
            </Button>
          </Link>
        </div>

        {/* Overview Stats Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1: Total Scans */}
          <motion.div variants={itemVariants}>
            <Card hoverable className="flex items-center gap-5 border-white/5 bg-surface/30">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-border-custom flex items-center justify-center text-accent-cyan">
                <Activity className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary uppercase tracking-widest font-semibold font-heading">Total Verifications</span>
                <span className="text-3xl font-extrabold text-white font-heading mt-1">{stats.total}</span>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: Deepfakes Blocked */}
          <motion.div variants={itemVariants}>
            <Card hoverable className="flex items-center gap-5 border-white/5 bg-surface/30">
              <div className="w-12 h-12 rounded-xl bg-danger-red/10 border border-danger-red/20 flex items-center justify-center text-danger-red">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary uppercase tracking-widest font-semibold font-heading">Deepfakes Flagged</span>
                <span className="text-3xl font-extrabold text-danger-red font-heading mt-1">{stats.fakes}</span>
              </div>
            </Card>
          </motion.div>

          {/* Card 3: Integrity Rate */}
          <motion.div variants={itemVariants}>
            <Card hoverable className="flex items-center gap-5 border-white/5 bg-surface/30">
              <div className="w-12 h-12 rounded-xl bg-success-green/10 border border-success-green/20 flex items-center justify-center text-success-green">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary uppercase tracking-widest font-semibold font-heading">Verified Real</span>
                <span className="text-3xl font-extrabold text-success-green font-heading mt-1">{stats.reals}</span>
              </div>
            </Card>
          </motion.div>

          {/* Card 4: Avg Speed */}
          <motion.div variants={itemVariants}>
            <Card hoverable className="flex items-center gap-5 border-white/5 bg-surface/30">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-border-custom flex items-center justify-center text-primary-indigo">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary uppercase tracking-widest font-semibold font-heading">Avg Processing</span>
                <span className="text-3xl font-extrabold text-white font-heading mt-1">{stats.avgSpeed}s</span>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Timeline Area Chart */}
          <Card className="lg:col-span-8 flex flex-col gap-6 border-white/5 bg-surface/30">
            <div className="flex justify-between items-center border-b border-border-custom pb-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest text-primary-indigo font-bold font-heading">analytical timeline</span>
                <h3 className="font-heading text-lg font-bold text-white">Detection Volume</h3>
              </div>
              <span className="text-xs text-text-secondary flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-border-custom">
                <TrendingUp className="w-3.5 h-3.5 text-accent-cyan" /> +14.2% weekly volume
              </span>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={timelineData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorFakes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorReals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#94A3B8" 
                    fontSize={11}
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#94A3B8" 
                    fontSize={11}
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111827', 
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px'
                    }} 
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36} 
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '11px', fontFamily: 'Inter' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Fakes" 
                    name="Fake Classified" 
                    stroke="#6366F1" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorFakes)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Reals" 
                    name="Real Classified" 
                    stroke="#06B6D4" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorReals)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Distribution Pie Chart */}
          <Card className="lg:col-span-4 flex flex-col gap-6 border-white/5 bg-surface/30">
            <div className="flex flex-col gap-1 border-b border-border-custom pb-4">
              <span className="text-xs uppercase tracking-widest text-accent-cyan font-bold font-heading">integrity distribution</span>
              <h3 className="font-heading text-lg font-bold text-white">Fake vs Real</h3>
            </div>

            <div className="h-[220px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111827', 
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-white font-heading">{stats.total}</span>
                <span className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold">scans</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 font-medium text-xs mt-2">
              <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-border-custom">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" /> Flagged Fakes</span>
                <span className="text-white font-semibold">{stats.fakes} ({stats.total > 0 ? ((stats.fakes / stats.total) * 100).toFixed(0) : 0}%)</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-border-custom">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]" /> Verified Reals</span>
                <span className="text-white font-semibold">{stats.reals} ({stats.total > 0 ? ((stats.reals / stats.total) * 100).toFixed(0) : 0}%)</span>
              </div>
            </div>
          </Card>

        </div>

        {/* Media Breakdown & Recent Scans */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Media Breakdown Bar Chart */}
          <Card className="lg:col-span-5 flex flex-col gap-6 border-white/5 bg-surface/30">
            <div className="flex flex-col gap-1 border-b border-border-custom pb-4">
              <span className="text-xs uppercase tracking-widest text-primary-indigo font-bold font-heading">media analysis breakdown</span>
              <h3 className="font-heading text-lg font-bold text-white">Media Formats Scanned</h3>
            </div>

            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mediaTypeData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  barSize={40}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94A3B8" 
                    fontSize={11}
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#94A3B8" 
                    fontSize={11}
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ 
                      backgroundColor: '#111827', 
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="Count" fill="#818cf8" radius={[6, 6, 0, 0]}>
                    <Cell fill="#6366F1" />
                    <Cell fill="#06B6D4" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold mt-1">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-border-custom">
                <ImageIcon className="w-5 h-5 text-[#6366F1]" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary uppercase">images</span>
                  <span className="text-white text-sm font-extrabold">{stats.imagesCount} verified</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-border-custom">
                <Video className="w-5 h-5 text-[#06B6D4]" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary uppercase">videos</span>
                  <span className="text-white text-sm font-extrabold">{stats.videosCount} analyzed</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Scans Table Summary */}
          <Card className="lg:col-span-7 flex flex-col gap-6 border-white/5 bg-surface/30">
            <div className="flex justify-between items-center border-b border-border-custom pb-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest text-accent-cyan font-bold font-heading">audit logs</span>
                <h3 className="font-heading text-lg font-bold text-white">Recent Media Scans</h3>
              </div>
              <Link to="/history">
                <Button variant="outline" size="sm" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                  View All
                </Button>
              </Link>
            </div>

            <div className="flex flex-col overflow-x-auto">
              <table className="w-full text-left text-xs font-medium border-collapse">
                <thead>
                  <tr className="border-b border-border-custom text-text-secondary select-none">
                    <th className="py-2.5 font-heading font-bold uppercase tracking-wider">File Name</th>
                    <th className="py-2.5 font-heading font-bold uppercase tracking-wider">Type</th>
                    <th className="py-2.5 font-heading font-bold uppercase tracking-wider text-right">Confidence</th>
                    <th className="py-2.5 font-heading font-bold uppercase tracking-wider text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-custom/5 text-white">
                  {history.slice(0, 4).map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-3 font-semibold max-w-[180px] truncate pr-2">
                        {item.name}
                      </td>
                      <td className="py-3 text-text-secondary capitalize">
                        {item.mediaType}
                      </td>
                      <td className="py-3 text-right font-mono">
                        {item.confidence}%
                      </td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.prediction === 'REAL' 
                            ? 'bg-success-green/10 text-success-green border border-success-green/20' 
                            : 'bg-danger-red/10 text-danger-red border border-danger-red/20'
                        }`}>
                          {item.prediction}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {history.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-text-secondary italic">
                        No recent scans found. Upload some media files first.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
};
