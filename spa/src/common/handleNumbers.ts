export const handleNumberOnly = (event: React.ChangeEvent<HTMLInputElement>, set: any) => {
    event.preventDefault();
    const string = event.target.value;
    const regex = /^[0-9]/;
    const isValid = regex.test(string);
    if (isValid) {
        if (string[0] === "0") set(Number(string.slice(0)[1]));
        else set(Number(string));
    } else set(0);
};

export const handleFloat = (event: React.ChangeEvent<HTMLInputElement>, set: any) => {
    const value = parseFloat(event.target.value);
    if (isNaN(value)) set(0);
    else set(value);
};

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
