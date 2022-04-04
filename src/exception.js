"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathExceptedException = exports.PathNotAllowedException = exports.IllegalPathException = exports.NamespaceNotFoundException = exports.IllegalNamespaceLabelException = exports.Exception = void 0;
class Exception extends Error {
}
exports.Exception = Exception;
class IllegalNamespaceLabelException extends Exception {
    constructor(label) {
        super(`Illegal namespace label: [ ${label} ].`);
    }
}
exports.IllegalNamespaceLabelException = IllegalNamespaceLabelException;
class NamespaceNotFoundException extends Exception {
    constructor(label) {
        super(`Namespace not found: [ ${label} ].`);
    }
}
exports.NamespaceNotFoundException = NamespaceNotFoundException;
class IllegalPathException extends Exception {
    constructor(path) {
        super(`Illegal path: [ ${path.toString()} ].`);
    }
}
exports.IllegalPathException = IllegalPathException;
class PathNotAllowedException extends Exception {
    constructor(path) {
        super(`Path is not allowed: [ ${path.toString()} ].`);
    }
}
exports.PathNotAllowedException = PathNotAllowedException;
class PathExceptedException extends Exception {
    constructor(path) {
        super(`Path is excepted: [ ${path.toString()} ].`);
    }
}
exports.PathExceptedException = PathExceptedException;
