const generateRandomTwoDigitNumber = () => {
  return Math.floor(Math.random() * 100); // Generates a random number between 0 and 99
};

export const generateTicketNumber = (fromStation: string, toStation: string) => {
  const currentYear = new Date().getFullYear();
  const randomTwoDigitNumber = generateRandomTwoDigitNumber();
  return `${fromStation.toUpperCase().replace(/\s/g, '')}-${toStation.toUpperCase()}-${currentYear}-${randomTwoDigitNumber}`;
};