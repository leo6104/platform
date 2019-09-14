import { __decorate } from 'tslib';
import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { Injectable, NgModule } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

let MockDevToolsExtension = class MockDevToolsExtension extends DevToolsExtension {
};
MockDevToolsExtension = __decorate([
    Injectable()
], MockDevToolsExtension);

/** @hidden */
class MockObservableStore {
    constructor() {
        this.selections = {};
        this.subStores = {};
        this.getSelectorStub = (selector, comparator) => this.initSelectorStub(selector, comparator).subject;
        this.reset = () => {
            Object.keys(this.subStores).forEach(k => this.subStores[k].reset());
            this.selections = {};
            this.subStores = {};
        };
        this.dispatch = action => action;
        this.replaceReducer = () => null;
        this.getState = () => ({});
        this.subscribe = () => () => null;
        this.select = (selector, comparator) => {
            const stub = this.initSelectorStub(selector, comparator);
            return stub.comparator
                ? stub.subject.pipe(distinctUntilChanged(stub.comparator))
                : stub.subject;
        };
        this.configureSubStore = (basePath, _) => this.initSubStore(basePath);
        this.getSubStore = (...pathSelectors) => {
            const [first, ...rest] = pathSelectors;
            return (first
                ? this.initSubStore(first).getSubStore(...rest)
                : this);
        };
    }
    initSubStore(basePath) {
        const result = this.subStores[JSON.stringify(basePath)] ||
            new MockObservableStore();
        this.subStores[JSON.stringify(basePath)] = result;
        return result;
    }
    initSelectorStub(selector, comparator) {
        const key = selector ? selector.toString() : '';
        const record = this.selections[key] || {
            subject: new ReplaySubject(),
            comparator,
        };
        this.selections[key] = record;
        return record;
    }
}

// TODO: See if this linting rule can be enabled with new build process (ng-packagr)
/**
 * Convenience mock to make it easier to control selector
 * behaviour in unit tests.
 */
class MockNgRedux extends NgRedux {
    /** @hidden */
    constructor() {
        super();
        //
        this.mockRootStore = new MockObservableStore();
        this.configureSubStore = this.mockRootStore.configureSubStore;
        this.dispatch = this.mockRootStore.dispatch;
        this.getState = this.mockRootStore.getState;
        this.subscribe = this.mockRootStore.subscribe;
        this.replaceReducer = this.mockRootStore.replaceReducer;
        this.select = this.mockRootStore.select;
        this.provideStore = (_) => undefined;
        this.configureStore = (_, __, ___, ____) => undefined;
        // This hooks the mock up to @select.
        NgRedux.instance = this;
    }
    /**
     * Returns a subject that's connected to any observable returned by the
     * given selector. You can use this subject to pump values into your
     * components or services under test; when they call .select or @select
     * in the context of a unit test, MockNgRedux will give them the values
     * you pushed onto your stub.
     */
    static getSelectorStub(selector, comparator) {
        return MockNgRedux.getInstance().mockRootStore.getSelectorStub(selector, comparator);
    }
    /**
     * Returns a mock substore that allows you to set up selectorStubs for
     * any 'fractal' stores your app creates with NgRedux.configureSubStore.
     *
     * If your app creates deeply nested substores from other substores,
     * pass the chain of pathSelectors in as ordered arguments to mock
     * the nested substores out.
     * @param pathSelectors
     */
    static getSubStore(...pathSelectors) {
        return pathSelectors.length
            ? MockNgRedux.getInstance().mockRootStore.getSubStore(...pathSelectors)
            : MockNgRedux.getInstance().mockRootStore;
    }
    /**
     * Reset all previously configured stubs.
     */
    static reset() {
        MockNgRedux.getInstance().mockRootStore.reset();
        NgRedux.instance = MockNgRedux.mockInstance;
    }
    /**
     * Gets the singleton MockNgRedux instance. Useful for cases where your
     * tests need to spy on store methods, for example.
     */
    static getInstance() {
        MockNgRedux.mockInstance = MockNgRedux.mockInstance || new MockNgRedux();
        return MockNgRedux.mockInstance;
    }
}
/** @deprecated Use MockNgRedux.getInstance() instead. */
MockNgRedux.mockInstance = undefined;

// Needs to be initialized early so @select's use the mocked version too.
const mockNgRedux = MockNgRedux.getInstance();
/** @hidden */
function _mockNgReduxFactory() {
    return mockNgRedux;
}
let NgReduxTestingModule = class NgReduxTestingModule {
};
NgReduxTestingModule = __decorate([
    NgModule({
        imports: [],
        providers: [
            { provide: NgRedux, useFactory: _mockNgReduxFactory },
            { provide: DevToolsExtension, useClass: MockDevToolsExtension },
        ],
    })
], NgReduxTestingModule);

/**
 * Generated bundle index. Do not edit.
 */

export { MockDevToolsExtension, MockNgRedux, MockObservableStore, NgReduxTestingModule, _mockNgReduxFactory as ɵa };
//# sourceMappingURL=angular-redux-store-testing.js.map
