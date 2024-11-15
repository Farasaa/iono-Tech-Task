/**
 * Forked from @gozala's web-blob under MIT license
 * @see https://github.com/Gozala/web-blob
 */
export declare class BlobStreamController {
    private chunks;
    private isWorking;
    private isCancelled;
    /**
     * @param chunks
     */
    constructor(chunks: Iterator<Uint8Array>);
    /**
     * @param controller
     */
    start(controller: ReadableStreamDefaultController): void;
    /**
     *
     * @param controller
     */
    work(controller: ReadableStreamDefaultController): Promise<void>;
    /**
     *
     * @param {ReadableStreamDefaultController} controller
     */
    pull(controller: any): void;
    cancel(): void;
}
//# sourceMappingURL=blob-stream-controller.d.ts.map