import React, { FC, useState, useEffect } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';

import DraftItem, { DraftItem as DraftItemType } from '../DraftItem';

import { Checkbox } from 'components/Form';
import { NoFeedback } from '../../../Feedback/components';

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
  const [selected, setSelected] = useState<Selectable>({});

  useEffect(() => {
    if (items.length >= 0) {
      setSelected(items.reduce((acc, item) => ({ ...acc, [item.uuid]: false }), {}));
    }
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
    if (uuids.length >= 0) {
      onChange && onChange(uuids);
    }
  }, [uuids.length]);

  return (
    <div className={css(wrapperRule)}>
      {items.length && Object.keys(selected).length ? (
        items.map((item) => (
          <div key={item.uuid} className={css(itemsWrapperRule)}>
            {selectable && (
              <div className={css(checkBoxRule)}>
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
