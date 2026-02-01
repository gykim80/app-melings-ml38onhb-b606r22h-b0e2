import { useEffect, useRef, useState } from 'react';
import { LAZY_LOAD_CONFIG } from '@/lib/constants';

interface UseIntersectionObserverOptions {
  /** 뷰포트 마진 (CSS margin 형식) */
  rootMargin?: string;
  /** 가시성 임계값 (0.0 ~ 1.0) */
  threshold?: number | number[];
  /** 한 번만 감지 후 observer 해제 여부 */
  once?: boolean;
}

/**
 * useIntersectionObserver - Intersection Observer API 래핑 훅
 * 요소가 뷰포트에 진입했는지 감지하여 레이지 로딩에 활용
 * 
 * @example
 * const [ref, isIntersecting] = useIntersectionObserver({ once: true });
 * return <img ref={ref} src={isIntersecting ? src : placeholder} />;
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    rootMargin = LAZY_LOAD_CONFIG.rootMargin,
    threshold = LAZY_LOAD_CONFIG.threshold,
    once = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        
        // once 옵션이 true이고, 이미 교차했다면 observer 해제
        if (once && entry.isIntersecting) {
          observer.unobserve(target);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, once]);

  return [targetRef, isIntersecting] as const;
}