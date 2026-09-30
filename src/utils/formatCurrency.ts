import { CURRENCIES, CurrencyCode } from '../data/inaraData';

export function formatPrice(amountEUR: number, currency: CurrencyCode): string {
  const config = CURRENCIES[currency];
  const converted = Math.round(amountEUR * config.multiplierFromEUR);
  const formattedNumber = converted.toLocaleString('pt-PT');

  if (currency === 'EUR') {
    return `${formattedNumber} €`;
  }
  if (currency === 'AOA') {
    return `${formattedNumber} Kz`;
  }
  if (currency === 'BRL') {
    return `R$ ${formattedNumber}`;
  }
  return `${formattedNumber} MT`;
}
