import { useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import type { Theme } from '@/types';

/**
 * useTheme - 테마 상태 및 전환 로직
 * localStorage 동기화, 시스템 선호도 감지
 * 
 * @example
 * const { theme, setTheme, resolvedTheme } = useTheme();
 */
export function useTheme() {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  // 시스템 다크 모드 선호도 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = () => {
      if (theme === 'system') {
        const isDark = mediaQuery.matches;
        document.documentElement.classList.toggle('dark', isDark);
      }
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);

    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  // 테마 변경 시 HTML 클래스 업데이트
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', isDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  // 현재 적용된 테마 계산 (system인 경우 실제 적용된 값)
  const getResolvedTheme = (): 'light' | 'dark' => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };

  return {
    theme,
    setTheme,
    resolvedTheme: getResolvedTheme(),
  };
}