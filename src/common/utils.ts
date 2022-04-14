export const checkIntersection = (
  x: number,
  y: number,
  rect:
    | {
        top: number;
        right: number;
        bottom: number;
        left: number;
      }
    | undefined,
) => {
  if (!rect) {
    return false;
  }
  const { top, right, bottom, left } = rect;
  const xIntersect = x >= left && x <= right;
  const yIntersect = y >= top && y <= bottom;
  return xIntersect && yIntersect;
};
