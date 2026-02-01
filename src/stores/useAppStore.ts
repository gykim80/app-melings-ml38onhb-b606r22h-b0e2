import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AppState, Artwork, ArtworkCategory, Theme } from '@/types';

/**
 * Zustand 전역 상태 스토어
 * 작품 데이터, 필터, 라이트박스, 테마 통합 관리
 */
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // ===== 상태 =====
        artworks: [],
        filteredArtworks: [],
        currentCategory: 'All',
        lightboxOpen: false,
        lightboxIndex: 0,
        theme: 'system',

        // ===== 작품 데이터 액션 =====
        setArtworks: (artworks) => {
          set({ artworks, filteredArtworks: artworks });
        },

        // ===== 필터 액션 =====
        setCategory: (category) => {
          const { artworks } = get();
          const filteredArtworks =
            category === 'All'
              ? artworks
              : artworks.filter((artwork) => artwork.category === category);
          
          set({ currentCategory: category, filteredArtworks });
        },

        // ===== 라이트박스 액션 =====
        openLightbox: (index) => {
          set({ lightboxOpen: true, lightboxIndex: index });
        },

        closeLightbox: () => {
          set({ lightboxOpen: false });
        },

        setLightboxIndex: (index) => {
          const { filteredArtworks } = get();
          // 인덱스를 배열 범위 내로 제한
          const clampedIndex = Math.max(0, Math.min(index, filteredArtworks.length - 1));
          set({ lightboxIndex: clampedIndex });
        },

        nextImage: () => {
          const { lightboxIndex, filteredArtworks } = get();
          const nextIndex = (lightboxIndex + 1) % filteredArtworks.length;
          set({ lightboxIndex: nextIndex });
        },

        prevImage: () => {
          const { lightboxIndex, filteredArtworks } = get();
          const prevIndex = lightboxIndex === 0 
            ? filteredArtworks.length - 1 
            : lightboxIndex - 1;
          set({ lightboxIndex: prevIndex });
        },

        // ===== 테마 액션 =====
        setTheme: (theme) => {
          set({ theme });
        },
      }),
      {
        name: 'melings-gallery-storage',
        // 테마만 localStorage에 저장
        partialize: (state) => ({ theme: state.theme }),
      }
    ),
    { name: 'MelingsGalleryStore' }
  )
);

// ===== Selector 훅 (성능 최적화) =====

/**
 * 필터링된 작품 목록만 구독
 */
export const useFilteredArtworks = () =>
  useAppStore((state) => state.filteredArtworks);

/**
 * 현재 카테고리만 구독
 */
export const useCurrentCategory = () =>
  useAppStore((state) => state.currentCategory);

/**
 * 라이트박스 상태만 구독
 */
export const useLightboxState = () =>
  useAppStore((state) => ({
    isOpen: state.lightboxOpen,
    currentIndex: state.lightboxIndex,
  }));

/**
 * 현재 표시 중인 작품 가져오기
 */
export const useCurrentArtwork = (): Artwork | undefined => {
  const filteredArtworks = useFilteredArtworks();
  const { currentIndex } = useLightboxState();
  return filteredArtworks[currentIndex];
};