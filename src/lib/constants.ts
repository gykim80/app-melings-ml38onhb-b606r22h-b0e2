import type { SocialLink } from '@/types';

/**
 * 작가 정보
 */
export const AUTHOR = {
  name: 'Melings',
  nameKr: '멜링스',
  bio: '일본 미소녀 스타일 일러스트를 전문으로 하는 디지털 아티스트입니다.',
  email: 'contact@melings.art',
  profileImage: '/images/profile.jpg',
} as const;

/**
 * SNS 링크
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/melings_art',
    icon: 'Twitter',
  },
  {
    name: 'Pixiv',
    url: 'https://pixiv.me/melings',
    icon: 'Palette',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/melings.art',
    icon: 'Instagram',
  },
] as const;

/**
 * 네비게이션 메뉴 항목
 */
export const NAV_ITEMS = [
  { label: 'Gallery', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
] as const;

/**
 * 작품 카테고리
 */
export const CATEGORIES = [
  'All',
  'Character',
  'Background',
  'Illustration',
  'Fanart',
  'Original',
] as const;

/**
 * 커미션 정보
 */
export const COMMISSION_INFO = {
  isOpen: true,
  pricing: {
    sketch: '50,000원 ~',
    lineart: '100,000원 ~',
    fullColor: '200,000원 ~',
  },
  turnaround: '2-4주',
  terms: [
    '개인 용도만 가능합니다 (상업적 이용 불가)',
    '작업 시작 전 50% 선입금이 필요합니다',
    '스케치 단계에서 1회 수정 가능합니다',
    '완성 후에는 수정이 불가능합니다',
  ],
} as const;

/**
 * 애니메이션 지속 시간
 */
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/**
 * 라이트박스 설정
 */
export const LIGHTBOX_CONFIG = {
  enableKeyboard: true,
  enableSwipe: true,
  slideShowInterval: 3000, // 3초
  zoomLevels: [1, 1.5, 2, 3],
} as const;

/**
 * 이미지 레이지 로딩 설정
 */
export const LAZY_LOAD_CONFIG = {
  rootMargin: '200px', // 뷰포트에서 200px 전에 로드 시작
  threshold: 0.01,
} as const;