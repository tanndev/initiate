const generateId = require('../lib/generateId');

class Combat {

    constructor({ id, actors } = {}) {
        /**
         * Internal storage for {@link Combat.id}.
         * @type {string}
         */
        this._id = id || generateId();

        /**
         * Internal storage for {@link Combat.actors}.
         * @type {Set<Actor>}
         * @private
         */
        this._actors = new Set(actors);
    }

    /**
     * The unique ID of the combat.
     * @return {string}
     */
    get id() { return this._id; }

    /**
     * A list of all actors involved in the combat.
     * @return {Actor[]}
     */
    get actors() { return [...this._actors.values()].sort((a, b) => a.compareInitiative(b)); }

    /**
     * Add a new actor to {@link Combat.actors}.
     * @param {Actor} actor
     */
    addActor(actor) { this._actors.add(actor); }

    /**
     * Remove an actor from {@link Combat.actors}.
     * @param {Actor} actor
     */
    removeActor(actor) { this._actors.delete(actor); }

    /**
     * Converts the instance to a native javascript object, for transmission or storage.
     * @return {object}
     */
    toJSON() {
        // Get the property descriptors for the class instance.
        const propertyDescriptors = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(this));

        // Copy the values from all getters into the result.
        const json = {};
        for (const property in propertyDescriptors) {
            const descriptor = propertyDescriptors[property];
            if (descriptor.get) json[property] = this[property];
        }
        return json;
    }
}

module.exports = Combat;
