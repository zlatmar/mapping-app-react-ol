import PopupManagerCore from "../../Core/Popup/PopupManagerCore";

export default class SelectionManager extends PopupManagerCore {
    private static instance: SelectionManager | null = null;
    
    private constructor() {
        super();
    }

    public static getInstance() {
        if (!SelectionManager.instance) {
            SelectionManager.instance = new SelectionManager();
        }
        return SelectionManager.instance;
    }
}
