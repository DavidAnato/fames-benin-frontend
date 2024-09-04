import { apiRequest } from '../utils/api';

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Opportunity {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  image: string;
}

export const fetchOpportunities = async (pageUrl: string | null = null): Promise<PaginatedResponse<Opportunity>> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: pageUrl || 'opportunities/',
    });
    return response.data as PaginatedResponse<Opportunity>;
  } catch (error) {
    console.error('Failed to fetch opportunities:', error);
    throw error;
  }
};

export const fetchOpportunityDetail = async (id: number): Promise<Opportunity> => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: `opportunities/${id}`,
    });
    return response.data as Opportunity;
  } catch (error) {
    console.error(`Failed to fetch opportunity detail for id ${id}:`, error);
    throw error;
  }
};


