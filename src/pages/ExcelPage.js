import { Excel } from "../components/excel/excel";
import { Formula } from "../components/formula/Formula";
import { Header } from "../components/header/Header";
import { Table } from "../components/table/Table";
import { Toolbar } from "../components/toolbar/Toolbar";
import { createStore } from "../core/createStore";
import { Page } from "../core/Page";
import { debounce, storage } from "../core/utils";
import { normalizeInitialState } from "../redux/initialState";
import { rootReducer } from "../redux/rootReducer";

function storageName(param) {
    return "excel:" + param;
}

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString();

        const state = storage(storageName(params));
        const initialState = normalizeInitialState(state);
        const store = createStore(rootReducer, initialState);

        const stateListener = debounce((state) => {
            console.log("App state:", state);
            storage(storageName(params), state);
        }, 300);
        store.subscribe(stateListener);

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        });
        return this.excel.getRoot();
    }

    afterRender() {
        console.log("afterRender");
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
    }
}