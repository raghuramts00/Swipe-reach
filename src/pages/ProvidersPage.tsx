import { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, Plus, Settings2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const MOCK_PROVIDERS = [
  { id: '1', name: 'OpenAI', modelName: 'gpt-4o', isDefault: true, connected: true },
  { id: '2', name: 'Anthropic', modelName: 'claude-3.5-sonnet', isDefault: false, connected: true },
  { id: '3', name: 'Gemini', modelName: 'gemini-1.5-pro', isDefault: false, connected: false },
];

export function ProvidersPage() {
  const [providers, setProviders] = useState(MOCK_PROVIDERS);

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">AI Providers</h1>
          <p className="text-slate-400">Configure your LLM endpoints securely. Keys are encrypted.</p>
        </div>
        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white gap-2 h-11 px-6 rounded-xl shadow-lg shadow-indigo-500/20">
          <Plus className="h-4 w-4" />
          <span>Add Custom Provider</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {providers.map((provider, i) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-[32px] border p-8 backdrop-blur-2xl transition-all duration-300 shadow-xl
              ${provider.isDefault 
                ? 'bg-indigo-500/10 border-indigo-500/30' 
                : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
              }
            `}
          >
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-5">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center
                  ${provider.isDefault ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/10 text-slate-400'}
                `}>
                  <KeyRound className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-1">
                    {provider.name}
                    {provider.isDefault && (
                      <Badge className="bg-indigo-500 text-white border-0 text-xs px-2 py-0.5 rounded-md">Default</Badge>
                    )}
                  </h3>
                  <p className="text-sm font-medium text-slate-400">{provider.modelName}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full text-slate-500 hover:text-white hover:bg-white/10">
                  <Settings2 className="h-5 w-5" />
                </Button>
                {!provider.isDefault && (
                  <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full text-red-500/50 hover:text-red-400 hover:bg-red-500/10">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest">API Key</Label>
                <div className="flex gap-3">
                  <Input 
                    type="password" 
                    placeholder={provider.connected ? "••••••••••••••••••••" : "sk-..."}
                    className="bg-black/20 border-white/10 text-white rounded-xl h-11 focus-visible:ring-indigo-500"
                    readOnly={provider.connected}
                  />
                  <Button variant="outline" className={`
                    h-11 px-6 rounded-xl border-white/10 transition-colors font-semibold
                    ${provider.connected 
                      ? 'bg-white/5 text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30' 
                      : 'bg-indigo-500 border-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/20'
                    }
                  `}>
                    {provider.connected ? 'Update' : 'Connect'}
                  </Button>
                </div>
              </div>
            </div>
            
            {!provider.isDefault && provider.connected && (
              <Button variant="ghost" className="w-full mt-6 h-11 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-xl transition-all font-semibold">
                Set as Default
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
