import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Zap, 
  KeyRound, 
  Settings, 
  Layers,
  Search,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export function BaseLayout({ children }: { children: ReactNode }) {
  const { signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Swipe Workspace', path: '/workspace', icon: Layers },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'Skills', path: '/skills', icon: Zap },
    { name: 'Providers', path: '/providers', icon: KeyRound },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden text-slate-200 bg-[#050508] font-sans relative">
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      {/* Glass Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="z-10 w-64 h-full border-r border-white/5 bg-white/5 backdrop-blur-2xl flex flex-col py-8"
      >
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">SwipeMail AI</span>
        </div>

        <div className="px-6 mb-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search (Cmd+K)" 
              className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-white/20 transition-all font-medium"
            />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative
                  ${isActive ? 'bg-white/10 text-white shadow-inner' : 'text-slate-400 hover:text-white'}
                `}
              >
                <Icon className="h-5 w-5 relative z-10" />
                <span className="relative z-10 font-medium text-sm">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 mt-auto">
          <button 
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-all duration-300"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col z-10 relative overflow-y-auto">
        <div className="p-8 w-full max-w-7xl mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
