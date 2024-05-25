export default function wait(miliseconds: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, miliseconds);
  });
}
