export declare class Utf8ArrayBufferEncoder {
    private readonly chunkSize;
    private strings;
    private totalLength;
    private textEncoder;
    constructor(chunkSize: number);
    push(...strings: string[]): void;
    isFull(): boolean;
    getArrayBufferBatch(): ArrayBufferLike;
    getStringBatch(): string;
}
//# sourceMappingURL=utf8-encoder.d.ts.map