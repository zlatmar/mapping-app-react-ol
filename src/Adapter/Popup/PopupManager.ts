import PopupManagerCore from "../../Core/Popup/PopupManagerCore";

export default class PopupManager extends PopupManagerCore {
    private static instance: PopupManager | null = null;
    
    private constructor() {
        super();
    }

    public static getInstance() {
        if (!PopupManager.instance) {
            PopupManager.instance = new PopupManager();
        }
        return PopupManager.instance;
    }
}