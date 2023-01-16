import React, { useMemo, FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getNextReviewNumberSelector } from '@pma/store';

import { useTenant } from 'features/general/Permission';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages/general/types';
import { ReviewType } from 'config/enum';

const CreateObjective: FC = () => {
  const tenant = useTenant();
  const navigate = useNavigate();
  const { state } = useLocation();
  const nextNumber = useSelector(getNextReviewNumberSelector(ReviewType.OBJECTIVE));

  const CreateUpdateObjectives = useMemo(
    () =>
      React.lazy(() =>
        import(`features/${tenant}/CreateUpdateObjectives`).then((module) => ({ default: module.default })),
      ),
    [],
  );

  const handleClose = () => navigate((state as any)?.backPath || buildPath(Page.REVIEWS));
  const handleSuccessClose = () => navigate(buildPath(Page.REVIEWS_VIEW));

  return (
    <CreateUpdateObjectives onClose={handleClose} onSuccessClose={handleSuccessClose} editNumber={nextNumber} create />
  );
};

export default CreateObjective;
