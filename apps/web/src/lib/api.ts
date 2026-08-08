// این فایل یه نمونه‌ی axios می‌سازه که:
//   1. base URL رو از env می‌خونه
//   2. به صورت خودکار Cookie رو با هر request می‌فرسته (credentials)
//   3. اگه 401 برگشت، به صفحه‌ی لاگین redirect می‌کنه

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api',
  withCredentials: true, // برای ارسال Cookie در هر request
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor: اگه 401 برگشت → redirect به لاگین
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (
      error.response?.status === 401 &&
      typeof window !== 'undefined' &&
      !window.location.pathname.includes('/auth')
    ) {
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  },
);

export default api;
