const Chance = require('chance');
const generateId = require('../lib/generateId');

const chance = new Chance();

/**
 * @typedef {'Ally' | 'Enemy' | 'Neutral'} AFFILIATION
 */
const AFFILIATIONS = ['Ally', 'Enemy', 'Neutral', 'Unaffiliated'];

const INVALID_NAME_ERROR = "Actor.name must be a string.";
const INVALID_AFFILIATION_ERROR = `Actor.affiliation must be one of: ${AFFILIATIONS.join(', ')}`;
const INVALID_INITIATIVE_ERROR = "Actor.initiative must be an integer.";

class Actor {

    static randomActorList(){
        const quantity = chance.integer({min: 2, max: 8});
        return chance.n(Actor.randomActor, quantity);
    }

    static randomActor() {
        const name = Actor.randomName();
        const affiliation = Actor.randomAffiliation();
        const initiative = Actor.randomInitiative();
        return new Actor({name, affiliation, initiative});
    }

    static randomName() {
        return chance.name({nationality: 'en'})
    }

    static randomAffiliation(){
        return chance.pickone(AFFILIATIONS);
    }

    static randomInitiative(){
        return chance.integer(({min: 0, max: 25}))
    }

    constructor({ id, name = "Unnamed Actor", affiliation = 'Unaffiliated', initiative = 0} = {}) {
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
     * The initiative value rolled by or assigned to the actor.
     * Note: In the event of ties, other factors may be used to determine final initiative order.
     * @return {number}
     */
    get initiative() { return this._initiative; }

    set initiative(initiative) {
        if (!Number.isInteger(initiative)) throw new Error(INVALID_INITIATIVE_ERROR);
        this._initiative = initiative;
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
