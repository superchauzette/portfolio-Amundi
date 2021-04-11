export function toArray(querySnapshot) {
  const result = [];
  querySnapshot.forEach((d) => {
    result.push({ ...d.data(), id: d.id });
  });
  return result;
}
