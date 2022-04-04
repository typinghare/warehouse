import { Key, Namespace, NamespaceInterface } from './namespace';
import { PathExceptedException, PathNotAllowedException } from './exception';

export class Registry {
  /**
   * Stack of namespace.
   * @private
   */
  private readonly _namespaceStack: Namespace[] = [];

  /**
   * Keys that allowed.
   * @private
   */
  private _allowPaths: Key[] | null = null;

  /**
   *
   * @private
   */
  private readonly _exceptPaths: Key[] = [];

  /**
   * Constructor.
   * @param defaultNamespace
   */
  public constructor(defaultNamespace: Namespace) {
    this.pushNamespace(defaultNamespace);
  }

  /**
   * Set allowed keys.
   * @param allowKeys
   */
  public allowPaths(allowKeys: string[]): this {
    if (this._allowPaths === null) this._allowPaths = [];
    this._allowPaths.push(...allowKeys);

    return this;
  }

  /**
   * Allow all keys.
   */
  public allowAllPaths(): this {
    this._allowPaths = null;
    return this;
  }

  /**
   * Set excepted keys.
   * @param exceptKeys
   */
  public exceptPaths(exceptKeys: string[]): this {
    this._exceptPaths.push(...exceptKeys);

    return this;
  }

  /**
   * Push a namespace to stack.
   * @param namespace
   */
  public pushNamespace(namespace: Namespace) {
    this._namespaceStack.push(namespace);
  }

  /**
   * Get value.
   * @param path
   */
  public get<P extends NamespaceInterface, K extends keyof P>(path: K): P[K] | undefined {
    if (this._allowPaths && !this._allowPaths.includes(path.toString())) {
      throw new PathNotAllowedException(path);
    }

    if (this._exceptPaths.includes(path.toString())) {
      throw new PathExceptedException(path);
    }

    for (let i = this._namespaceStack.length - 1; i >= 0; i--) {
      const result = this._namespaceStack[i].get(path);
      if (result !== undefined) return result;
    }

    return undefined;
  }
}