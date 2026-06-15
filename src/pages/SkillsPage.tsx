import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCode2, Plus, ArrowRight, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const MOCK_SKILLS = [
  { id: '1', name: 'alex_hormozi.md', description: 'Direct, offer-focused, highly persuasive cold email framework.', usages: 1420 },
  { id: '2', name: 'saas_outreach.md', description: 'Enterprise SaaS cold email sequence tailored for CTOs.', usages: 850 },
  { id: '3', name: 'linkedin_dm.md', description: 'Casual, high-converting LinkedIn DM openers.', usages: 3200 },
];

export function SkillsPage() {
  const [skills, setSkills] = useState(MOCK_SKILLS);

  return (
    <div className="space-y-8 h-full flex flex-col pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Skills</h1>
          <p className="text-slate-400">Manage your SKILL.md prompt templates and writing styles.</p>
        </div>
        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white gap-2 h-11 px-6 rounded-xl shadow-lg shadow-indigo-500/20">
          <Plus className="h-4 w-4" />
          <span>Create New Skill</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 min-h-0">
        
        {/* Skills List */}
        <div className="col-span-1 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl flex flex-col overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-white/5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Your Skills</h3>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {skills.map((skill, i) => (
                <motion.button
                  key={skill.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-full text-left p-4 rounded-[20px] flex flex-col gap-2 transition-all duration-200 group
                    ${i === 0 ? 'bg-indigo-500/10 border border-indigo-500/20 shadow-lg shadow-indigo-500/10' : 'bg-white/5 border border-white/5 hover:border-white/20'}
                  `}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`font-mono text-sm font-bold ${i === 0 ? 'text-indigo-400' : 'text-slate-300 group-hover:text-white'}`}>
                      {skill.name}
                    </span>
                    <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-500 hover:text-white rounded-full">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className={`text-[10px] ${i === 0 ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300' : 'bg-black/20 border-white/10 text-slate-400'}`}>
                      {skill.usages.toLocaleString()} outputs
                    </Badge>
                  </div>
                </motion.button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Skill Editor (Visual Mock) */}
        <div className="col-span-1 md:col-span-2 rounded-[32px] border border-white/10 bg-[#0d0d12]/90 backdrop-blur-3xl flex flex-col overflow-hidden relative shadow-2xl">
          <div className="h-14 border-b border-white/10 flex items-center px-6 bg-black/40 justify-between">
            <div className="flex items-center gap-3">
              <FileCode2 className="h-5 w-5 text-indigo-400" />
              <span className="font-mono text-sm text-slate-300">alex_hormozi.md</span>
            </div>
            <div className="flex gap-3">
              <kbd className="hidden sm:inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded text-xs text-slate-400 font-mono">
                Cmd S
              </kbd>
              <Button size="sm" className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/30 h-8 text-xs rounded-lg px-4">
                Save Changes
              </Button>
            </div>
          </div>
          
          <div className="flex-1 p-8 relative font-mono text-[13px] leading-relaxed text-indigo-100/70 overflow-y-auto">
            <div className="absolute top-8 left-6 bottom-8 w-8 text-slate-600 flex flex-col items-end pr-4 border-r border-white/10 select-none">
              {Array.from({length: 20}).map((_, i) => <div key={i} className="h-[21px]">{i+1}</div>)}
            </div>
            <div className="pl-14 outline-none whitespace-pre-wrap tracking-wide" contentEditable suppressContentEditableWarning>
<span className="text-indigo-400 font-bold">---</span>{"\n"}
<span className="text-blue-400">name</span>: alex_hormozi.md{"\n"}
<span className="text-blue-400">description</span>: Direct, offer-focused cold email framework.{"\n"}
<span className="text-indigo-400 font-bold">---</span>{"\n"}
{"\n"}
<span className="text-purple-400 font-bold"># Identity</span>{"\n"}
You are an aggressive but polite growth consultant.{"\n"}
Your writing is concise. You do not use fluff.{"\n"}
You focus entirely on the grand slam offer.{"\n"}
{"\n"}
<span className="text-purple-400 font-bold"># Rules</span>{"\n"}
- NO formal greetings (e.g. "I hope this finds you well").{"\n"}
- Use short, punchy paragraphs. Maximum 2 lines per paragraph.{"\n"}
- End with a low-friction call to action.{"\n"}
- Lead with an undeniable offer or unique mechanism.{"\n"}
{"\n"}
<span className="text-purple-400 font-bold"># Examples</span>{"\n"}
<span className="text-emerald-400 font-bold">{">"}</span> "Hey [Name], noticed you're scaling the dev team at [Company]."{"\n"}
<span className="text-emerald-400 font-bold">{">"}</span> "We placed 3 senior React engineers at Acme Corp last month and saved them $40k in recruiter fees."{"\n"}
<span className="text-emerald-400 font-bold">{">"}</span> "Worth a quick chat to see if we can do the same for you?"{"\n"}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
