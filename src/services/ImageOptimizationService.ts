import { supportsWebP } from '@/lib/utils';

/**
 * ImageOptimizationService - 이미지 최적화 유틸리티
 * WebP 지원 감지, 적절한 이미지 포맷 선택
 */
class ImageOptimizationService {
  private webpSupported: boolean;

  constructor() {
    this.webpSupported = supportsWebP();
  }

  /**
   * 최적의 이미지 URL 반환
   * WebP 지원 시 webpImage, 미지원 시 fullImage 반환
   */
  getOptimizedImageUrl(fullImage: string, webpImage?: string): string {
    if (this.webpSupported && webpImage) {
      return webpImage;
    }
    return fullImage;
  }

  /**
   * srcset 생성 (반응형 이미지)
   * 다양한 화면 크기에 맞는 이미지 제공
   */
  generateSrcSet(basePath: string, sizes: number[]): string {
    return sizes
      .map((size) => `${basePath}-${size}w.jpg ${size}w`)
      .join(', ');
  }

  /**
   * 이미지 프리로드
   * 중요한 이미지를 미리 로드하여 UX 향상
   */
  preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }

  /**
   * 썸네일 URL 생성
   * 원본 이미지 경로에서 썸네일 경로 생성
   */
  getThumbnailUrl(fullImagePath: string): string {
    return fullImagePath.replace('-full', '-thumb');
  }
}

export const imageOptimization = new ImageOptimizationService();