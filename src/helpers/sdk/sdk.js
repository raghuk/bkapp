
const username = 'a339d57a483e9a4dc1d831bd5e7e649d';
const password = '74beaadf06189d379a2b4b89672a6903';


export default class AppSdk {

    constructor(client) {
        this._client = client;
    }

    getMethods() {
        let result = {};
        result.version = 1;

        ['get', 'post', 'put', 'patch', 'del'].forEach((method) => {
            result[method] = (path, options = {}) => {
                console.warn("deprecated api call: ", method, path, options);
                return this._client[method](path, options);
            }
        });

        result.getLocations = () => this._client.get(`/locations`).auth(username, password, {type: 'auto'});
        result.getUpdatedLocations = (date) => this._client.get(`/locations?updated=${date}`);

        return result;
    }
}
