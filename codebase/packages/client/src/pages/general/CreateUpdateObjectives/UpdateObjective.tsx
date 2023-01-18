import React, { FC, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { buildPath } from 'features/general/Routes';
import { useTenant } from 'features/general/Permission';
import { Page } from 'pages/general/types';

const UpdateObjective: FC = () => {
  const tenant = useTenant();
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const editNumber = id !== undefined ? +id : 1;

  const handleClose = () => navigate((state as any)?.backPath || buildPath(Page.REVIEWS_VIEW));

  const CreateUpdateObjectives = useMemo(
    () =>
      React.lazy(() =>
        import(`features/${tenant}/CreateUpdateObjectives`).then((module) => ({ default: module.default })),
      ),
    [],
  );

  return <CreateUpdateObjectives onClose={handleClose} editNumber={editNumber} useSingleStep={!!id} />;
};

export default UpdateObjective;
