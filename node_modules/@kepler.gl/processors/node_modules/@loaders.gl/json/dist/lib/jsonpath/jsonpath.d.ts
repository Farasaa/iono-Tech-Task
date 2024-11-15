/**
 * A parser for a minimal subset of the jsonpath standard
 * Full JSON path parsers for JS exist but are quite large (bundle size)
 *
 * Supports
 *
 *   `$.component.component.component`
 */
export default class JSONPath {
    path: string[];
    constructor(path?: JSONPath | string[] | string | null);
    clone(): JSONPath;
    toString(): string;
    push(name: string): void;
    pop(): string | undefined;
    set(name: string): void;
    equals(other: JSONPath): boolean;
    /**
     * Sets the value pointed at by path
     * TODO - handle root path
     * @param object
     * @param value
     */
    setFieldAtPath(object: any, value: any): void;
    /**
     * Gets the value pointed at by path
     * TODO - handle root path
     * @param object
     */
    getFieldAtPath(object: any): any;
}
//# sourceMappingURL=jsonpath.d.ts.map