"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Namespace = void 0;
const constants_1 = require("./constants");
const exception_1 = require("./exception");
class Namespace {
    /**
     * Constructor.
     * @param entries
     */
    constructor(entries) {
        /**
         * Entries.
         * @private
         */
        this._entries = {};
        entries && this.merge(entries);
    }
    /**
     * Get value by a specified key.
     * @param path
     */
    get(path) {
        return this._entries[path];
    }
    /**
     * Set value.
     * @param path
     * @param value
     */
    set(path, value) {
        if (!constants_1.PATH_REGEX.exec(path.toString())) {
            throw new exception_1.IllegalPathException(path);
        }
        this._entries[path] = value;
        return this;
    }
    /**
     * Delete an entry.
     * @param path
     */
    delete(path) {
        delete this._entries[path];
        return this;
    }
    /**
     * Merge an object.
     * @param entries
     */
    merge(entries) {
        Object.assign(this._entries, entries);
        return this;
    }
    /**
     * Deeply merge an object.
     * @param entries
     * @param prefix
     */
    deepMerge(entries, prefix) {
        prefix = prefix ? prefix + constants_1.PATH_SEPARATOR : '';
        Object.entries(entries).forEach(entry => {
            const [key, value] = entry;
            if (typeof value === 'object') {
                this.deepMerge(value, key);
            }
            else {
                console.log(prefix + key, value);
                this.set(prefix + key, value);
            }
        });
        return this;
    }
}
exports.Namespace = Namespace;
