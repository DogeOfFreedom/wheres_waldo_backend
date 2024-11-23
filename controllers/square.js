// Formula comes from:
// https://stackoverflow.com/questions/2752725/finding-whether-a-point-lies-inside-a-rectangle-or-not

// For a rectangle, if a point is on the left side of all edges, it's in the square
const insideSquare = (coord, answer) => {
  const width = answer.dimensions.w;
  const height = answer.dimensions.h;

  // use coord to get the pixel positions of the square corners
  const radius = 30; // Square is 60 x 60
  const p1 = {
    // bottom right
    x: Math.min(width, Math.max(0, coord.x + radius)),
    y: Math.min(height, Math.max(0, coord.y + radius)),
  };
  const p2 = {
    // top right
    x: Math.min(width, Math.max(0, coord.x + radius)),
    y: Math.min(height, Math.max(0, coord.y - radius)),
  };
  const p3 = {
    // top left
    x: Math.min(width, Math.max(0, coord.x - radius)),
    y: Math.min(height, Math.max(0, coord.y - radius)),
  };
  const p4 = {
    // bottom left
    x: Math.min(width, Math.max(0, coord.x - radius)),
    y: Math.min(height, Math.max(0, coord.y + radius)),
  };
  const pairs = [
    [p2, p1],
    [p3, p2],
    [p4, p3],
    [p1, p4],
  ];

  // Check if the answer is in the newly formed square
  for (const pair of pairs) {
    const D = onLeftSideCheck(answer.location, pair[0], pair[1]);
    if (D < 0) {
      return false;
    }
  }
  return true;
};

const onLeftSideCheck = (target, p1, p2) => {
  const xp = target.x;
  const yp = target.y;
  const x1 = p1.x;
  const y1 = p1.y;
  const x2 = p2.x;
  const y2 = p2.y;
  return (x2 - x1) * (yp - y1) - (xp - x1) * (y2 - y1);
};

// Formula for checking which side of the line a point lies.
// D = (x2 - x1) * (yp - y1) - (xp - x1) * (y2 - y1)
// D > 0 <-- On the left side
// D < 0 <-- On the right side
// D = 0 <-- On the line

module.exports = { insideSquare };
