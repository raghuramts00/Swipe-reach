import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Layers, Star, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', leads: 400, messages: 240, saved: 20 },
  { name: 'Tue', leads: 300, messages: 139, saved: 35 },
  { name: 'Wed', leads: 200, messages: 980, saved: 120 },
  { name: 'Thu', leads: 278, messages: 390, saved: 45 },
  { name: 'Fri', leads: 189, messages: 480, saved: 60 },
  { name: 'Sat', leads: 239, messages: 380, saved: 50 },
  { name: 'Sun', leads: 349, messages: 430, saved: 80 },
];

const StatCard = ({ title, value, icon: Icon, trend, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-none">
      <div className="flex flex-row items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          {title}
        </h3>
        <Icon className="h-5 w-5 text-indigo-400" />
      </div>
      <div>
        <div className="text-3xl font-bold text-white">{value}</div>
        <p className="text-xs text-slate-400 mt-1">
          {trend} from last week
        </p>
      </div>
    </Card>
  </motion.div>
);

export function Dashboard() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Overview</h1>
          <p className="text-slate-400">Your AI outreach performance at a glance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Leads Uploaded" value="2,485" icon={Users} trend="+12.5%" delay={0.1} />
        <StatCard title="Messages Generated" value="12,400" icon={Layers} trend="+34.1%" delay={0.2} />
        <StatCard title="Saved Messages" value="1,204" icon={Star} trend="+8.2%" delay={0.3} />
        <StatCard title="Active Skills" value="14" icon={Zap} trend="+2.4%" delay={0.4} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8"
      >
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-none">
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Generation Activity</h3>
          </div>
          <div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                  <YAxis stroke="rgba(255,255,255,0.4)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} axisLine={false} tickLine={false} dx={-10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', backdropFilter: 'blur(12px)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="messages" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorMessages)" />
                  <Area type="monotone" dataKey="saved" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorSaved)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
