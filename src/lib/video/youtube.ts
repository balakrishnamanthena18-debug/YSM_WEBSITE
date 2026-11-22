/**
 * YSM INFOTECH LMS — YOUTUBE VIDEO INTEGRATION & PROVIDER ABSTRACTION
 * Handles YouTube video ID extraction, strict host validation, sanitized embed URL generation,
 * and extensible video provider interfaces.
 */

export type SupportedVideoProvider = 'youtube' | 'vimeo' | 'cloudflare' | 'custom' | 'mp4';

export interface VideoParseResult {
  valid: boolean;
  videoId?: string;
  provider: SupportedVideoProvider;
  normalizedUrl?: string;
  embedUrl?: string;
  error?: string;
}

// YouTube Video ID regex: exactly 11 characters (alphanumeric, dash, underscore)
const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

export const COURSE_YOUTUBE_DEFAULTS: Record<string, string> = {
  'python-for-ai': 'kqtD5dpn9C8',
  'sql': 'HXV3zeRR3h4',
  'power-bi-with-ai': 'AGrl-H87pRU',
  'tableau': 'aHaOIvR00So',
  'advanced-excel-with-ai': 'Vl0H-qTclOg',
  'data-analytics-gen-ai': 'wXfP5kS1_s0',
  'ai-ml': 'JMUxmLyrhSk',
  'data-science-with-gen-ai': 'ua-CiDNNj30',
  'ai-engineer': 'aircAruvnKk',
  'gen-ai-agentic-ai': 'aywZrzNaKjs',
  'azure-devops': '4BIBQ69_8tc',
  'business-analyst-ai': '4Z9m7sS7Nqk',
};

// Allowed YouTube hostnames
const ALLOWED_YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtu.be',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
]);

/**
 * Extracts and validates a YouTube Video ID from any standard YouTube URL format.
 * Rejects arbitrary iframe HTML, script tags, and unauthorized domains.
 */
export function extractYouTubeVideoId(input: string): string | null {
  if (!input || typeof input !== 'string') return null;

  const trimmed = input.trim();

  // Explicitly reject iframe strings or HTML tags
  if (/<[a-z][\s\S]*>/i.test(trimmed) || trimmed.includes('<iframe') || trimmed.includes('javascript:')) {
    return null;
  }

  // 1. Check if the input is already a raw 11-char Video ID
  if (YOUTUBE_ID_REGEX.test(trimmed)) {
    return trimmed;
  }

  try {
    // Add protocol if missing for URL parsing
    const urlString = trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `https://${trimmed}`;

    const url = new URL(urlString);
    const host = url.hostname.toLowerCase();

    // Ensure hostname is an authorized YouTube domain
    if (!ALLOWED_YOUTUBE_HOSTS.has(host)) {
      return null;
    }

    // Format A: youtu.be/VIDEO_ID
    if (host.includes('youtu.be')) {
      const pathname = url.pathname.replace(/^\/+/, '');
      const potentialId = pathname.split('/')[0]?.split('?')[0];
      if (potentialId && YOUTUBE_ID_REGEX.test(potentialId)) {
        return potentialId;
      }
    }

    // Format B: youtube.com/watch?v=VIDEO_ID
    const vParam = url.searchParams.get('v');
    if (vParam && YOUTUBE_ID_REGEX.test(vParam)) {
      return vParam;
    }

    // Format C: youtube.com/embed/VIDEO_ID or youtube.com/v/VIDEO_ID
    if (url.pathname.includes('/embed/') || url.pathname.includes('/v/')) {
      const parts = url.pathname.split('/');
      const embedIdx = parts.findIndex((p) => p === 'embed' || p === 'v');
      if (embedIdx !== -1 && parts[embedIdx + 1]) {
        const potentialId = parts[embedIdx + 1].split('?')[0];
        if (potentialId && YOUTUBE_ID_REGEX.test(potentialId)) {
          return potentialId;
        }
      }
    }

    // Format D: youtube.com/shorts/VIDEO_ID
    if (url.pathname.includes('/shorts/')) {
      const parts = url.pathname.split('/');
      const shortsIdx = parts.findIndex((p) => p === 'shorts');
      if (shortsIdx !== -1 && parts[shortsIdx + 1]) {
        const potentialId = parts[shortsIdx + 1].split('?')[0];
        if (potentialId && YOUTUBE_ID_REGEX.test(potentialId)) {
          return potentialId;
        }
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Validates a video URL and returns parsed metadata.
 */
export function parseAndValidateYouTubeUrl(input: string): VideoParseResult {
  if (!input || !input.trim()) {
    return {
      valid: false,
      provider: 'youtube',
      error: 'Please enter a valid YouTube video URL or Video ID.',
    };
  }

  // Security: Guard against arbitrary iframe insertion
  if (/<[a-z][\s\S]*>/i.test(input) || input.includes('<iframe')) {
    return {
      valid: false,
      provider: 'youtube',
      error: 'Raw iframe HTML is not permitted. Please paste the direct YouTube URL instead.',
    };
  }

  const videoId = extractYouTubeVideoId(input);
  if (!videoId) {
    return {
      valid: false,
      provider: 'youtube',
      error: 'Invalid YouTube URL. Supported formats: youtube.com/watch?v=ID, youtu.be/ID, or youtube.com/embed/ID.',
    };
  }

  return {
    valid: true,
    videoId,
    provider: 'youtube',
    normalizedUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: getYouTubeEmbedUrl(videoId),
  };
}

/**
 * Constructs a privacy-enhanced, responsive YouTube embed URL using youtube-nocookie.com.
 * Configured with parameters recommended for LMS embedding:
 * - enablejsapi=1 (allows IFrame API to track playback events)
 * - rel=0 (prevents unrelated third-party video recommendations)
 * - modestbranding=1 (reduces YouTube branding)
 */
export function getYouTubeEmbedUrl(
  videoId: string,
  options?: {
    autoplay?: boolean;
    startSeconds?: number;
    enableJsApi?: boolean;
    origin?: string;
  }
): string {
  const cleanId = encodeURIComponent(videoId.trim());
  const params = new URLSearchParams({
    enablejsapi: options?.enableJsApi ?? true ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });

  if (options?.autoplay) {
    params.set('autoplay', '1');
  }

  if (options?.startSeconds && options.startSeconds > 0) {
    params.set('start', Math.floor(options.startSeconds).toString());
  }

  if (options?.origin) {
    params.set('origin', options.origin);
  }

  return `https://www.youtube-nocookie.com/embed/${cleanId}?${params.toString()}`;
}

/**
 * Generates official YouTube thumbnail URL for video previews.
 */
export function getYouTubeThumbnailUrl(
  videoId: string,
  quality: 'default' | 'hqdefault' | 'maxresdefault' = 'hqdefault'
): string {
  const cleanId = encodeURIComponent(videoId.trim());
  return `https://img.youtube.com/vi/${cleanId}/${quality}.jpg`;
}
