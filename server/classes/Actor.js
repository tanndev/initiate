const Chance = require('chance');
const generateId = require('../lib/generateId');

const chance = new Chance();

/**
 * @typedef {'Ally' | 'Enemy' | 'Neutral'} AFFILIATION
 */
const AFFILIATIONS = ['Ally', 'Enemy', 'Neutral'];

const INVALID_NAME_ERROR = "Actor.name must be a string.";
const INVALID_AFFILIATION_ERROR = `Actor.affiliation must be one of: ${AFFILIATIONS.join(', ')}`;
const INVALID_INITIATIVE_ERROR = "Actor.initiative must be an integer.";

class Actor {

    static randomActorList() {
        const requiredActors = [
            Actor.randomActor({ affiliation: 'Ally' }),
            Actor.randomActor({ affiliation: 'Enemy' })
        ];
        const additionalQuantity = chance.integer({ min: 0, max: 10 });
        const additionalActors = chance.n(Actor.randomActor, additionalQuantity);
        return requiredActors.concat(additionalActors);
    }

    static randomActor(options = {}) {
        const name = options.name || Actor.randomName();
        const affiliation = options.affiliation || Actor.randomAffiliation();
        const initiative = options.initiative || Actor.randomInitiative();
        return new Actor({ name, affiliation, initiative });
    }

    static randomName() {
        return chance.name({ nationality: 'en' });
    }

    static randomAffiliation() {
        return chance.pickone(AFFILIATIONS);
    }

    static randomInitiative() {
        return chance.integer(({ min: 0, max: 25 }));
    }

    constructor({ id, name = "Unnamed Actor", affiliation = 'Neutral', initiative = 0 } = {}) {
        /**
         * Internal storage for {@link Actor.id}.
         * @type {string}
         * @private
         */
        this._id = id || generateId();

        this.name = name;
        this.affiliation = affiliation;
        this.initiative = initiative;
    }

    /**
     * Unique ID of the actor.
     * @return {string}
     */
    get id() { return this._id; }

    /**
     * Name of the actor, suitable for display.
     * @return {string}
     */
    get name() { return this._name; };

    set name(name) {
        if (typeof name !== 'string') throw new Error(INVALID_NAME_ERROR);

        /**
         * Internal value for {@link Actor.name}.
         * @type {string}
         * @private
         */
        this._name = name;
    }

    /**
     * Who the actor fights for.
     * @return {AFFILIATION}
     */
    get affiliation() { return this._affiliation; }

    set affiliation(affiliation) {
        if (!AFFILIATIONS.includes(affiliation)) throw new Error(INVALID_AFFILIATION_ERROR);

        /**
         * Internal value for {@link Actor.affiliation}.
         * @type {AFFILIATION}
         * @private
         */
        this._affiliation = affiliation;
    }

    /**
     * The initiative value rolled the actor.
     * Note: This, along with other factors, is initially used to determine initiative order.
     * However, actual placement in combat may vary.
     * @return {number}
     */
    get initiative() { return this._initiative; }

    set initiative(initiative) {
        if (!Number.isInteger(initiative)) throw new Error(INVALID_INITIATIVE_ERROR);
        this._initiative = initiative;
    }

    /**
     * Compares this actor to another actor and returns an integer to place them in sorted
     * initiative order.
     * @param {Actor} other
     */
    compareInitiative(other) {
        // First, try comparing the initiative values. (Descending)
        const initiativeDifference = other.initiative - this.initiative;
        if (initiativeDifference !== 0) return initiativeDifference;

        // If the initiatives are the same, try comparing by affiliation.
        if (this.affiliation !== other.affiliation) {
            // Allies go first.
            if (this.affiliation === 'Ally') return -1;
            if (other.affiliation === 'Ally') return 1;

            // Then enemies.
            return this.affiliation === 'Enemy' ? -1 : 1;
        }

        // If the affiliations are the same, compare by id for a random but consistent result.
        return this.id.localeCompare(other.id);
    }

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

module.exports = Actor;
