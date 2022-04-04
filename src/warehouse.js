"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warehouse = void 0;
const namespace_1 = require("./namespace");
const constants_1 = require("./constants");
const exception_1 = require("./exception");
/**
 * D: default namespace
 */
class Warehouse {
    /**
     * Constructor.
     * @param config
     */
    constructor(config) {
        /**
         *
         * @private
         */
        this._namespaces = {};
        /**
         * The label of default namespace.
         * @private
         */
        this._defaultLabel = constants_1.DEFAULT_NAMESPACE_LABEL;
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
    createNamespace(label) {
        // validate the label
        if (!constants_1.NAMESPACE_LABEL_REGEX.exec(label)) {
            throw new exception_1.IllegalNamespaceLabelException(label);
        }
        return this._namespaces[label] = new namespace_1.Namespace();
    }
    /**
     * Get a namespace
     * @param label
     */
    getNamespace(label = this._defaultLabel) {
        if (!this._namespaces.hasOwnProperty(label)) {
            throw new exception_1.NamespaceNotFoundException(label);
        }
        return this._namespaces[label];
    }
    /**
     * Get value by specified string or path.
     * Notice that namespace will be assigned as default namespace if path is given.
     * @param string <namespace:path>
     */
    get(string) {
        string = string.toString();
        const [namespace, path] = string.includes(constants_1.NAMESPACE_PATH_SEPARATOR) ?
            string.split(constants_1.NAMESPACE_PATH_SEPARATOR) : [this._defaultLabel, string];
        return this.getNamespace(namespace).get(path);
    }
    /**
     * Set value.
     */
    set(string, value) {
        string = string.toString();
        const [namespace, path] = string.includes(constants_1.NAMESPACE_PATH_SEPARATOR) ?
            string.split(constants_1.NAMESPACE_PATH_SEPARATOR) : [this._defaultLabel, string];
        this.getNamespace(namespace).set(path, value);
        return this;
    }
    merge(entries, label) {
        label = label || this._defaultLabel;
        this.getNamespace(label).merge(entries);
        return this;
    }
    deepMerge(entries, label) {
        label = label || this._defaultLabel;
        this.getNamespace(label).deepMerge(entries);
        return this;
    }
}
exports.Warehouse = Warehouse;
