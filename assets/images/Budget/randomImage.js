const images = {
  1: require("./1.jpeg"),
  2: require("./2.jpeg"),
  3: require("./3.jpeg"),
  4: require("./4.jpeg"),
  5: require("./5.jpeg"),
  6: require("./6.jpeg"),
  7: require("./7.png"),
  8: require("./8.png"),
  9: require("./9.jpeg"),
  10: require("./10.jpeg"),
  11: require("./11.jpeg"),
  12: require("./12.jpeg"),
  13: require("./13.jpeg"),
  14: require("./14.jpeg"),
  15: require("./15.png"),
  16: require("./16.jpeg"),
  17: require("./17.jpeg"),
  18: require("./1.png"),
  19: require("./19.jpeg"),
  20: require("./20.jpeg"),
  21: require("./21.jpeg"),
  22: require("./22.jpeg"),
};

export default function randomImage() {
  let min = 1;
  let max = 22;
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  return images[random];
}
