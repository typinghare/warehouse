import { Namespace, NamespaceInterface } from './namespace';
export interface WarehouseConfig {
    defaultNamespace: string;
}
/**
 * D: default namespace
 */
export declare class Warehouse<D> {
    /**
     *
     * @private
     */
    private readonly _namespaces;
    /**
     * The label of default namespace.
     * @private
     */
    private readonly _defaultLabel;
    /**
     * Constructor.
     * @param config
     */
    constructor(config?: Partial<WarehouseConfig>);
    /**
     * Create a namespace.
     * @param label
     */
    createNamespace<P extends NamespaceInterface = D>(label: string): Namespace<P>;
    /**
     * Get a namespace
     * @param label
     */
    getNamespace<P extends NamespaceInterface = D>(label?: string): Namespace<P>;
    /**
     * Get value by specified string or path.
     * Notice that namespace will be assigned as default namespace if path is given.
     * @param string <namespace:path>
     */
    get<P extends NamespaceInterface = D, K extends keyof P = string>(string: string | K): P[K] | undefined;
    /**
     * Set value.
     */
    set<P extends NamespaceInterface = D, K extends keyof P = string>(string: string | K, value: P[K]): this;
    /**
     * Merge value.
     * @param entries
     */
    merge<P extends NamespaceInterface = D>(entries: Partial<P>): this;
    merge<P extends NamespaceInterface = D>(entries: Partial<P>, label: string): this;
    /**
     * Deeply merge values.
     * @param entries
     */
    deepMerge<P extends NamespaceInterface = D>(entries: Partial<P>): this;
    deepMerge<P extends NamespaceInterface = D>(entries: Partial<P>, label: string): this;
}
