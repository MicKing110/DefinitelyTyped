// Type definitions for passport-oauth2 1.4
// Project: https://github.com/jaredhanson/passport-oauth2#readme
// Definitions by: Pasi Eronen <https://github.com/pasieronen>
//                 Wang Zishi <https://github.com/WangZishi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

import { Request } from 'express';
import { Strategy } from 'passport';
import { OAuth2 } from 'oauth';

declare class OAuth2Strategy extends Strategy {
    name: string;

    /**
     *   NOTE: The _oauth2 property is considered "protected".  Subclasses are
     *         allowed to use it when making protected resource requests to retrieve
     *         the user profile.
     */
    protected _oauth2: OAuth2;

    constructor(options: OAuth2Strategy.StrategyOptions, verify: OAuth2Strategy.VerifyFunction);
    constructor(options: OAuth2Strategy.StrategyOptionsWithRequest, verify: OAuth2Strategy.VerifyFunctionWithRequest);

    authenticate(req: Request, options?: any): void;

    userProfile(accessToken: string, done: (err?: Error | null, profile?: any) => void): void;
    authorizationParams(options: any): object;
    tokenParams(options: any): object;
    parseErrorResponse(body: any, status: number): Error | null;
}

declare namespace OAuth2Strategy {
    type VerifyCallback = (err?: Error | null, user?: object, info?: object) => void;

    type VerifyFunction =
        ((accessToken: string, refreshToken: string, profile: any, verified: VerifyCallback) => void) |
        ((accessToken: string, refreshToken: string, results: any, profile: any, verified: VerifyCallback) => void);
    type VerifyFunctionWithRequest =
        ((req: Request, accessToken: string, refreshToken: string, profile: any, verified: VerifyCallback) => void) |
        ((req: Request, accessToken: string, refreshToken: string, results: any, profile: any, verified: VerifyCallback) => void);

    interface _StrategyOptionsBase {
        authorizationURL: string;
        tokenURL: string;
        clientID: string;
        clientSecret: string;
        callbackURL?: string;
    }
    interface StrategyOptions extends _StrategyOptionsBase {
        passReqToCallback?: false;
    }
    interface StrategyOptionsWithRequest extends _StrategyOptionsBase {
        passReqToCallback: true;
    }

    type Strategy = OAuth2Strategy;
    const Strategy: typeof OAuth2Strategy;

    class TokenError extends Error {
        constructor(message: string | undefined, code: string, uri?: string, status?: number);
        code: string;
        uri?: string;
        status: number;
    }

    class AuthorizationError extends Error {
        constructor(message: string | undefined, code: string, uri?: string, status?: number);
        code: string;
        uri?: string;
        status: number;
    }

    class InternalOAuthError extends Error {
        constructor(message: string, err: any);
        oauthError: any;
    }
}

export = OAuth2Strategy;
