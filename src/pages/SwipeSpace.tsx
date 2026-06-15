import { useState, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Heart, X, RotateCcw, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui-shared/button';
import { Badge } from '@/components/ui-shared/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui-shared/tabs';
import { ScrollArea } from '@/components/ui-shared/scroll-area';
import { toast } from 'sonner';

// Mock Data
const MOCK_GENERATIONS = [
  {
    id: '1',
    leadName: 'John Doe',
    company: 'Acme Corp',
    messages: {
      emailA: "Hey John,\n\nNoticed Acme Corp's recent launch on product hunt, killer stuff. I help SaaS CEOs scale outbound systems. Worth a chat?",
      emailB: "John - love the design direction at Acme. We built a tool that automates finding leads like me. Curious to see it?",
      dmA: "Hey John, amazing growth at Acme! Have you looked into automating your top-of-funnel?",
      dmB: "John, big fan of your work. Quick question - how are you handling outbound volume right now?"
    }
  },
  {
    id: '2',
    leadName: 'Jane Smith',
    company: 'TechFlow',
    messages: {
      emailA: "Jane,\n\nSaw your talk on AI infra. We're building something similar for the sales layer. Would love to swap notes.",
      emailB: "Hey Jane, TechFlow is crushing it. Finding we have lots of mutuals in the AI space. Open to connecting?",
      dmA: "Jane, loved the recent blog post on scaling data pipelines.",
      dmB: "Hey Jane, noticed you're growing the sales team. Any bottlenecks with lead gen?"
    }
  }
];

function SwipeCard({ generation, onSwipe, index, isTop }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const [activeTab, setActiveTab] = useState('emailA');

  const handleDragEnd = (e: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    } else if (info.offset.y < -100) {
      onSwipe('up');
    } else if (info.offset.y > 100) {
      onSwipe('down');
    }
  };

  return (
    <motion.div
      style={{ x, y, rotate, opacity, zIndex: 100 - index }}
      drag={isTop ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      className={`absolute inset-0 w-full max-w-2xl mx-auto h-[600px] flex flex-col ${!isTop ? 'pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}
      initial={{ scale: 0.95, opacity: 0, y: 30 }}
      animate={{ scale: isTop ? 1 : 1 - index * 0.05, opacity: 1 - index * 0.2, y: index * 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex-1 rounded-[40px] border border-white/20 bg-white/10 backdrop-blur-3xl shadow-2xl flex flex-col overflow-hidden relative">
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-50"></div>
        
        <div className="relative z-10 flex-1 flex flex-col h-full">
          <div className="px-8 py-6 flex items-center justify-between border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">🏢</div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">{generation.leadName}</h2>
                <div className="flex gap-2 items-center">
                  <Badge variant="outline" className="bg-white/5 border-white/10 text-slate-400">{generation.company}</Badge>
                  <Badge variant="outline" className="bg-indigo-500/10 border-indigo-500/20 text-indigo-400">SaaS Framework</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
               <Button size="icon" variant="ghost" className="rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white" onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(generation.messages[activeTab]); toast('Copied to clipboard'); }}>
                 <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7761 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7761 5 12.5V5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
               </Button>
            </div>
          </div>

          <div className="px-8 mt-6">
            <Tabs defaultValue="emailA" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl inline-flex mb-4">
                <TabsTrigger value="emailA" className="rounded-lg data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-slate-400">Email A</TabsTrigger>
                <TabsTrigger value="emailB" className="rounded-lg data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-slate-400">Email B</TabsTrigger>
                <TabsTrigger value="dmA" className="rounded-lg data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-slate-400">DM A</TabsTrigger>
                <TabsTrigger value="dmB" className="rounded-lg data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-slate-400">DM B</TabsTrigger>
              </TabsList>

              <div className="flex-1 relative overflow-hidden mt-2" onPointerDownCapture={(e) => e.stopPropagation()}>
                <ScrollArea className="h-[260px] w-full">
                  <TabsContent value="emailA" className="m-0 mt-0 h-full text-lg leading-relaxed text-slate-200 whitespace-pre-wrap outline-none">
                    {generation.messages.emailA}
                  </TabsContent>
                  <TabsContent value="emailB" className="m-0 mt-0 h-full text-lg leading-relaxed text-slate-200 whitespace-pre-wrap outline-none">
                    {generation.messages.emailB}
                  </TabsContent>
                  <TabsContent value="dmA" className="m-0 mt-0 h-full text-lg leading-relaxed text-slate-200 whitespace-pre-wrap outline-none">
                    {generation.messages.dmA}
                  </TabsContent>
                  <TabsContent value="dmB" className="m-0 mt-0 h-full text-lg leading-relaxed text-slate-200 whitespace-pre-wrap outline-none">
                    {generation.messages.dmB}
                  </TabsContent>
                </ScrollArea>
              </div>
            </Tabs>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export function SwipeSpace() {
  const [generations, setGenerations] = useState(MOCK_GENERATIONS);

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (generations.length === 0) return;
    
    const lead = generations[0];

    switch (direction) {
      case 'right': toast.success(`Saved messages for ${lead.leadName}`); break;
      case 'left': toast.error(`Rejected messages for ${lead.leadName}`); break;
      case 'up': toast.success(`Favorited messages for ${lead.leadName}`); break;
      case 'down': toast.info(`Regenerating messages for ${lead.leadName}`); break;
    }

    setGenerations((prev) => prev.slice(1));
  };

  return (
    <div className="h-full flex flex-col items-center justify-center pt-8 pb-32">
      
      {/* Cards Area */}
      <div className="relative w-full max-w-2xl h-[560px] perspective-[1000px]">
        {generations.map((gen, i) => (
          <SwipeCard 
            key={gen.id} 
            generation={gen} 
            index={i} 
            isTop={i === 0} 
            onSwipe={handleSwipe} 
          />
        ))}
        {generations.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px]"
          >
            <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
              <RotateCcw className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You're all caught up!</h3>
            <p className="text-center max-w-md text-sm">You've reviewed all generated messages. Upload more leads or generate a new batch to continue.</p>
            <Button className="mt-8 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl h-11 px-8 shadow-lg shadow-indigo-500/20">
              Generate More
            </Button>
          </motion.div>
        )}
      </div>

      {/* Control Actions / Floating Bottom Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-white/5 backdrop-blur-3xl border border-white/20 px-8 py-4 rounded-full shadow-2xl z-50">
        <button 
          className="group flex flex-col items-center gap-2"
          onClick={() => handleSwipe('left')}
        >
          <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all shadow-lg shadow-red-500/10">
            <X className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
            <span className="px-1 py-0.5 bg-white/10 rounded text-[9px] text-white/80 font-mono">←</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-red-400 tracking-tighter">Reject</span>
          </div>
        </button>

        <button 
          className="group flex flex-col items-center gap-2"
          onClick={() => handleSwipe('up')}
        >
          <div className="w-12 h-12 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all shadow-lg shadow-green-500/10">
            <Bookmark className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
            <span className="px-1 py-0.5 bg-white/10 rounded text-[9px] text-white/80 font-mono">↑</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-green-400 tracking-tighter">Save</span>
          </div>
        </button>

        <div className="h-8 w-[1px] bg-white/10"></div>

        <button 
          className="group flex flex-col items-center gap-2"
          onClick={() => handleSwipe('down')}
        >
          <div className="w-12 h-12 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-lg shadow-indigo-500/10">
            <RotateCcw className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
            <span className="px-1 py-0.5 bg-white/10 rounded text-[9px] text-white/80 font-mono">↓</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-indigo-400 tracking-tighter">Regen</span>
          </div>
        </button>

        <button 
          className="group flex flex-col items-center gap-2"
          onClick={() => handleSwipe('right')}
        >
          <div className="w-12 h-12 rounded-full border border-purple-500/30 bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-lg shadow-purple-500/10">
            <Heart className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
            <span className="px-1 py-0.5 bg-white/10 rounded text-[9px] text-white/80 font-mono">→</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-purple-400 tracking-tighter">Favorite</span>
          </div>
        </button>
      </div>
    </div>
  );
}
