const players_starlit_street = [
  {
    rank: 1,
    name: "Jane Doe",
    time: {
      minutes: "00",
      seconds: "00",
      miliseconds: "01",
    },
    anon: false,
    levelId: "bdc13929-bd40-4d45-a94b-c46353ce7f35",
  },
  {
    rank: 2,
    name: "Ellen Moe",
    time: {
      minutes: "8",
      seconds: "13",
      miliseconds: "45",
    },
    anon: false,
    levelId: "bdc13929-bd40-4d45-a94b-c46353ce7f35",
  },
  {
    rank: 3,
    name: "Stupid AH BOI",
    time: {
      minutes: "10",
      seconds: "28",
      miliseconds: "45",
    },
    anon: true,
    levelId: "bdc13929-bd40-4d45-a94b-c46353ce7f35",
  },
];

const players_snow_day = [
  {
    rank: 1,
    name: "Dane Joe",
    time: {
      minutes: "00",
      seconds: "00",
      miliseconds: "01",
    },
    anon: false,
    levelId: "7c676723-1fc2-48ec-8b40-3837c0ae9744",
  },
  {
    rank: 2,
    name: "Hellen Goe",
    time: {
      minutes: "8",
      seconds: "13",
      miliseconds: "45",
    },
    anon: false,
    levelId: "7c676723-1fc2-48ec-8b40-3837c0ae9744",
  },
  {
    rank: 3,
    name: "Stupid AH BOI",
    time: {
      minutes: "10",
      seconds: "28",
      miliseconds: "45",
    },
    anon: true,
    levelId: "7c676723-1fc2-48ec-8b40-3837c0ae9744",
  },
];

const players_track_and_field = [
  {
    rank: 1,
    name: "Anne Yo",
    time: {
      minutes: "00",
      seconds: "00",
      miliseconds: "01",
    },
    anon: false,
    levelId: "182e8b00-f2d0-43d2-ae0b-5df9101affe3",
  },
  {
    rank: 2,
    name: "Gepard Hillard",
    time: {
      minutes: "8",
      seconds: "13",
      miliseconds: "45",
    },
    anon: false,
    levelId: "182e8b00-f2d0-43d2-ae0b-5df9101affe3",
  },
  {
    rank: 3,
    name: null,
    time: {
      minutes: "10",
      seconds: "28",
      miliseconds: "45",
    },
    anon: true,
    levelId: "182e8b00-f2d0-43d2-ae0b-5df9101affe3",
  },
];

const players = players_snow_day.concat(
  players_starlit_street,
  players_track_and_field
);

module.exports = { players };
