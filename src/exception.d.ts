import { Key } from './namespace';
export declare class Exception extends Error {
}
export declare class IllegalNamespaceLabelException extends Exception {
    constructor(label: string);
}
export declare class NamespaceNotFoundException extends Exception {
    constructor(label: string);
}
export declare class IllegalPathException extends Exception {
    constructor(path: Key);
}
export declare class PathNotAllowedException extends Exception {
    constructor(path: Key);
}
export declare class PathExceptedException extends Exception {
    constructor(path: Key);
}
