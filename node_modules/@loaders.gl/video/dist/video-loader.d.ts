import type { LoaderWithParser, LoaderOptions } from '@loaders.gl/loader-utils';
import parseVideo from './lib/parsers/parse-video';
export type VideoLoaderOptions = LoaderOptions & {
    video: {};
};
export declare const VideoLoader: {
    name: string;
    id: string;
    module: string;
    version: any;
    extensions: string[];
    mimeTypes: string[];
    parse: typeof parseVideo;
    options: VideoLoaderOptions;
};
export declare const _typecheckVideoLoader: LoaderWithParser;
//# sourceMappingURL=video-loader.d.ts.map