import React, { FC, useState } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { Checkbox } from 'components/Form';

import { Colleague } from './Colleague';
import { Status } from 'config/enum';

type Props = {
  status: Status;
  checkedItems: string[];
  colleagues: any[];
  handleSelectItem: (T) => void;
};

export const ColleagueList: FC<Props> = ({ status, checkedItems, colleagues, handleSelectItem }) => {
  const { css } = useStyle();
  const [colleagueExpanded, setColleagueExpanded] = useState<string>();

  return (
    <div data-test-id='colleague-list'>
      {colleagues?.map((colleague) => (
        <div data-test-id={`colleague-wrapper-${colleague.uuid}`} key={colleague.uuid} className={css(wrapperStyle)}>
          <div className={css(checkboxWrapperStyle)}>
            {status === Status.WAITING_FOR_APPROVAL && (
              <span className={css(checkboxPositionStyle)}>
                <Checkbox
                  disabled={colleague?.timeline?.length > 1}
                  id={colleague.uuid}
                  name={colleague.uuid}
                  checked={checkedItems.includes(colleague.uuid)}
                  onChange={handleSelectItem}
                />
              </span>
            )}
          </div>
          <div className={css(blockStyle)}>
            <Colleague
              status={status}
              colleague={colleague}
              setColleagueExpanded={setColleagueExpanded}
              colleagueExpanded={colleagueExpanded}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const wrapperStyle: Rule = { display: 'flex', flexWrap: 'wrap' };
const checkboxWrapperStyle: Rule = { width: '40px', position: 'relative' };
const checkboxPositionStyle: Rule = { position: 'absolute', top: '36px' };
const blockStyle: Rule = { width: 'calc(100% - 40px)' };
