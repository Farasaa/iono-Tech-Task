import JSZip from 'jszip';
export const ZipWriter = {
  name: 'Zip Archive',
  extensions: ['zip'],
  category: 'archive',
  mimeTypes: ['application/zip'],
  encode: encodeZipAsync
};
async function encodeZipAsync(fileMap) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const jsZip = new JSZip();
  for (const subFileName in fileMap) {
    const subFileData = fileMap[subFileName];
    jsZip.file(subFileName, subFileData, options);
  }
  options = Object.assign({}, options, {
    type: 'arraybuffer'
  });
  const {
    onUpdate = () => {}
  } = options;
  return jsZip.generateAsync(options, onUpdate).catch(error => {
    options.log.error("Unable to write zip archive: ".concat(error));
    throw error;
  });
}
//# sourceMappingURL=zip-writer.js.map