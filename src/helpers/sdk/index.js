import AppSdk from './sdk.js';

export default class AppSdkFactory {

    constructor(client) {
        this._client = client;
        this._sdks = [];

        this._sdks.push(new AppSdk(client).getMethods());
    }

    buildSdk(version) {
        let result = {};

        this._sdks.forEach((sdk) => {
            if (sdk.version <= version) {
                Object.keys(sdk).forEach((key) => {
                    result[key] = sdk[key];
                })
            }
        });

        return result;
    }
}
