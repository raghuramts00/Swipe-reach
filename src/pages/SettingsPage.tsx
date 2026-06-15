import React from 'react';
import { motion } from 'framer-motion';
import { Save, User, Briefcase, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your profile, preferences, and default configurations.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-3xl p-8 shadow-2xl"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <User className="h-4 w-4" /> Full Name
            </Label>
            <Input 
              defaultValue="Alex Hormozi"
              className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus-visible:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Company
            </Label>
            <Input 
              defaultValue="Acquisition.com"
              className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus-visible:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Mail className="h-4 w-4" /> Signature
            </Label>
            <Textarea 
              defaultValue="Best,\nAlex Hormozi\nCEO @ Acquisition.com\n\nP.S. Check out our latest book here: [link]"
              className="bg-white/5 border-white/10 text-white rounded-xl min-h-[120px] focus-visible:ring-indigo-500"
            />
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-end">
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 rounded-xl h-11 gap-2 shadow-lg shadow-indigo-500/20 font-semibold">
              <Save className="h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
