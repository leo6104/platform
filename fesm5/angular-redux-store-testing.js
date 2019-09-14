import { __extends, __decorate, __read, __spread } from 'tslib';
import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { Injectable, NgModule } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

var MockDevToolsExtension = /** @class */ (function (_super) {
    __extends(MockDevToolsExtension, _super);
    function MockDevToolsExtension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockDevToolsExtension = __decorate([
        Injectable()
    ], MockDevToolsExtension);
    return MockDevToolsExtension;
}(DevToolsExtension));

/** @hidden */
var MockObservableStore = /** @class */ (function () {
    function MockObservableStore() {
        var _this = this;
        this.selections = {};
        this.subStores = {};
        this.getSelectorStub = function (selector, comparator) {
            return _this.initSelectorStub(selector, comparator).subject;
        };
        this.reset = function () {
            Object.keys(_this.subStores).forEach(function (k) { return _this.subStores[k].reset(); });
            _this.selections = {};
            _this.subStores = {};
        };
        this.dispatch = function (action) { return action; };
        this.replaceReducer = function () { return null; };
        this.getState = function () { return ({}); };
        this.subscribe = function () { return function () { return null; }; };
        this.select = function (selector, comparator) {
            var stub = _this.initSelectorStub(selector, comparator);
            return stub.comparator
                ? stub.subject.pipe(distinctUntilChanged(stub.comparator))
                : stub.subject;
        };
        this.configureSubStore = function (basePath, _) { return _this.initSubStore(basePath); };
        this.getSubStore = function () {
            var _a;
            var pathSelectors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                pathSelectors[_i] = arguments[_i];
            }
            var _b = __read(pathSelectors), first = _b[0], rest = _b.slice(1);
            return (first
                ? (_a = _this.initSubStore(first)).getSubStore.apply(_a, __spread(rest)) : _this);
        };
    }
    MockObservableStore.prototype.initSubStore = function (basePath) {
        var result = this.subStores[JSON.stringify(basePath)] ||
            new MockObservableStore();
        this.subStores[JSON.stringify(basePath)] = result;
        return result;
    };
    MockObservableStore.prototype.initSelectorStub = function (selector, comparator) {
        var key = selector ? selector.toString() : '';
        var record = this.selections[key] || {
            subject: new ReplaySubject(),
            comparator: comparator,
        };
        this.selections[key] = record;
        return record;
    };
    return MockObservableStore;
}());

/**
 * Convenience mock to make it easier to control selector
 * behaviour in unit tests.
 */
var MockNgRedux = /** @class */ (function (_super) {
    __extends(MockNgRedux, _super);
    /** @hidden */
    function MockNgRedux() {
        var _this = _super.call(this) || this;
        //
        _this.mockRootStore = new MockObservableStore();
        _this.configureSubStore = _this.mockRootStore.configureSubStore;
        _this.dispatch = _this.mockRootStore.dispatch;
        _this.getState = _this.mockRootStore.getState;
        _this.subscribe = _this.mockRootStore.subscribe;
        _this.replaceReducer = _this.mockRootStore.replaceReducer;
        _this.select = _this.mockRootStore.select;
        _this.provideStore = function (_) { return undefined; };
        _this.configureStore = function (_, __, ___, ____) { return undefined; };
        // This hooks the mock up to @select.
        NgRedux.instance = _this;
        return _this;
    }
    /**
     * Returns a subject that's connected to any observable returned by the
     * given selector. You can use this subject to pump values into your
     * components or services under test; when they call .select or @select
     * in the context of a unit test, MockNgRedux will give them the values
     * you pushed onto your stub.
     */
    MockNgRedux.getSelectorStub = function (selector, comparator) {
        return MockNgRedux.getInstance().mockRootStore.getSelectorStub(selector, comparator);
    };
    /**
     * Returns a mock substore that allows you to set up selectorStubs for
     * any 'fractal' stores your app creates with NgRedux.configureSubStore.
     *
     * If your app creates deeply nested substores from other substores,
     * pass the chain of pathSelectors in as ordered arguments to mock
     * the nested substores out.
     * @param pathSelectors
     */
    MockNgRedux.getSubStore = function () {
        var _a;
        var pathSelectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pathSelectors[_i] = arguments[_i];
        }
        return pathSelectors.length
            ? (_a = MockNgRedux.getInstance().mockRootStore).getSubStore.apply(_a, __spread(pathSelectors)) : MockNgRedux.getInstance().mockRootStore;
    };
    /**
     * Reset all previously configured stubs.
     */
    MockNgRedux.reset = function () {
        MockNgRedux.getInstance().mockRootStore.reset();
        NgRedux.instance = MockNgRedux.mockInstance;
    };
    /**
     * Gets the singleton MockNgRedux instance. Useful for cases where your
     * tests need to spy on store methods, for example.
     */
    MockNgRedux.getInstance = function () {
        MockNgRedux.mockInstance = MockNgRedux.mockInstance || new MockNgRedux();
        return MockNgRedux.mockInstance;
    };
    /** @deprecated Use MockNgRedux.getInstance() instead. */
    MockNgRedux.mockInstance = undefined;
    return MockNgRedux;
}(NgRedux));

// Needs to be initialized early so @select's use the mocked version too.
var mockNgRedux = MockNgRedux.getInstance();
/** @hidden */
function _mockNgReduxFactory() {
    return mockNgRedux;
}
var NgReduxTestingModule = /** @class */ (function () {
    function NgReduxTestingModule() {
    }
    NgReduxTestingModule = __decorate([
        NgModule({
            imports: [],
            providers: [
                { provide: NgRedux, useFactory: _mockNgReduxFactory },
                { provide: DevToolsExtension, useClass: MockDevToolsExtension },
            ],
        })
    ], NgReduxTestingModule);
    return NgReduxTestingModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { MockDevToolsExtension, MockNgRedux, MockObservableStore, NgReduxTestingModule, _mockNgReduxFactory as ɵa };
//# sourceMappingURL=angular-redux-store-testing.js.map
