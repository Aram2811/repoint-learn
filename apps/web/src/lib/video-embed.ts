// این utility لینک معمولی ویدیو رو به embed URL تبدیل می‌کنه
// مثلاً: https://youtube.com/watch?v=abc → https://youtube.com/embed/abc
//
// چرا لازمه؟ چون مرورگر نمی‌تونه لینک معمولی YouTube رو داخل iframe نشون بده
// باید از فرمت embed استفاده کنیم

export type VideoType = 'youtube' | 'aparat' | 'vimeo' | 'direct' | 'unknown';

export interface VideoInfo {
  embedUrl: string;
  type: VideoType;
  videoId: string | null;
}

export function parseVideoUrl(url: string): VideoInfo {
  if (!url) return { embedUrl: '', type: 'unknown', videoId: null };

  // YouTube
  const ytMatch =
    url.match(/youtube\.com\/watch\?v=([^&]+)/) ||
    url.match(/youtu\.be\/([^?]+)/) ||
    url.match(/youtube\.com\/embed\/([^?]+)/);

  if (ytMatch) {
    const videoId = ytMatch[1];
    return {
      embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`,
      type: 'youtube',
      videoId,
    };
  }

  // Aparat
  const aparatMatch =
    url.match(/aparat\.com\/v\/([^?/]+)/) ||
    url.match(/aparat\.com\/.*\/([a-zA-Z0-9]+)$/);

  if (aparatMatch) {
    const videoId = aparatMatch[1];
    return {
      embedUrl: `https://www.aparat.com/video/video/embed/videohash/${videoId}/vt/frame`,
      type: 'aparat',
      videoId,
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    return {
      embedUrl: `https://player.vimeo.com/video/${videoId}`,
      type: 'vimeo',
      videoId,
    };
  }

  // لینک مستقیم (mp4 و...)
  if (url.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
    return { embedUrl: url, type: 'direct', videoId: null };
  }

  return { embedUrl: url, type: 'unknown', videoId: null };
}
