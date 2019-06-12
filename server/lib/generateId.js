/*
 * The function in this module uses the underlying generator of Nano ID (https://github.com/ai/nanoid) to generate a
 * pseudo-unique id. The quality of this ID (and the chance of a collision) is determined by the ALPHABET and LENGTH
 * constants defined below.
 *
 * Use Nano ID's collision calculator (https://zelark.github.io/nano-id-cc/) to tune these values.
 */

const generate = require('nanoid/generate');

/**
 * The characters to use in the ID.
 * This selection is taken from nanoid-dictionary.nolookalikes.
 * @see https://github.com/CyberAP/nanoid-dictionary
 * @type {string}
 */
const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstwxyz';

/**
 * The number of characters to use for the ID.
 * @type {number}
 */
const LENGTH = 8;

/**
 * Create a new pseudo-unique ID.
 *
 * @return {string} A (probably) unique id.
 */
module.exports = () => generate(ALPHABET, LENGTH);
