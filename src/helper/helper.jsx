export function hoursToSeconds(arr) {
  // console.log((Number(arr[0]) * 60 + Number(arr[1])) * 60);
  return (Number(arr[0]) * 60 + Number(arr[1])) * 60;
}

export function stringDate(date, def) {
  if (def) {
    return `${date.slice(0, 4)}-${date.slice(5, 6) + 1}-${date.slice(8)}`;
  }
  return `${date.slice(0, 4)},${date.slice(5, 6) + 1},${date.slice(8)}`;
}
