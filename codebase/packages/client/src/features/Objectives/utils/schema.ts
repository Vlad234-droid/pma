import { ExpressionValueType, ExpressionType } from '@pma/store';
import { Theme } from '@pma/dex-wrapper';

export const formTagCheck = (components: any, type = ExpressionType.BLOCK): boolean => {
  const holder: string[] = [];
  const openBrackets = [ExpressionValueType.OPEN];
  const closedBrackets = [ExpressionValueType.CLOSE];

  for (const component of components) {
    const tag = component?.expression?.[ExpressionType.TAG]?.[type]?.[0];
    if (openBrackets.includes(tag)) {
      holder.push(tag);
    } else if (closedBrackets.includes(tag)) {
      const openPair = openBrackets[closedBrackets.indexOf(tag)];
      if (holder[holder.length - 1] === openPair) {
        holder.splice(-1, 1);
      } else {
        holder.push(tag);
        break;
      }
    }
  }
  return holder.length === 0;
};

export const formTagComponents = (components: any, theme: Theme, type = ExpressionType.BLOCK): any => {
  if (formTagCheck(components, type)) {
    const blockComponents: any = [];
    const openBrackets = [ExpressionValueType.OPEN];
    const closedBrackets = [ExpressionValueType.CLOSE];
    let level = 0;

    for (const component of components) {
      const tag = component?.expression?.[ExpressionType.TAG]?.[type]?.[0];
      if (openBrackets.includes(tag)) {
        level++;
        blockComponents.push({
          ...component,
          style: {
            marginTop: '12px',
            borderRadius: '10px 10px 0 0',
            // @ts-ignore
            borderTop: `2px solid ${theme.colors.lightGray}`,
            // @ts-ignore
            borderLeft: `2px solid ${theme.colors.lightGray}`,
            // @ts-ignore
            borderRight: `2px solid ${theme.colors.lightGray}`,
            padding: '5px 20px',
            boxShadow: '3px 0px 0px 0px rgba(0, 0, 0, 0.05)',
          },
          level,
        });
      } else if (closedBrackets.includes(tag)) {
        blockComponents.push({
          ...component,
          style: {
            borderRadius: '0 0 10px 10px',
            // @ts-ignore
            borderBottom: `2px solid ${theme.colors.lightGray}`,
            // @ts-ignore
            borderLeft: `2px solid ${theme.colors.lightGray}`,
            // @ts-ignore
            borderRight: `2px solid ${theme.colors.lightGray}`,
            padding: '0px 20px 20px',
            boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
          },
          level,
        });
        level--;
      } else {
        blockComponents.push({
          ...component,
          style:
            level > 0
              ? {
                  // @ts-ignore
                  borderLeft: `2px solid ${theme.colors.lightGray}`,
                  // @ts-ignore
                  borderRight: `2px solid ${theme.colors.lightGray}`,
                  padding: '0px 20px',
                  boxShadow: '3px 0px 0px 0px rgba(0, 0, 0, 0.05)',
                }
              : {},
          level,
        });
      }
    }
    return blockComponents;
  }
  return components;
};
