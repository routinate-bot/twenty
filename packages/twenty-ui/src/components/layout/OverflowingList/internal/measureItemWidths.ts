export const measureItemWidths = ({
  items,
  itemElements,
}: {
  items: HTMLElement;
  itemElements: Element[];
}) => {
  items.setAttribute('data-measuring', '');
  const naturalItemWidths = itemElements.map(
    (item) => item.getBoundingClientRect().width,
  );
  items.removeAttribute('data-measuring');

  return naturalItemWidths;
};
