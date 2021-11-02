/**
 * Encrypt an HTML string with a given password.
 * The resulting page can be viewed and decrypted by opening the output HTML file in a browser, and entering the correct password.
 *
 * @param {string} inputHTML The HTML string to encrypt.
 * @param {string} password The password which will be used to encrypt + decrypt the content.
 * @returns A promise that will resolve with the encrypted HTML content
 */
export declare function encryptHTML(inputHTML: string, password: string): Promise<string>;
/**
 * Encrypt an HTML string with a given password and a custom prompt template.
 * The resulting page can be viewed and decrypted by opening the output HTML
 * file in a browser, and entering the correct password.
 *
 * @param {string} inputHTML The HTML string to encrypt.
 * @param {string} password The password which will be used to encrypt + decrypt the content.
 * @param {string} promptTemplate A custom prompt template based on decrypt-template.html
 * @returns A promise that will resolve with the encrypted HTML content
 */
export declare function encryptHTMLCustom(inputHTML: string, password: string, promptTemplate: string): Promise<string>;
/**
 * Generate a random password of a given length.
 *
 * @param {number} length The password length.
 * @param {string} characters The set of characters to pick from.
 * @returns A random password.
 */
export declare function generatePassword(length?: number, characters?: string): string;
