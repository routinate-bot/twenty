import { measureItemWidths } from '../measureItemWidths';

const createMeasuredItem = ({
  items,
  width,
}: {
  items: HTMLElement;
  width: number;
}) => {
  const item = document.createElement('div');

  item.getBoundingClientRect = () =>
    ({
      width: items.hasAttribute('data-measuring') ? width : 0,
    }) as DOMRect;

  return item;
};

describe('measureItemWidths', () => {
  it('reads widths while the measuring layout is applied', () => {
    const items = document.createElement('div');
    const itemElements = [
      createMeasuredItem({ items, width: 120 }),
      createMeasuredItem({ items, width: 90 }),
    ];

    expect(measureItemWidths({ items, itemElements })).toEqual([120, 90]);
    expect(items.hasAttribute('data-measuring')).toBe(false);
  });

  it('keeps fractional widths instead of rounding them', () => {
    const items = document.createElement('div');
    const itemElements = [
      createMeasuredItem({ items, width: 126.711 }),
      createMeasuredItem({ items, width: 127.203 }),
    ];

    expect(measureItemWidths({ items, itemElements })).toEqual([
      126.711, 127.203,
    ]);
  });
});
