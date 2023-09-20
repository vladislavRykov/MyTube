export const formatNumber = (numberStr: string) => {
  const digitsCount = numberStr.length;
  const number = +numberStr;

  if (digitsCount < 4) {
    return numberStr;
  } else if (digitsCount < 7) {
    const main = Math.floor(number / 1000);
    const condition = main < 99 && number % 1000 > 99;
    const second = condition ? `,${Math.round((number % 1000) / 100)}` : '';
    return `${main}${second} тыс.`;
  } else if (digitsCount < 10) {
    const main = Math.floor(number / 1000000);
    const condition = main < 99 && number % 1000000 > 99999;
    const second = condition ? `,${Math.round((number % 1000000) / 100000)}` : '';
    return `${main}${second} млн.`;
  } else if (digitsCount > 9) {
    const main = Math.floor(number / 1000000000);
    const second =
      number % 1000000000 > 999999 ? `,${Math.round((number % 1000000000) / 100000000)}` : '';
    return `${main}${second} млрд.`;
  }
};
