export const formatVideoDuration = (duration: string) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const newMatch = match?.slice(1).map(function (x, idx) {
    if (x != null) {
      return [x.replace(/\D/, ''), x.replace(/[0-9]/g, '')];
    }
    const letter = idx === 0 ? 'H' : idx === 1 ? 'M' : 'S';
    return [null, letter];
  });
  const formatted = newMatch
    ?.reduce((acc, item, idx) => {
      switch (item[1]) {
        case 'H':
          if (item[0]) {
            return [...acc, item[0]];
          } else {
            return acc;
          }
        case 'M':
          if (item[0]) {
            return item[0].length < 2 ? [...acc, '0' + item[0]] : [...acc, item[0]];
          } else {
            return [...acc, '00'];
          }
        case 'S':
          if (item[0]) {
            return item[0].length < 2 ? [...acc, '0' + item[0]] : [...acc, item[0]];
          } else {
            return [...acc, '00'];
          }
        default:
          return acc;
      }
    }, [])
    .join(':');
  return formatted;
};
