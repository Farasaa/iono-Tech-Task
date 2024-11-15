declare function isSupported(): boolean;
declare function isWebCamGIFSupported(): boolean;
declare function isSupported$1(): boolean;
declare function isExistingVideoGIFSupported(codecs: any): boolean;
declare function stopVideoStreaming(options: any): void;
declare function createGIF(userOptions: any, callback: any): void;
declare function takeSnapShot(userOptions: any, callback: any): void;
declare const API: {
    utils: Readonly<{
        default: any;
    }>;
    error: Readonly<{
        default: {
            validate: (skipObj: any) => {};
            isValid: (skipObj: any) => boolean;
            validators: {
                condition: any;
                errorCode: string;
                errorMsg: string;
            }[];
            messages: {
                videoCodecs: {
                    errorCode: string;
                    errorMsg: string;
                };
            };
        };
    }>;
    defaultOptions: Readonly<{
        default: {
            sampleInterval: number;
            numWorkers: number;
            filter: string;
            gifWidth: number;
            gifHeight: number;
            interval: number;
            numFrames: number;
            frameDuration: number;
            keepCameraOn: boolean;
            images: never[];
            video: null;
            webcamVideoElement: null;
            cameraStream: null;
            text: string;
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
            progressCallback: () => void;
            completeCallback: () => void;
            saveRenderingContexts: boolean;
            savedRenderingContexts: never[];
            crossOrigin: string;
        };
    }>;
    createGIF: typeof createGIF;
    takeSnapShot: typeof takeSnapShot;
    stopVideoStreaming: typeof stopVideoStreaming;
    isSupported: typeof isSupported;
    isWebCamGIFSupported: typeof isWebCamGIFSupported;
    isExistingVideoGIFSupported: typeof isExistingVideoGIFSupported;
    isExistingImagesGIFSupported: typeof isSupported$1;
    VERSION: string;
};
export default API;
//# sourceMappingURL=gifshot.d.ts.map