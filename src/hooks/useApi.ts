import { useQuery } from '@tanstack/react-query';
import { api, HomePageResponse, FeedPageResponse } from '@/api/client';

export const useHomePage = () => {
  return useQuery<HomePageResponse, Error>({
    queryKey: ['homePage'],
    queryFn: api.getHomePage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFeedPage = (page: number = 1) => {
  return useQuery<FeedPageResponse, Error>({
    queryKey: ['feedPage', page],
    queryFn: () => api.getFeedPage(page),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};