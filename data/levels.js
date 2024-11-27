const { UUID } = require("bson");

const levels = [
  {
    id: "bdc13929-bd40-4d45-a94b-c46353ce7f35",
    name: "Starlit Street",
    img: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1731670606/aq6jh3e3ehfgfhiipan8.jpg",
    location: {
      x: 2109,
      y: 833,
    },
    dimensions: {
      w: 3000,
      h: 1935,
    },
  },
  {
    id: "182e8b00-f2d0-43d2-ae0b-5df9101affe3",
    name: "Track & Field",
    img: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1731670610/madjvtyarmkfo6ogo7e0.jpg",
    location: {
      x: 844,
      y: 654,
    },
    dimensions: {
      w: 3000,
      h: 1899,
    },
  },
  {
    id: "7c676723-1fc2-48ec-8b40-3837c0ae9744",
    name: "Snow Day",
    img: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1731670604/pwgdjuix5ho1vbor9w9i.jpg",
    location: {
      x: 2565,
      y: 1401,
    },
    dimensions: {
      w: 3000,
      h: 1902,
    },
  },
];

module.exports = { levels };
