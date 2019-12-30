import { Nullable } from '../../core';

export interface IReview {
  id: string;
  author_id: string;
  author: {
    id: string;
    email: string;
  };
  course_id: string;
  course: {
    id: string;
    name: string;
  };
  semester_id: string;
  semester: {
    id: string;
    name: string;
    season: number;
  };
  difficulty: Nullable<number>;
  rating: Nullable<number>;
  workload: Nullable<number>;
  body: Nullable<string>;
  created: number;
  updated: Nullable<number>;
}
