import { PATH_REGEX, PATH_SEPARATOR } from './constants';
import { IllegalPathException } from './exception';

export type Key = string | number | symbol;

export interface NamespaceInterface {
  [path: Key]: any;
}

export type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

export class Namespace<P extends NamespaceInterface = NamespaceInterface> {
  /**
   * Entries.
   * @private
   */
  private _entries: Partial<P> = {};

  /**
   * Constructor.
   * @param entries
   */
  public constructor(entries?: Partial<P>) {
    entries && this.merge(entries);
  }

  /**
   * Get value by a specified key.
   * @param path
   */
  public get<K extends keyof P>(path: K | string): P[K] | any {
    return this._entries[path];
  }

  /**
   * Set value.
   * @param path
   * @param value
   */
  public set<K extends keyof P>(path: K | string, value: P[K] | any): this {
    if (!PATH_REGEX.exec(path.toString())) {
      throw new IllegalPathException(path);
    }
    this._entries[path] = value;

    return this;
  }

  /**
   * Delete an entry.
   * @param path
   */
  public delete<K extends keyof P>(path: K | string): this {
    delete this._entries[path];

    return this;
  }

  /**
   * Merge an object.
   * @param entries
   */
  public merge(entries: Partial<P>): this {
    Object.assign(this._entries, entries);

    return this;
  }

  /**
   * Deeply merge an object.
   * @param entries
   * @param prefix
   */
  public deepMerge(entries: RecursivePartial<P>, prefix?: string): this {
    prefix = prefix ? prefix + PATH_SEPARATOR : '';
    Object.entries(entries).forEach(entry => {
      const [key, value] = entry;
      if (typeof value === 'object') {
        this.deepMerge(value, key);
      } else {
        console.log(prefix + key, value);
        this.set(prefix + key, value);
      }
    });

    return this;
  }
}