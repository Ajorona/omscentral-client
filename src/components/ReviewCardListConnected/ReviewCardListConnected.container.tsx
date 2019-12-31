import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { WatchQueryFetchPolicy } from 'apollo-client';
import { IReview } from '../../data/interfaces';
import useSession from '../../utils/useSessionStorage';
import ReviewCardListConnected, { SortKey } from './ReviewCardListConnected';

interface IProps {
  query: any;
  variables?: any;
  fetchPolicy?: WatchQueryFetchPolicy;
  pagination?: boolean;
  before?: JSX.Element;
}

const ReviewCardListConnectedContainer: React.FC<IProps> = ({
  query,
  variables = {},
  fetchPolicy,
  pagination = true,
  before
}) => {
  const [limit, setLimit] = useSession<number>('rcl:l', pagination ? 10 : 10e6);
  const [sortKey, setSortKey] = useSession<SortKey>('rcl:sk', SortKey.Semester);
  const { data, loading } = useQuery<{ reviews: IReview[] }>(query, {
    variables: {
      ...variables,
      limit,
      orderByDesc: sortKey,
      orderByDescToo: SortKey.Created
    },
    fetchPolicy
  });

  const handleLoadMore = () => {
    setLimit(limit + 10);
  };

  const handleSortKeyChange = (key: SortKey) => {
    if (key !== sortKey) {
      setLimit(10);
      setSortKey(key);
    }
  };

  return (
    <ReviewCardListConnected
      loading={loading}
      reviews={data?.reviews}
      sortKey={sortKey}
      onSortKeyChange={handleSortKeyChange}
      onLoadMore={pagination ? handleLoadMore : undefined}
      before={before}
    />
  );
};

export default ReviewCardListConnectedContainer;
