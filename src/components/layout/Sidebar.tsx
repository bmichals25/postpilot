'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LogoIcon,
  HomeIcon,
  LightningIcon,
  CalendarIcon,
  ChartIcon,
  LinkIcon,
  SettingsIcon,
  ChevronDownIcon,
  PlusIcon,
} from '@/components/icons';

interface Workspace {
  id: string;
  name: string;
  initials: string;
  type: string;
  color: string;
}

const workspaces: Workspace[] = [
  { id: '1', name: 'TechCorp Inc.', initials: 'TC', type: 'Business', color: 'from-emerald-500 to-emerald-600' },
  { id: '2', name: "Ben's Personal Brand", initials: 'BM', type: 'Personal', color: 'from-indigo-500 to-purple-500' },
  { id: '3', name: 'Side Project Co.', initials: 'SC', type: 'Startup', color: 'from-amber-500 to-orange-500' },
];

const mainNavItems = [
  { href: '/', label: 'Dashboard', icon: HomeIcon },
  { href: '/ai-generate', label: 'AI Generate', icon: LightningIcon },
  { href: '/schedule', label: 'Schedule', icon: CalendarIcon },
  { href: '/analytics', label: 'Analytics', icon: ChartIcon },
];

const settingsNavItems = [
  { href: '/connections', label: 'Connections', icon: LinkIcon },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState(workspaces[0]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-[#F3F4F6] p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 mb-8">
        <div className="w-9 h-9 gradient-primary rounded-[10px] flex items-center justify-center">
          <LogoIcon className="text-white" size={20} />
        </div>
        <span className="text-xl font-bold text-[#1F2937]">PostPilot</span>
      </div>

      {/* Workspace Switcher */}
      <div className="relative my-4">
        <button
          onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
          className="w-full px-3 py-2.5 bg-[#F9FAFB] rounded-[10px] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentWorkspace.color} flex items-center justify-center text-sm font-semibold text-white`}>
              {currentWorkspace.initials}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[13px] font-semibold text-[#1F2937] truncate">{currentWorkspace.name}</div>
              <div className="text-[11px] text-[#6B7280]">{currentWorkspace.type}</div>
            </div>
            <ChevronDownIcon className={`text-[#9CA3AF] transition-transform ${isWorkspaceOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {/* Dropdown */}
        {isWorkspaceOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-[10px] shadow-lg border border-[#E5E7EB] p-2 z-50">
            {workspaces.map((workspace) => (
              <button
                key={workspace.id}
                onClick={() => {
                  setCurrentWorkspace(workspace);
                  setIsWorkspaceOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors ${
                  workspace.id === currentWorkspace.id ? 'bg-[#EEF2FF]' : 'hover:bg-[#F9FAFB]'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${workspace.color} flex items-center justify-center text-xs font-semibold text-white`}>
                  {workspace.initials}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-[13px] font-semibold text-[#1F2937] truncate">{workspace.name}</div>
                  <div className="text-[11px] text-[#6B7280]">{workspace.type}</div>
                </div>
              </button>
            ))}
            <div className="mt-1 pt-3 border-t border-[#E5E7EB]">
              <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-[#6B7280] hover:text-[#6366F1] hover:bg-[#F9FAFB] transition-colors">
                <div className="w-7 h-7 border-2 border-dashed border-[#D1D5DB] rounded-lg flex items-center justify-center">
                  <PlusIcon size={14} />
                </div>
                Add workspace
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div className="mb-6">
        <div className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide px-3 mb-2">
          Main
        </div>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-[#EEF2FF] text-[#6366F1]'
                  : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#1F2937]'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Settings Navigation */}
      <div className="mb-6">
        <div className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide px-3 mb-2">
          Settings
        </div>
        {settingsNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-[#EEF2FF] text-[#6366F1]'
                  : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#1F2937]'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User Section with AI Credits */}
      <div className="p-3 bg-[#F9FAFB] rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
            B
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#1F2937]">Ben</div>
            <div className="text-xs text-[#6B7280]">Pro Plan</div>
          </div>
        </div>

        {/* AI Credits */}
        <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#6B7280]">AI Credits</span>
            <span className="text-xs font-semibold text-[#1F2937] tabular-nums">847 / 1,000</span>
          </div>
          <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-300"
              style={{ width: '84.7%' }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
