"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registry = void 0;
const exception_1 = require("./exception");
class Registry {
    /**
     * Constructor.
     * @param defaultNamespace
     */
    constructor(defaultNamespace) {
        /**
         * Stack of namespace.
         * @private
         */
        this._namespaceStack = [];
        /**
         * Keys that allowed.
         * @private
         */
        this._allowPaths = null;
        /**
         *
         * @private
         */
        this._exceptPaths = [];
        this.pushNamespace(defaultNamespace);
    }
    /**
     * Set allowed keys.
     * @param allowKeys
     */
    allowPaths(allowKeys) {
        if (this._allowPaths === null)
            this._allowPaths = [];
        this._allowPaths.push(...allowKeys);
        return this;
    }
    /**
     * Allow all keys.
     */
    allowAllPaths() {
        this._allowPaths = null;
        return this;
    }
    /**
     * Set excepted keys.
     * @param exceptKeys
     */
    exceptPaths(exceptKeys) {
        this._exceptPaths.push(...exceptKeys);
        return this;
    }
    /**
     * Push a namespace to stack.
     * @param namespace
     */
    pushNamespace(namespace) {
        this._namespaceStack.push(namespace);
    }
    /**
     * Get value.
     * @param path
     */
    get(path) {
        if (this._allowPaths && !this._allowPaths.includes(path.toString())) {
            throw new exception_1.PathNotAllowedException(path);
        }
        if (this._exceptPaths.includes(path.toString())) {
            throw new exception_1.PathExceptedException(path);
        }
        for (let i = this._namespaceStack.length - 1; i >= 0; i--) {
            const result = this._namespaceStack[i].get(path);
            if (result !== undefined)
                return result;
        }
        return undefined;
    }
}
exports.Registry = Registry;
