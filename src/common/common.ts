export function shortenHashOrAddress(hash: string, len = 11, lenRight = 12) {
  if (!hash) return '';
  return `${hash.slice(0, len)}...${hash.slice(hash.length - lenRight)}`;
}
