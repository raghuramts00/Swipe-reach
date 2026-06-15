/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { BaseLayout } from '@/components/layout-components/BaseLayout';
import { AuthPage } from '@/pages/AuthPage';
import { Dashboard } from '@/pages/DashboardPage';
import { SwipeSpace } from '@/pages/SwipeSpace';
import { LeadsPage } from '@/pages/LeadsPage';
import { SkillsPage } from '@/pages/SkillsPage';
import { ProvidersPage } from '@/pages/ProvidersPage';
import { Toaster } from '@/components/ui-shared/sonner';

import { SettingsPage } from '@/pages/SettingsPage';

function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return <BaseLayout>{children}</BaseLayout>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/workspace" element={<PrivateRoute><SwipeSpace /></PrivateRoute>} />
      <Route path="/leads" element={<PrivateRoute><LeadsPage /></PrivateRoute>} />
      <Route path="/skills" element={<PrivateRoute><SkillsPage /></PrivateRoute>} />
      <Route path="/providers" element={<PrivateRoute><ProvidersPage /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster theme="dark" className="!bg-black/80 !backdrop-blur-xl !border-white/10" />
      </BrowserRouter>
    </AuthProvider>
  );
}
