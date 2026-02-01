import { useEffect } from 'react';

type KeyboardEventHandler = (event: KeyboardEvent) => void;

interface UseKeyboardOptions {
  /** 이벤트 핸들러가 활성화될 조건 */
  enabled?: boolean;
}

/**
 * useKeyboard - 키보드 이벤트 처리 범용 훅
 * 특정 키 입력에 대한 콜백을 쉽게 등록
 * 
 * @example
 * useKeyboard({
 *   ArrowLeft: () => prevImage(),
 *   ArrowRight: () => nextImage(),
 *   Escape: () => close(),
 * }, { enabled: isOpen });
 */
export function useKeyboard(
  handlers: Record<string, KeyboardEventHandler>,
  options: UseKeyboardOptions = {}
) {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const handler = handlers[event.key];
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlers, enabled]);
}