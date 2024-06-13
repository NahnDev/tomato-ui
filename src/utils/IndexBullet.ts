export default class IndexBullet {
  static romanize(num: number) {
    const roman = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };
    var str = "";
    for (let i of Object.keys(roman)) {
      var q = Math.floor(num / roman[i as keyof typeof roman]);
      num -= q * roman[i as keyof typeof roman];
      str += i.repeat(q);
    }
    return str;
  }

  static getIndex(level: number, index: number) {
    switch (level) {
      case 1:
        return `${IndexBullet.romanize(index)}`;
      case 2:
        return `${index}`;
      case 3:
        return String.fromCharCode(65 + index);
      default:
        return "-";
    }
  }
}
