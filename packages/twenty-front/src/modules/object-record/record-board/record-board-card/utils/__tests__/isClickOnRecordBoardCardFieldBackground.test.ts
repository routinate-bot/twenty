import { isClickOnRecordBoardCardFieldBackground } from '@/object-record/record-board/record-board-card/utils/isClickOnRecordBoardCardFieldBackground';
import { type MouseEvent } from 'react';

const buildClickEvent = ({
  fieldRow,
  target,
}: {
  fieldRow: HTMLElement;
  target: EventTarget;
}) =>
  ({ currentTarget: fieldRow, target }) as unknown as MouseEvent<HTMLElement>;

const renderCard = () => {
  document.body.innerHTML = `
    <div role="button" aria-roledescription="draggable">
      <div data-testid="field-row">
        <span data-testid="field-icon">icon</span>
        <div data-testid="value-area">
          <div data-inline-cell-display-mode>
            <span data-testid="value">Nursery</span>
          </div>
          <button data-testid="copy-button"><svg data-testid="copy-icon"></svg></button>
        </div>
      </div>
    </div>
    <div data-testid="portalled-dropdown"><span data-testid="option">Option</span></div>
  `;

  const getByTestId = (testId: string) =>
    document.querySelector(`[data-testid="${testId}"]`) as HTMLElement;

  return { fieldRow: getByTestId('field-row'), getByTestId };
};

describe('isClickOnRecordBoardCardFieldBackground', () => {
  it('treats a click on the blank part of the row as a background click', () => {
    const { fieldRow, getByTestId } = renderCard();

    expect(
      isClickOnRecordBoardCardFieldBackground(
        buildClickEvent({ fieldRow, target: getByTestId('value-area') }),
      ),
    ).toBe(true);
    expect(
      isClickOnRecordBoardCardFieldBackground(
        buildClickEvent({ fieldRow, target: getByTestId('field-icon') }),
      ),
    ).toBe(true);
    expect(
      isClickOnRecordBoardCardFieldBackground(
        buildClickEvent({ fieldRow, target: fieldRow }),
      ),
    ).toBe(true);
  });

  it('ignores the draggable role="button" wrapper around the card', () => {
    const { fieldRow, getByTestId } = renderCard();

    expect(fieldRow.closest('[role]')).not.toBeNull();
    expect(
      isClickOnRecordBoardCardFieldBackground(
        buildClickEvent({ fieldRow, target: getByTestId('value-area') }),
      ),
    ).toBe(true);
  });

  it('does not treat a click on the field value as a background click', () => {
    const { fieldRow, getByTestId } = renderCard();

    expect(
      isClickOnRecordBoardCardFieldBackground(
        buildClickEvent({ fieldRow, target: getByTestId('value') }),
      ),
    ).toBe(false);
  });

  it('does not treat a click on a button inside the row as a background click', () => {
    const { fieldRow, getByTestId } = renderCard();

    expect(
      isClickOnRecordBoardCardFieldBackground(
        buildClickEvent({ fieldRow, target: getByTestId('copy-icon') }),
      ),
    ).toBe(false);
  });

  it('does not treat a click portalled from outside the row as a background click', () => {
    const { fieldRow, getByTestId } = renderCard();

    expect(
      isClickOnRecordBoardCardFieldBackground(
        buildClickEvent({ fieldRow, target: getByTestId('option') }),
      ),
    ).toBe(false);
  });
});
