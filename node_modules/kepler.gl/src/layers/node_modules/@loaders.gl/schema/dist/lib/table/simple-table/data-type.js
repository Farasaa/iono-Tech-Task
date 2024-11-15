export function getDataTypeFromValue(value) {
  let defaultNumberType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'float32';
  if (value instanceof Date) {
    return 'date-millisecond';
  }
  if (value instanceof Number) {
    return defaultNumberType;
  }
  if (typeof value === 'string') {
    return 'utf8';
  }
  if (value === null || value === 'undefined') {
    return 'null';
  }
  return 'null';
}
export function getDataTypeFromArray(array) {
  let type = getDataTypeFromTypedArray(array);
  if (type !== 'null') {
    return {
      type,
      nullable: false
    };
  }
  if (array.length > 0) {
    type = getDataTypeFromValue(array[0]);
    return {
      type,
      nullable: true
    };
  }
  return {
    type: 'null',
    nullable: true
  };
}
export function getDataTypeFromTypedArray(array) {
  switch (array.constructor) {
    case Int8Array:
      return 'int8';
    case Uint8Array:
    case Uint8ClampedArray:
      return 'uint8';
    case Int16Array:
      return 'int16';
    case Uint16Array:
      return 'uint16';
    case Int32Array:
      return 'int32';
    case Uint32Array:
      return 'uint32';
    case Float32Array:
      return 'float32';
    case Float64Array:
      return 'float64';
    default:
      return 'null';
  }
}
export function getArrayTypeFromDataType(type, nullable) {
  if (!nullable) {
    switch (type) {
      case 'int8':
        return Int8Array;
      case 'uint8':
        return Uint8Array;
      case 'int16':
        return Int16Array;
      case 'uint16':
        return Uint16Array;
      case 'int32':
        return Int32Array;
      case 'uint32':
        return Uint32Array;
      case 'float32':
        return Float32Array;
      case 'float64':
        return Float64Array;
      default:
        break;
    }
  }
  return Array;
}
//# sourceMappingURL=data-type.js.map