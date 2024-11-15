/**
 * Parses a data URI into a buffer, as well as retrieving its declared MIME type.
 *
 * @param {string} uri - a data URI (assumed to be valid)
 * @returns {Object} { buffer, mimeType }
 */
export declare function decodeDataUri(uri: string): {
    arrayBuffer: ArrayBuffer;
    mimeType: string;
};
/**
 * @param data
 * @todo Duplicate of core
 */
export declare function toArrayBuffer(data: unknown): ArrayBuffer;
//# sourceMappingURL=decode-data-uri.node.d.ts.map