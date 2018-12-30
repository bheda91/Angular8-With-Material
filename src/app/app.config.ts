import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AppConfig {

    private config: Object = {};

    constructor(private http: HttpClient) {

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
            this.http.get('config.json?v1').subscribe(
                (data: any) => {
                    this.config = data;
                    resolve(true);
                },
                error => {
                    console.log('Configuration file could not be read');
                    resolve(true);
                    return throwError(error || 'Server error');
                });
        });
    }
}