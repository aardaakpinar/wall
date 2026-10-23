function toSpan(value) {
  const span = Number(value);

  if (!Number.isInteger(span) || span < 1) {
    return null;
  }

  return Math.min(span, 4);
}

export function cardClass(card, ...classes) {
  const rowSpan = toSpan(card?.rowSpan ?? card?.rows ?? card?.span);
  const colSpan = toSpan(card?.colSpan ?? card?.cols ?? card?.columns);
  const classNames = ["card", ...classes.filter(Boolean)];

  if (rowSpan) {
    classNames.push(`row-span-${rowSpan}`);
  }

  if (colSpan) {
    classNames.push(`col-span-${colSpan}`);
  }

  return classNames.join(" ");
}
