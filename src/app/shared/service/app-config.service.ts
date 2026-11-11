import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppConfig {
    private http = inject(HttpClient);

    private config: Record<string, string> = {};

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: string) {
        return this.config[key];
    }

    /**
     * This method:
     *   b) Loads "config.json" to get all config's variables
     *
     * It always resolves, so the app still starts when the file cannot be read.
     */
    public async load(): Promise<boolean> {
        // Generally browser ignore the text after "?", but when this request change it will ask server to get new file
        // So, after build, we need new config.json file.
        // Increase version of config, before building pop gui
        try {
            this.config = await firstValueFrom(this.http.get<Record<string, string>>('config.json?v1'));
        } catch {
            console.log('Configuration file could not be read');
        }
        return true;
    }
}
