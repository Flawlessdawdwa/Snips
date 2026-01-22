import axios from 'axios';
import Reactotron from '@/config/ReactotronConfig';

const API_BASE_URL = 'https://snips-testing-data.s3.us-east-2.amazonaws.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Reactotron network monitoring
if (__DEV__) {
  apiClient.interceptors.request.use(
    config => {
      Reactotron.log('API Request', {
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
      });
      return config;
    },
    error => {
      Reactotron.error('API Request Error', error);
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    response => {
      Reactotron.log('API Response', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
      return response;
    },
    error => {
      Reactotron.error('API Response Error', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
      return Promise.reject(error);
    }
  );
}

// API endpoints
export const endpoints = {
  homePage: '/homePage.json',
  feedPage: '/FeedPage1.json',
};

// Type definitions
export interface Title {
  id: string;
  nameEn: string;
  name_en?: string;
  tags?: string[];
  posterUrl: string;
  poster_url?: string;
  thumbnailUrl?: string;
  duration?: number;
  releaseDate?: string;
  genres?: string[];
  snipsCount?: number;
  badges?: any[];
  captions_en?: string;
  video_playback_url?: string;
  link?: string;
  rank?: number;
}

export interface HomePageComponent {
  id: string;
  componentType: string;
  sectionTitle: string;
  titles: Title[];
  link?: string;
}

export interface HomePageResponse {
  userUuid?: string;
  country?: string;
  data: {
    components: HomePageComponent[];
    settings?: {
      search: boolean;
    };
    pageType?: string;
  };
}

export interface FeedPageResponse {
  feedTitles: Title[];
  total: number;
  currentPage: number;
  totalPages: number;
  nextPage: number;
}

// API methods
export const api = {
  getHomePage: async (): Promise<HomePageResponse> => {
    const response = await apiClient.get(endpoints.homePage);
    return response.data;
  },

  getFeedPage: async (page: number = 1): Promise<FeedPageResponse> => {
    const response = await apiClient.get(endpoints.feedPage);
    return response.data;
  },
};