import { Namespace, NamespaceInterface } from './namespace';
export declare class Registry {
    /**
     * Stack of namespace.
     * @private
     */
    private readonly _namespaceStack;
    /**
     * Keys that allowed.
     * @private
     */
    private _allowPaths;
    /**
     *
     * @private
     */
    private readonly _exceptPaths;
    /**
     * Constructor.
     * @param defaultNamespace
     */
    constructor(defaultNamespace: Namespace);
    /**
     * Set allowed keys.
     * @param allowKeys
     */
    allowPaths(allowKeys: string[]): this;
    /**
     * Allow all keys.
     */
    allowAllPaths(): this;
    /**
     * Set excepted keys.
     * @param exceptKeys
     */
    exceptPaths(exceptKeys: string[]): this;
    /**
     * Push a namespace to stack.
     * @param namespace
     */
    pushNamespace(namespace: Namespace): void;
    /**
     * Get value.
     * @param path
     */
    get<P extends NamespaceInterface, K extends keyof P>(path: K): P[K] | undefined;
}
