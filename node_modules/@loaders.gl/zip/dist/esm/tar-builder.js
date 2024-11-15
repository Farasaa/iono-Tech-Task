import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import Tar from './lib/tar/tar';
const TAR_BUILDER_OPTIONS = {
  recordsPerBlock: 20
};
export default class TARBuilder {
  static get properties() {
    return {
      id: 'tar',
      name: 'TAR',
      extensions: ['tar'],
      mimeTypes: ['application/x-tar'],
      builder: TARBuilder,
      options: TAR_BUILDER_OPTIONS
    };
  }
  constructor(options) {
    _defineProperty(this, "options", void 0);
    _defineProperty(this, "tape", void 0);
    _defineProperty(this, "count", 0);
    this.options = {
      ...TAR_BUILDER_OPTIONS,
      ...options
    };
    this.tape = new Tar(this.options.recordsPerBlock);
  }
  addFile(filename, buffer) {
    this.tape.append(filename, new Uint8Array(buffer));
    this.count++;
  }
  async build() {
    return new Response(this.tape.save()).arrayBuffer();
  }
}
//# sourceMappingURL=tar-builder.js.map