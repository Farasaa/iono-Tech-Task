export function clean(length) {
  let i;
  const buffer = new Uint8Array(length);
  for (i = 0; i < length; i += 1) {
    buffer[i] = 0;
  }
  return buffer;
}
export function pad(num, bytes, base) {
  const numStr = num.toString(base || 8);
  return '000000000000'.substr(numStr.length + 12 - bytes) + numStr;
}
export function stringToUint8(input, out, offset) {
  let i;
  let length;
  out = out || clean(input.length);
  offset = offset || 0;
  for (i = 0, length = input.length; i < length; i += 1) {
    out[offset] = input.charCodeAt(i);
    offset += 1;
  }
  return out;
}
//# sourceMappingURL=utils.js.map