import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { AuthContext } from '../../../Auth';
import { GET_USER_REVIEWS } from '../../../../data/queries';
import ReviewCardListConnected from '../../../ReviewCardListConnected';

const UserReviewsContainer: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Helmet title="My Reviews" />
      <ReviewCardListConnected
        query={GET_USER_REVIEWS}
        variables={{ id: user!.uid }}
        pagination={false}
        fetchPolicy="no-cache"
      />
    </>
  );
};

export default UserReviewsContainer;
