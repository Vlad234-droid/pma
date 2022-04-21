import React, { FC } from 'react';

const Item: FC<{
  currentItems: Array<Record<string, string | number | null>>;
  Element: FC<any>;
  tableTitles: Array<string>;
}> = ({ currentItems, Element, tableTitles }) => {
  return <>{currentItems && <Element currentItems={currentItems} tableTitles={tableTitles} />}</>;
};

export default Item;
