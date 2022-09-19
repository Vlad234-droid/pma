import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';
import { Graphics } from 'components/Icon';
import { IconButton } from 'components/IconButton';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { paramsReplacer } from 'utils';

export type Props = {
  editNumber?: number;
  icon?: Graphics;
  styles?: Rule;
  buttonText?: string;
};

const EditButton: FC<Props> = ({ styles = {}, icon = 'add', buttonText = 'Edit all', editNumber }) => {
  const navigate = useNavigate();
  const { theme } = useStyle();

  const handleBtnClick = () => {
    const pathname =
      editNumber !== undefined
        ? paramsReplacer(buildPath(Page.EDIT_OBJECTIVE), { ':id': editNumber.toString() })
        : buildPath(Page.EDIT_OBJECTIVES);

    navigate(pathname);
  };

  return (
    <>
      {icon ? (
        <IconButton
          customVariantRules={{ default: styles }}
          onPress={handleBtnClick}
          graphic={icon}
          iconStyles={iconStyle}
        >
          {buttonText}
        </IconButton>
      ) : (
        <Button
          styles={[
            styles,
            {
              border: `${theme.border.width.b2} solid ${theme.colors.white}`,
              ...theme.font.fixed.f14,
              letterSpacing: '0px',
            },
          ]}
          onPress={handleBtnClick}
        >
          {buttonText}
        </Button>
      )}
    </>
  );
};

const iconStyle: Rule = {
  marginRight: '10px',
};

export default EditButton;
