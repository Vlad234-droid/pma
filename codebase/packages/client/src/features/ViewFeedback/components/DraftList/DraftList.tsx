import React, { FC, useEffect, useState } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';

// eslint-disable-next-line import/no-named-as-default
import DraftItem, { DraftItem as DraftItemType } from '../DraftItem';
import { useSelector } from 'react-redux';
import { getLoadedStateSelector } from '@pma/store';

import { Checkbox } from 'components/Form';
import { NoFeedback } from '../../../Feedback/components';

export const WRAPPER = 'list-wrapper';

type Selectable = Record<string, boolean>;

type Props = {
  items: DraftItemType[];
  selectable?: boolean;
  downloadable?: boolean;
  uniqueSelect?: boolean;
  uncheck?: boolean;
  onChange?: (items: string[]) => void;
};

const DraftList: FC<Props> = ({
  items = [],
  selectable = false,
  downloadable = true,
  uniqueSelect = false,
  uncheck = false,
  onChange,
}) => {
  const { loaded } = useSelector(getLoadedStateSelector);

  const [selected, setSelected] = useState<Selectable>({});

  useEffect(() => {
    setSelected(items.reduce((acc, item) => ({ ...acc, [item.uuid]: false }), {}));
  }, [items.length]);

  const canSelect = (uuid: string) =>
    uniqueSelect && Object.entries(selected).filter(([, value]) => value).length >= 1 && !selected[uuid];

  const { css } = useStyle();

  useEffect(() => {
    if (uncheck) {
      setSelected(Object.keys(selected).reduce((acc, key) => ({ ...acc, [acc[key]]: false }), {}));
    }
  }, [uncheck]);

  const uuids = Object.entries(selected)
    .filter(([, value]) => value)
    .flatMap(([key]) => key);

  useEffect(() => {
    onChange && onChange(uuids);
  }, [uuids.length]);

  if (!loaded) return <div className={css(wrapperRule)} data-test-id='empty' />;

  return (
    <div className={css(wrapperRule)} data-test-id={WRAPPER}>
      {items.length && Object.keys(selected).length ? (
        items.map((item) => (
          <div key={item.uuid} className={css(itemsWrapperRule)}>
            {selectable && (
              <div className={css(checkBoxRule)} data-test-id='checkboxes'>
                <Checkbox
                  id='selectAll'
                  name={item.uuid}
                  onChange={() => setSelected((selected) => ({ ...selected, [item.uuid]: !selected[item.uuid] }))}
                  checked={selected[item.uuid]}
                  disabled={canSelect(item.uuid)}
                  indeterminate={false}
                />
              </div>
            )}
            <DraftItem item={item} downloadable={downloadable} />
          </div>
        ))
      ) : (
        <NoFeedback />
      )}
    </div>
  );
};

const wrapperRule: Rule = {
  flex: '3 1 676px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const itemsWrapperRule: Rule = {
  display: 'flex',
};

const checkBoxRule: Rule = {
  marginRight: '20px',
  marginTop: '39px',
};

export default DraftList;
