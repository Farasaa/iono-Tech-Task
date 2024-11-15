import { Table } from '@loaders.gl/schema';
type Row = {
    [key: string]: unknown;
};
/**
 * Attempts to identify which column contains geometry
 * Currently just returns name (key) of first object-valued column
 * @todo look for hints in schema metadata
 * @todo look for WKB
 */
export declare function detectGeometryColumnIndex(table: Table): number;
/**
 * Return a row as a property (key/value) object, excluding selected columns
 */
export declare function getRowPropertyObject(table: Table, row: Row, excludeColumnIndices?: number[]): {
    [columnName: string]: unknown;
};
export {};
//# sourceMappingURL=encode-utils.d.ts.map