import { loadLibrary } from '@loaders.gl/worker-utils';
let loadGifshotPromise;
export async function loadGifshotModule() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const modules = options.modules || {};
  if (modules.gifshot) {
    return modules.gifshot;
  }
  loadGifshotPromise = loadGifshotPromise || loadGifshot(options);
  return await loadGifshotPromise;
}
async function loadGifshot(options) {
  options.libraryPath = options.libraryPath || 'libs/';
  const gifshot = await loadLibrary('gifshot.js', 'gifshot', options);
  return gifshot || globalThis.gifshot;
}
//# sourceMappingURL=gifshot-loader.js.map