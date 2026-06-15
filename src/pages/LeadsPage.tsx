import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Plus, Download, Search } from 'lucide-react';
import Papa from 'papaparse';
import { Button } from '@/components/ui-shared/button';
import { Input } from '@/components/ui-shared/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui-shared/table';
import { Badge } from '@/components/ui-shared/badge';

const DUMMY_LEADS = [
  { id: '1', name: 'John Doe', company: 'Acme Corp', role: 'CEO', industry: 'SaaS', status: 'Pending' },
  { id: '2', name: 'Jane Smith', company: 'TechFlow', role: 'CTO', industry: 'AI', status: 'Generated' },
  { id: '3', name: 'Alice Johnson', company: 'CloudScale', role: 'VP Engineering', industry: 'Cloud', status: 'Reviewed' },
];

export function LeadsPage() {
  const [leads, setLeads] = useState(DUMMY_LEADS);
  const [search, setSearch] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const newLeads = results.data.map((row: any, i) => ({
            id: `new-${i}`,
            name: row.Name || row.name || 'Unknown',
            company: row.Company || row.company || 'Unknown',
            role: row.Role || row.Title || row.role || 'Unknown',
            industry: row.Industry || row.industry || 'Unknown',
            status: 'Imported'
          })).filter(l => l.name !== 'Unknown');
          setLeads([...newLeads, ...leads]);
        }
      });
    }
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Leads</h1>
          <p className="text-slate-400">Manage your outreach prospects and import new files.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search leads..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-11 rounded-xl focus-visible:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleFileUpload} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" className="bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:text-white gap-2 h-11 rounded-xl">
              <Upload className="h-4 w-4" />
              <span>Import CSV</span>
            </Button>
          </div>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white gap-2 h-11 rounded-xl shadow-lg shadow-indigo-500/20">
            <Plus className="h-4 w-4" />
            <span>Add Manual</span>
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl"
      >
        <Table>
          <TableHeader className="bg-white/5 border-b border-white/10">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="text-slate-400 font-bold text-xs uppercase tracking-widest h-14">Name</TableHead>
              <TableHead className="text-slate-400 font-bold text-xs uppercase tracking-widest">Company</TableHead>
              <TableHead className="text-slate-400 font-bold text-xs uppercase tracking-widest">Role</TableHead>
              <TableHead className="text-slate-400 font-bold text-xs uppercase tracking-widest">Industry</TableHead>
              <TableHead className="text-slate-400 font-bold text-xs uppercase tracking-widest text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead, i) => (
              <TableRow key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <TableCell className="font-semibold text-white">{lead.name}</TableCell>
                <TableCell className="text-slate-300">{lead.company}</TableCell>
                <TableCell className="text-slate-400 text-sm">{lead.role}</TableCell>
                <TableCell className="text-slate-400 text-sm">{lead.industry}</TableCell>
                <TableCell className="text-right">
                  <Badge 
                    variant="outline" 
                    className={`
                      ${lead.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : ''}
                      ${lead.status === 'Generated' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : ''}
                      ${lead.status === 'Imported' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                      ${lead.status === 'Reviewed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                    `}
                  >
                    {lead.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {filteredLeads.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                  No leads found. Import a CSV to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
