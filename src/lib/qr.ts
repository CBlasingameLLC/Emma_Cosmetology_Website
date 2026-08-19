import QRCode from 'qrcode';

/** Generates an inline QR SVG string at build time (no client-side JS or network call). */
export async function qrSvg(url: string): Promise<string> {
  const svg = await QRCode.toString(url, {
    type: 'svg',
    margin: 0,
    color: { dark: '#000000ff', light: '#00000000' },
  });
  return svg.replace(/fill="#000000[0-9a-fA-F]{0,2}"/, 'fill="currentColor"');
}
