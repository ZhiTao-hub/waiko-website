// Global type definitions for performance APIs

declare global {
  interface Navigator {
    connection?: {
      effectiveType: '4g' | '3g' | '2g' | 'slow-2g';
      downlink: number;
      rtt: number;
      saveData: boolean;
    };
    deviceMemory?: number;
  }

  interface Window {
    AOS?: {
      init: (options?: any) => void;
      refresh: () => void;
    };
  }

  interface Performance {
    navigation: {
      type: number;
    };
  }
}

export {};