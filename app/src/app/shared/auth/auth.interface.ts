/**
 * Authentication tokens.
 */
export interface Tokens {
    /**
     * Access token.
     */
    access_token: string;

    /**
     * Token for refreshing the access token.
     */
    refresh_token: string;
}

/**
 * User's credentials.
 */
export interface Credentials {
    /**
     * The name.
     */
    name: string;

    /**
     * The password.
     */
    password: string;
}