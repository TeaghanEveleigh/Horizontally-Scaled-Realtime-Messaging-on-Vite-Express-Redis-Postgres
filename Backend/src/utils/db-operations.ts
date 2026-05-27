/**
 * Build a dynamic SET clause and matching values array for an UPDATE statement.
 * Fields with `undefined` values are skipped.
 *
 * @param rowValuesToChange  Object of column → new value.
 * @returns  `{ clause, values }`, or `null` if there's nothing to update.
 */
export const getSetClauseAndValues = (
  rowValuesToChange: Record<string, unknown>,
  startIndex = 2,
): null | { clause: string; values: unknown[] } => {
  //Get the list of changes
  const changes = Object.entries(rowValuesToChange).filter(
    ([, value]) => value !== undefined,
  );
  //when returned
  if (changes.length < 1) return null;
  //We start at two so that the id can take the spot of the $1
  const clause = changes
    .map(([key], index) => `"${key}" = $${String(index + startIndex)}`)
    .join(", ");
  const values = changes.map(([, value]) => value);

  return { clause, values };
};
