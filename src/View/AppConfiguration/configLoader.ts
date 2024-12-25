import { AppConfig} from "./AppConfigTypes";

let appConfig = {} as AppConfig;

const getAppConfig = (configUrl: string): Promise<AppConfig> => {
    return new Promise (async (resolve, reject) => {
        try {
            const config = await fetch(configUrl);
            const json = await config.json();
            appConfig = json;
            resolve(appConfig);
        } catch (error) {
            console.error('Error loading configuration file:', error);
            reject(error);
        }
    })
}

export { appConfig, getAppConfig }
