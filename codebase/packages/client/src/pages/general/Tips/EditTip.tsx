import React, { FC } from 'react';
import TipsForm from 'features/general/Tips/components/TipsForm';
import { useParams } from 'react-router-dom';

const EditTip: FC = () => {
  const params = useParams();
  const { tipUuid } = params;
  return <TipsForm mode={tipUuid === 'new' ? 'create' : 'edit'} />;
};

export default EditTip;
