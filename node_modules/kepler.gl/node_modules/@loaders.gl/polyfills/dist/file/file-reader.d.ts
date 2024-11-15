export declare class FileReaderPolyfill implements FileReader {
    onload: any;
    onabort: any;
    onerror: any;
    error: any;
    onloadstart: any;
    onloadend: any;
    onprogress: any;
    readyState: any;
    result: any;
    DONE: any;
    EMPTY: any;
    LOADING: any;
    addEventListener: any;
    removeEventListener: any;
    dispatchEvent: any;
    constructor();
    abort(): void;
    readAsArrayBuffer(blob: Blob): Promise<void>;
    readAsBinaryString(blob: any): Promise<void>;
    readAsDataURL(blob: any): Promise<void>;
    readAsText(blob: any): Promise<void>;
}
//# sourceMappingURL=file-reader.d.ts.map