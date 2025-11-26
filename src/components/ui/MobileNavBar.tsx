'use client';

import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface MobileNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface MobileNavBarProps {
  items: MobileNavItem[];
  action?: {
    label: string;
    icon: LucideIcon;
    onPress: () => void;
  };
}

export default function MobileNavBar({ items, action }: MobileNavBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || (href !== '/dashboard' && pathname?.startsWith(href));

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden pointer-events-none">
      <div className="px-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-3">
        <div className="relative overflow-hidden pointer-events-auto rounded-3xl border border-elegant-200/80 dark:border-elegant-800/80 bg-white/95 dark:bg-elegant-900/95 backdrop-blur-2xl shadow-[0_14px_50px_-10px_rgba(14,165,233,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-secondary/8" />

          {action && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <button
                type="button"
                onClick={action.onPress}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white shadow-2xl shadow-primary/50 border-4 border-white dark:border-elegant-900 flex items-center justify-center active:scale-90 transition-all duration-200 touch-manipulation"
                aria-label={action.label}
                title={action.label}
              >
                <action.icon className="w-7 h-7" />
              </button>
            </div>
          )}

          <div className="relative flex items-end justify-between gap-1 px-2 pt-5 pb-3">
            {items.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <button
                  key={href}
                  onClick={() => router.push(href)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl transition-all duration-200 touch-manipulation min-h-[68px] ${
                    active
                      ? 'bg-gradient-to-b from-primary/15 to-secondary/10 text-primary-dark dark:text-primary-light shadow-lg shadow-primary/20 scale-105'
                      : 'text-elegant-500 dark:text-elegant-300 active:bg-elegant-100 dark:active:bg-elegant-800/60 active:scale-95'
                  }`}
                  aria-label={label}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className={`w-6 h-6 ${active ? 'stroke-[2.5]' : 'stroke-2'}`} />
                  <span className="text-[11px] font-semibold leading-tight truncate max-w-full">{label}</span>
                  {active && (
                    <span className="mt-0.5 h-1 w-8 rounded-full bg-primary/80 dark:bg-primary-light/90" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
