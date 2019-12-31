import React from 'react';
import Helmet from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';
import { GET_CONFIG } from '../../../../data/queries';
import { IConfig } from '../../../../data/interfaces';
import Static from '../../../Static/Static';

const Privacy: React.FC = () => {
  const { data } = useQuery<{ config: IConfig }>(GET_CONFIG, {
    variables: {
      id: 'privacy'
    }
  });

  return (
    <>
      <Helmet title="Privacy Policy" />
      {data?.config?.value && <Static html={data.config.value} />}
    </>
  );
};

export default Privacy;
