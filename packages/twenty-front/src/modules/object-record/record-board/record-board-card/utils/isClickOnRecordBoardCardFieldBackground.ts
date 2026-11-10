import { type MouseEvent } from 'react';
import { isDefined } from 'twenty-shared/utils';

const FIELD_INTERACTIVE_ELEMENT_SELECTOR =
  '[data-inline-cell-display-mode], button, a, input, textarea, [role]';

// The walk stops at the row because the card's drag wrapper is role="button".
// The containment check rejects clicks portalled from the row (edit dropdowns).
export const isClickOnRecordBoardCardFieldBackground = (
  event: MouseEvent<HTMLElement>,
) => {
  const fieldRow = event.currentTarget;
  const target = event.target;

  if (!(target instanceof Element) || !fieldRow.contains(target)) {
    return false;
  }

  for (
    let element: Element | null = target;
    isDefined(element) && element !== fieldRow;
    element = element.parentElement
  ) {
    if (element.matches(FIELD_INTERACTIVE_ELEMENT_SELECTOR)) {
      return false;
    }
  }

  return true;
};
