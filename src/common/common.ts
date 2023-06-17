export function shortenHashOrAddress(hash: string, len = 15, lenRight = 16) {
  if (!hash) return '';
  return `${hash.slice(0, len)}...${hash.slice(hash.length - lenRight)}`;
}
