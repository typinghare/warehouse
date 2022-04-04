import { Namespace, NamespaceInterface } from './namespace';
import { DEFAULT_NAMESPACE_LABEL, NAMESPACE_LABEL_REGEX, NAMESPACE_PATH_SEPARATOR } from './constants';
import { IllegalNamespaceLabelException, NamespaceNotFoundException } from './exception';

export interface WarehouseConfig {
  defaultNamespace: string;
}

/**
 * D: default namespace
 */
export class Warehouse<D> {
  /**
   *
   * @private
   */
  private readonly _namespaces: { [label: string]: Namespace<any> } = {};

  /**
   * The label of default namespace.
   * @private
   */
  private readonly _defaultLabel: string = DEFAULT_NAMESPACE_LABEL;

  /**
   * Constructor.
   * @param config
   */
  public constructor(config?: Partial<WarehouseConfig>) {
    if (config) {
      if (config.defaultNamespace) {
        this._defaultLabel = config.defaultNamespace;
      }
    }

    this.createNamespace(this._defaultLabel);
  }

  /**
   * Create a namespace.
   * @param label
   */
  public createNamespace<P extends NamespaceInterface = D>(label: string): Namespace<P> {
    // validate the label
    if (!NAMESPACE_LABEL_REGEX.exec(label)) {
      throw new IllegalNamespaceLabelException(label);
    }

    return this._namespaces[label] = new Namespace<P>();
  }

  /**
   * Get a namespace
   * @param label
   */
  public getNamespace<P extends NamespaceInterface = D>(label: string = this._defaultLabel): Namespace<P> {
    if (!this._namespaces.hasOwnProperty(label)) {
      throw new NamespaceNotFoundException(label);
    }

    return this._namespaces[label];
  }

  /**
   * Get value by specified string or path.
   * Notice that namespace will be assigned as default namespace if path is given.
   * @param string <namespace:path>
   */
  public get<P extends NamespaceInterface = D, K extends keyof P = string>(
    string: string | K
  ): P[K] | undefined {
    string = string.toString();
    const [namespace, path] = string.includes(NAMESPACE_PATH_SEPARATOR) ?
      string.split(NAMESPACE_PATH_SEPARATOR) : [this._defaultLabel, string];

    return this.getNamespace<P>(namespace).get(<K>path);
  }

  /**
   * Set value.
   */
  public set<P extends NamespaceInterface = D, K extends keyof P = string>(
    string: string | K, value: P[K]
  ): this {
    string = string.toString();
    const [namespace, path] = string.includes(NAMESPACE_PATH_SEPARATOR) ?
      string.split(NAMESPACE_PATH_SEPARATOR) : [this._defaultLabel, string];

    this.getNamespace<P>(namespace).set(<K>path, value);

    return this;
  }

  /**
   * Merge value.
   * @param entries
   */
  public merge<P extends NamespaceInterface = D>(entries: Partial<P>): this;
  public merge<P extends NamespaceInterface = D>(entries: Partial<P>, label: string): this;
  public merge<P extends NamespaceInterface = D>(entries: Partial<P>, label ?: string): this {
    label = label || this._defaultLabel;
    this.getNamespace<P>(label).merge(entries);

    return this;
  }

  /**
   * Deeply merge values.
   * @param entries
   */
  public deepMerge<P extends NamespaceInterface = D>(entries: Partial<P>): this;
  public deepMerge<P extends NamespaceInterface = D>(entries: Partial<P>, label: string): this;
  public deepMerge<P extends NamespaceInterface = D>(entries: Partial<P>, label ?: string): this {
    label = label || this._defaultLabel;
    this.getNamespace<P>(label).deepMerge(entries);

    return this;
  }
}
