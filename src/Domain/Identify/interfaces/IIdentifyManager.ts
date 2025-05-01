
export interface IIdentifyManager {
    
    activate(): void;
    deactivate(): void;
    isActive(): boolean;
    mapClick(evt: any): void;
    showPopUp(): void;
}
