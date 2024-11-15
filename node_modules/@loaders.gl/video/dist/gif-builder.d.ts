export default class GIFBuilder {
    static get properties(): {
        id: string;
        name: string;
        extensions: string[];
        mimeTypes: string[];
        builder: typeof GIFBuilder;
        options: {
            source: string;
            width: number;
            height: number;
            crossOrigin: string;
            progressCallback: (captureProgress: any) => void;
            completeCallback: () => void;
            numWorkers: number;
            sampleInterval: number;
            interval: number;
            offset: null;
            numFrames: number;
            frameDuration: number;
            filter: string;
            waterMark: null;
            waterMarkHeight: null;
            waterMarkWidth: null;
            waterMarkXCoordinate: number;
            waterMarkYCoordinate: number;
            text: string;
            showFrameText: boolean;
            fontWeight: string;
            fontSize: string;
            minFontSize: string;
            resizeFont: boolean;
            fontFamily: string;
            fontColor: string;
            textAlign: string;
            textBaseline: string;
            textXCoordinate: null;
            textYCoordinate: null;
            webcamVideoElement: null;
            keepCameraOn: boolean;
            cameraStream: null;
            saveRenderingContexts: boolean;
            savedRenderingContexts: never[];
        };
    };
    constructor(options: any);
    initialize(options: any): Promise<void>;
    add(file: any): void;
    build(): Promise<string>;
    _createGIF(): Promise<string>;
    _cleanOptions(options: any): void;
}
//# sourceMappingURL=gif-builder.d.ts.map