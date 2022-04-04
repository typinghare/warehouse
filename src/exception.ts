import { Key } from './namespace';

export class Exception extends Error {
}

export class IllegalNamespaceLabelException extends Exception {
  constructor(label: string) {
    super(`Illegal namespace label: [ ${label} ].`);
  }
}

export class NamespaceNotFoundException extends Exception {
  constructor(label: string) {
    super(`Namespace not found: [ ${label} ].`);
  }
}

export class IllegalPathException extends Exception {
  constructor(path: Key) {
    super(`Illegal path: [ ${path.toString()} ].`);
  }
}

export class PathNotAllowedException extends Exception {
  constructor(path: Key) {
    super(`Path is not allowed: [ ${path.toString()} ].`);
  }
}

export class PathExceptedException extends Exception {
  constructor(path: Key) {
    super(`Path is excepted: [ ${path.toString()} ].`);
  }
}