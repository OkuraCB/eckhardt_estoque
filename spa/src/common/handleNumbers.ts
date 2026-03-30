export const handleNumberOnly = (
  event: React.ChangeEvent<HTMLInputElement>,
  set: any
) => {
  event.preventDefault();
  const string = event.target.value;
  const regex = /^[0-9]/;
  const isValid = regex.test(string);
  if (isValid) {
    if (string[0] === "0") set(string.slice(0)[1]);
    else set(string);
  }
};

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
