import { Nullable } from '../../core';

interface IStats {
  mean: number;
  median: number;
  mode: number;
  min: number;
  max: number;
}

export interface ICourse {
  id: string;
  department: string;
  number: string;
  name: string;
  foundational: boolean;
  deprecated: boolean;
  metric: Nullable<{
    data: {
      review_count: number;
      difficulty: IStats;
      workload: IStats;
      rating: IStats;
    };
  }>;
}
