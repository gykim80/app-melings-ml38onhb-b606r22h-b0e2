/**
 * 작품(Artwork) 타입 정의
 * 갤러리에 표시되는 모든 작품의 데이터 구조
 */
export interface Artwork {
  /** 고유 식별자 */
  id: string;
  /** 작품 제목 */
  title: string;
  /** 카테고리 (Character, Background, Illustration 등) */
  category: ArtworkCategory;
  /** 태그 배열 (Original, Fanart, Commission 등) */
  tags: string[];
  /** 썸네일 이미지 경로 */
  thumbnail: string;
  /** 고해상도 원본 이미지 경로 */
  fullImage: string;
  /** WebP 포맷 이미지 경로 (선택 사항) */
  webpImage?: string;
  /** 제작 날짜 (ISO 8601 형식) */
  createdAt: string;
  /** 작품 설명 (선택 사항) */
  description?: string;
  /** 이미지 너비 (px) */
  width: number;
  /** 이미지 높이 (px) */
  height: number;
}

export type ArtworkCategory = 'All' | 'Character' | 'Background' | 'Illustration' | 'Fanart' | 'Original';

/**
 * 라이트박스 상태 타입
 */
export interface LightboxState {
  /** 라이트박스 열림 여부 */
  isOpen: boolean;
  /** 현재 표시 중인 작품 인덱스 */
  currentIndex: number;
}

/**
 * 테마 타입
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * SNS 링크 타입
 */
export interface SocialLink {
  /** SNS 플랫폼 이름 */
  name: string;
  /** SNS 프로필 URL */
  url: string;
  /** 아이콘 이름 (lucide-react) */
  icon: string;
}

/**
 * 필터 상태 타입
 */
export interface FilterState {
  /** 현재 선택된 카테고리 */
  category: ArtworkCategory;
  /** 검색어 (추후 확장용) */
  searchQuery?: string;
}

/**
 * 전역 앱 스토어 상태 타입
 */
export interface AppState {
  // 작품 데이터
  artworks: Artwork[];
  filteredArtworks: Artwork[];
  
  // 필터 상태
  currentCategory: ArtworkCategory;
  
  // 라이트박스 상태
  lightboxOpen: boolean;
  lightboxIndex: number;
  
  // 테마 상태
  theme: Theme;
  
  // 액션
  setArtworks: (artworks: Artwork[]) => void;
  setCategory: (category: ArtworkCategory) => void;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  setLightboxIndex: (index: number) => void;
  nextImage: () => void;
  prevImage: () => void;
  setTheme: (theme: Theme) => void;
}

/**
 * 이미지 로딩 상태 타입
 */
export type ImageLoadingState = 'idle' | 'loading' | 'loaded' | 'error';