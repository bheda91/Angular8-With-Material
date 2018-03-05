import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppConfig {

    private config: Object = {};

    constructor(private http: Http) {

    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * This method:
     *   b) Loads "config.json" to get all config's variables
     */
    public load() {
        return new Promise((resolve, reject) => {
            // Generally browser ignore the text after "?", but when this request change it will ask server to get new file
            // So, after build, we need new config.json file.
            // Increase version of config, before building pop gui
            this.http.get('config.json?v1').map(res => res.json()).catch((error: any): any => {
                console.log('Configuration file could not be read');
                resolve(true);
                return Observable.throw(error || 'Server error');
            }).subscribe((configResponse) => {
                this.config = configResponse;
                resolve(true);
            });
        });
    }
}