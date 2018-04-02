import superagent from 'superagent';
import config from '../config';

const TIMEOUT = 10000;
const methods = ['get', 'post', 'put', 'patch', 'del'];

var Promise = require('es6-promise').Promise;

class ApiClient {
    constructor() {
        methods.forEach((method) => {
            this[method] = (path, options) => {
                return new Promise((resolve, reject) => {
                    const request = superagent[method](this.formatUrl(path));
                    request.timeout(TIMEOUT);

                    if (options) {
                        if (options.params) {
                            request.query(options.params);
                        }
                        if (options.data) {
                            request.send(options.data);
                        }
                    }

                    request.end((err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(res.body || JSON.parse(res.text));
                        }
                    });
                });
            }
        });
    }

    formatUrl(path) {
        let adjustedPath = (path[0] !== '/') ? '/' + path : path;

        return 'http://'+ config.apiHost + config.apiVersion + adjustedPath;
    }
}

export default ApiClient;
