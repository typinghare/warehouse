export declare type Key = string | number | symbol;
export interface NamespaceInterface {
    [path: Key]: any;
}
export declare type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};
export declare class Namespace<P extends NamespaceInterface = NamespaceInterface> {
    /**
     * Entries.
     * @private
     */
    private _entries;
    /**
     * Constructor.
     * @param entries
     */
    constructor(entries?: Partial<P>);
    /**
     * Get value by a specified key.
     * @param path
     */
    get<K extends keyof P>(path: K | string): P[K] | any;
    /**
     * Set value.
     * @param path
     * @param value
     */
    set<K extends keyof P>(path: K | string, value: P[K] | any): this;
    /**
     * Delete an entry.
     * @param path
     */
    delete<K extends keyof P>(path: K | string): this;
    /**
     * Merge an object.
     * @param entries
     */
    merge(entries: Partial<P>): this;
    /**
     * Deeply merge an object.
     * @param entries
     * @param prefix
     */
    deepMerge(entries: RecursivePartial<P>, prefix?: string): this;
}
