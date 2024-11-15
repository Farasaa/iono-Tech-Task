import * as utils from './utils';
const structure = {
  fileName: 100,
  fileMode: 8,
  uid: 8,
  gid: 8,
  fileSize: 12,
  mtime: 12,
  checksum: 8,
  type: 1,
  linkName: 100,
  ustar: 8,
  owner: 32,
  group: 32,
  majorNumber: 8,
  minorNumber: 8,
  filenamePrefix: 155,
  padding: 12
};
export function format(data, cb) {
  const buffer = utils.clean(512);
  let offset = 0;
  Object.entries(structure).forEach(_ref => {
    let [field, length] = _ref;
    const str = data[field] || '';
    let i;
    let fieldLength;
    for (i = 0, fieldLength = str.length; i < fieldLength; i += 1) {
      buffer[offset] = str.charCodeAt(i);
      offset += 1;
    }
    offset += length - i;
  });
  if (typeof cb === 'function') {
    return cb(buffer, offset);
  }
  return buffer;
}
//# sourceMappingURL=header.js.map