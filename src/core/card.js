const MAX_SPAN = 4;

// Accepts 1-4. Columns also accept "full" (the whole row, whatever the breakpoint).
function toSpan(value, allowFull = false) {
  if (allowFull && String(value ?? "").trim().toLowerCase() === "full") {
    return "full";
  }

  const span = Number(value);

  if (!Number.isInteger(span) || span < 1) {
    return null;
  }

  return Math.min(span, MAX_SPAN);
}

export function cardClass(card, ...classes) {
  const rowSpan = toSpan(card?.rowSpan ?? card?.rows ?? card?.span);
  const colSpan = toSpan(card?.colSpan ?? card?.cols ?? card?.columns, true);
  const classNames = ["card", ...classes.filter(Boolean)];

  if (rowSpan) {
    classNames.push(`row-span-${rowSpan}`);
  }

  if (colSpan) {
    classNames.push(colSpan === "full" ? "col-full" : `col-span-${colSpan}`);
  }

  return classNames.join(" ");
}
