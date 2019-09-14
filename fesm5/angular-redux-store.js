import { __decorate, __metadata, __read, __assign, __spread, __extends } from 'tslib';
import { NgZone, ApplicationRef, Injectable, NgModule } from '@angular/core';
import { distinctUntilChanged, map, filter, switchMap } from 'rxjs/operators';
import { compose, applyMiddleware, createStore } from 'redux';
import { Observable, BehaviorSubject } from 'rxjs';

/**
 * This is the public interface of @angular-redux/store. It wraps the global
 * redux store and adds a few other add on methods. It's what you'll inject
 * into your Angular application as a service.
 */
var NgRedux = /** @class */ (function () {
    function NgRedux() {
    }
    /** @hidden, @deprecated */
    NgRedux.instance = undefined;
    return NgRedux;
}());

var environment = (typeof window !== 'undefined'
    ? window
    : {});
/**
 * An angular-2-ified version of the Redux DevTools chrome extension.
 */
var DevToolsExtension = /** @class */ (function () {
    /** @hidden */
    function DevToolsExtension(appRef, ngRedux) {
        var _this = this;
        this.appRef = appRef;
        this.ngRedux = ngRedux;
        /**
         * A wrapper for the Chrome Extension Redux DevTools.
         * Makes sure state changes triggered by the extension
         * trigger Angular2's change detector.
         *
         * @argument options: dev tool options; same
         * format as described here:
         * [zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md]
         */
        this.enhancer = function (options) {
            var subscription;
            if (!_this.isEnabled()) {
                return null;
            }
            // Make sure changes from dev tools update angular's view.
            _this.getDevTools().listen(function (_a) {
                var type = _a.type;
                if (type === 'START') {
                    subscription = _this.ngRedux.subscribe(function () {
                        if (!NgZone.isInAngularZone()) {
                            _this.appRef.tick();
                        }
                    });
                }
                else if (type === 'STOP') {
                    subscription();
                }
            });
            return _this.getDevTools()(options || {});
        };
        /**
         * Returns true if the extension is installed and enabled.
         */
        this.isEnabled = function () { return !!_this.getDevTools(); };
        /**
         * Returns the redux devtools enhancer.
         */
        this.getDevTools = function () {
            return environment &&
                (environment.__REDUX_DEVTOOLS_EXTENSION__ || environment.devToolsExtension);
        };
    }
    DevToolsExtension.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: NgRedux }
    ]; };
    DevToolsExtension = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ApplicationRef, NgRedux])
    ], DevToolsExtension);
    return DevToolsExtension;
}());

/**
 * Gets a deeply-nested property value from an object, given a 'path'
 * of property names or array indices.
 *
 * @hidden
 */
function getIn(v, pathElems) {
    if (!v) {
        return v;
    }
    // If this is an ImmutableJS structure, use existing getIn function
    if ('function' === typeof v.getIn) {
        return v.getIn(pathElems);
    }
    var _a = __read(pathElems), firstElem = _a[0], restElems = _a.slice(1);
    if (undefined === v[firstElem]) {
        return undefined;
    }
    if (restElems.length === 0) {
        return v[firstElem];
    }
    return getIn(v[firstElem], restElems);
}

/**
 * Sets a deeply-nested property value from an object, given a 'path'
 * of property names or array indices. Path elements are created if
 * not there already. Does not mutate the given object.
 *
 * @hidden
 */
var setIn = function (obj, _a, value) {
    var _b, _c;
    var _d = __read(_a), firstElem = _d[0], restElems = _d.slice(1);
    return 'function' === typeof (obj[firstElem] || {}).setIn
        ? __assign({}, obj, (_b = {}, _b[firstElem] = obj[firstElem].setIn(restElems, value), _b)) : __assign({}, obj, (_c = {}, _c[firstElem] = restElems.length === 0
        ? value
        : setIn(obj[firstElem] || {}, restElems, value), _c));
};

var reducerMap = {};
var composeReducers = function () {
    var reducers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        reducers[_i] = arguments[_i];
    }
    return function (state, action) {
        return reducers.reduce(function (subState, reducer) { return reducer(subState, action); }, state);
    };
};
var ɵ0 = composeReducers;
/**
 * @param rootReducer Call this on your root reducer to enable SubStore
 * functionality for pre-configured stores (e.g. using NgRedux.provideStore()).
 * NgRedux.configureStore
 * does it for you under the hood.
 */
function enableFractalReducers(rootReducer) {
    reducerMap = {};
    return composeReducers(rootFractalReducer, rootReducer);
}
/** @hidden */
function registerFractalReducer(basePath, localReducer) {
    var existingFractalReducer = reducerMap[JSON.stringify(basePath)];
    if (existingFractalReducer && existingFractalReducer !== localReducer) {
        throw new Error("attempt to overwrite fractal reducer for basePath " + basePath);
    }
    reducerMap[JSON.stringify(basePath)] = localReducer;
}
/** @hidden */
function replaceLocalReducer(basePath, nextLocalReducer) {
    reducerMap[JSON.stringify(basePath)] = nextLocalReducer;
}
function rootFractalReducer(state, action) {
    if (state === void 0) { state = {}; }
    var fractalKey = action['@angular-redux::fractalkey'];
    var fractalPath = fractalKey ? JSON.parse(fractalKey) : [];
    var localReducer = reducerMap[fractalKey || ''];
    return fractalKey && localReducer
        ? setIn(state, fractalPath, localReducer(getIn(state, fractalPath), action))
        : state;
}

/**
 * OPTIONS_KEY: this is per-class (static) and holds the config from the
 * @SubStore decorator.
 */
var OPTIONS_KEY = '@angular-redux::substore::class::options';
/**
 * INSTANCE_SUBSTORE_KEY, INSTANCE_SELECTIONS_KEY: these are per-instance
 * (non-static) and holds references to the substores/selected observables
 * to be used by an instance of a decorated class. I'm not using
 * reflect-metadata here because I want
 *
 * 1. different instances to have different substores in the case where
 * `basePathMethodName` is dynamic.
 * 2. the instance substore to be garbage collected when the instance is no
 * longer reachable.
 * This is therefore an own-property on the actual instance of the decorated
 * class.
 */
var INSTANCE_SUBSTORE_KEY = '@angular-redux::substore::instance::store';
var INSTANCE_SELECTIONS_KEY = '@angular-redux::substore::instance::selections';
/**
 * Used to detect when the base path changes - this allows components to
 * dynamically adjust their selections if necessary.
 */
var INSTANCE_BASE_PATH_KEY = '@angular-redux::substore::instance::basepath';
var getClassOptions = function (decoratedInstance) {
    return decoratedInstance.constructor[OPTIONS_KEY];
};
var ɵ0$1 = getClassOptions;
/** @hidden */
var setClassOptions = function (decoratedClassConstructor, options) {
    decoratedClassConstructor[OPTIONS_KEY] = options;
};
// I want the store to be saved on the actual instance so
// 1. different instances can have distinct substores if necessary
// 2. the substore/selections will be marked for garbage collection when the
//    instance is destroyed.
var setInstanceStore = function (decoratedInstance, store) { return (decoratedInstance[INSTANCE_SUBSTORE_KEY] = store); };
var ɵ1 = setInstanceStore;
var getInstanceStore = function (decoratedInstance) {
    return decoratedInstance[INSTANCE_SUBSTORE_KEY];
};
var ɵ2 = getInstanceStore;
var getInstanceSelectionMap = function (decoratedInstance) {
    var map = decoratedInstance[INSTANCE_SELECTIONS_KEY] || {};
    decoratedInstance[INSTANCE_SELECTIONS_KEY] = map;
    return map;
};
var ɵ3 = getInstanceSelectionMap;
var hasBasePathChanged = function (decoratedInstance, basePath) {
    return decoratedInstance[INSTANCE_BASE_PATH_KEY] !== (basePath || []).toString();
};
var ɵ4 = hasBasePathChanged;
var setInstanceBasePath = function (decoratedInstance, basePath) {
    decoratedInstance[INSTANCE_BASE_PATH_KEY] = (basePath || []).toString();
};
var ɵ5 = setInstanceBasePath;
var clearInstanceState = function (decoratedInstance) {
    decoratedInstance[INSTANCE_SELECTIONS_KEY] = null;
    decoratedInstance[INSTANCE_SUBSTORE_KEY] = null;
    decoratedInstance[INSTANCE_BASE_PATH_KEY] = null;
};
var ɵ6 = clearInstanceState;
/**
 * Gets the store associated with a decorated instance (e.g. a
 * component or service)
 * @hidden
 */
var getBaseStore = function (decoratedInstance) {
    // The root store hasn't been set up yet.
    if (!NgRedux.instance) {
        return undefined;
    }
    var options = getClassOptions(decoratedInstance);
    // This is not decorated with `@WithSubStore`. Return the root store.
    if (!options) {
        return NgRedux.instance;
    }
    // Dynamic base path support:
    var basePath = decoratedInstance[options.basePathMethodName]();
    if (hasBasePathChanged(decoratedInstance, basePath)) {
        clearInstanceState(decoratedInstance);
        setInstanceBasePath(decoratedInstance, basePath);
    }
    if (!basePath) {
        return NgRedux.instance;
    }
    var store = getInstanceStore(decoratedInstance);
    if (!store) {
        setInstanceStore(decoratedInstance, NgRedux.instance.configureSubStore(basePath, options.localReducer));
    }
    return getInstanceStore(decoratedInstance);
};
/**
 * Creates an Observable from the given selection parameters,
 * rooted at decoratedInstance's store, and caches it on the
 * instance for future use.
 * @hidden
 */
var getInstanceSelection = function (decoratedInstance, key, selector, transformer, comparator) {
    var store = getBaseStore(decoratedInstance);
    if (store) {
        var selections = getInstanceSelectionMap(decoratedInstance);
        selections[key] =
            selections[key] ||
                (!transformer
                    ? store.select(selector, comparator)
                    : store.select(selector).pipe(function (obs$) { return transformer(obs$, decoratedInstance); }, distinctUntilChanged(comparator)));
        return selections[key];
    }
    return undefined;
};

/**
 * Auto-dispatches the return value of the decorated function.
 *
 * Decorate a function creator method with @dispatch and its return
 * value will automatically be passed to ngRedux.dispatch() for you.
 */
function dispatch() {
    return function decorate(target, key, descriptor) {
        var originalMethod;
        var wrapped = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = originalMethod.apply(this, args);
            if (result !== undefined) {
                var store = getBaseStore(this) || NgRedux.instance;
                if (store) {
                    store.dispatch(result);
                }
            }
            return result;
        };
        descriptor = descriptor || Object.getOwnPropertyDescriptor(target, key);
        if (descriptor === undefined) {
            var dispatchDescriptor = {
                get: function () { return wrapped; },
                set: function (setMethod) { return (originalMethod = setMethod); },
            };
            Object.defineProperty(target, key, dispatchDescriptor);
            return dispatchDescriptor;
        }
        else {
            originalMethod = descriptor.value;
            descriptor.value = wrapped;
            return descriptor;
        }
    };
}
// get descriptor
// if no descriptor, create one with getter setter
// if descriptor, set original method to descriptor, and then bind the wrapped function instead

/**
 * Selects an observable from the store, and attaches it to the decorated
 * property.
 *
 * ```ts
 *  import { select } from '@angular-redux/store';
 *
 *  class SomeClass {
 *    @select(['foo','bar']) foo$: Observable<string>
 * }
 * ```
 *
 * @param selector
 * A selector function, property name string, or property name path
 * (array of strings/array indices) that locates the store data to be
 * selected
 *
 * @param comparator Function used to determine if this selector has changed.
 */
function select(selector, comparator) {
    return function (target, key) {
        var adjustedSelector = selector
            ? selector
            : String(key).lastIndexOf('$') === String(key).length - 1
                ? String(key).substring(0, String(key).length - 1)
                : key;
        decorate(adjustedSelector, undefined, comparator)(target, key);
    };
}
/**
 * Selects an observable using the given path selector, and runs it through the
 * given transformer function. A transformer function takes the store
 * observable as an input and returns a derived observable from it. That derived
 *  observable is run through distinctUntilChanges with the given optional
 * comparator and attached to the store property.
 *
 * Think of a Transformer as a FunctionSelector that operates on observables
 * instead of values.
 *
 * ```ts
 * import { select$ } from 'angular-redux/store';
 *
 * export const debounceAndTriple = obs$ => obs$
 *  .debounce(300)
 *  .map(x => 3 * x);
 *
 * class Foo {
 *  @select$(['foo', 'bar'], debounceAndTriple)
 *  readonly debouncedFooBar$: Observable<number>;
 * }
 * ```
 */
function select$(selector, transformer, comparator) {
    return decorate(selector, transformer, comparator);
}
function decorate(selector, transformer, comparator) {
    return function decorator(target, key) {
        function getter() {
            return getInstanceSelection(this, key, selector, transformer, comparator);
        }
        // Replace decorated property with a getter that returns the observable.
        if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: getter,
                enumerable: true,
                configurable: true,
            });
        }
    };
}

/**
 * Modifies the behaviour of any `@select`, `@select$`, or `@dispatch`
 * decorators to operate on a substore defined by the IFractalStoreOptions.
 *
 * See:
 * https://github.com/angular-redux/platform/blob/master/packages/store/articles/fractal-store.md
 * for more information about SubStores.
 */
function WithSubStore(_a) {
    var basePathMethodName = _a.basePathMethodName, localReducer = _a.localReducer;
    return function decorate(constructor) {
        setClassOptions(constructor, {
            basePathMethodName: basePathMethodName,
            localReducer: localReducer,
        });
    };
}

/** @hidden */
var assert = function (condition, message) {
    if (!condition) {
        throw new Error(message);
    }
};

/** @hidden */
var sniffSelectorType = function (selector) {
    return !selector
        ? 'nil'
        : Array.isArray(selector)
            ? 'path'
            : 'function' === typeof selector
                ? 'function'
                : 'property';
};
/** @hidden */
var resolver = function (selector) { return ({
    property: function (state) {
        return state ? state[selector] : undefined;
    },
    path: function (state) { return getIn(state, selector); },
    function: selector,
    nil: function (state) { return state; },
}); };
/** @hidden */
var resolveToFunctionSelector = function (selector) { return resolver(selector)[sniffSelectorType(selector)]; };

/** @hidden */
var SubStore = /** @class */ (function () {
    function SubStore(rootStore, basePath, localReducer) {
        var _this = this;
        this.rootStore = rootStore;
        this.basePath = basePath;
        this.dispatch = function (action) {
            return _this.rootStore.dispatch(__assign({}, action, { '@angular-redux::fractalkey': JSON.stringify(_this.basePath) }));
        };
        this.getState = function () { return getIn(_this.rootStore.getState(), _this.basePath); };
        this.configureSubStore = function (basePath, localReducer) {
            return new SubStore(_this.rootStore, __spread(_this.basePath, basePath), localReducer);
        };
        this.select = function (selector, comparator) {
            return _this.rootStore.select(_this.basePath).pipe(map(resolveToFunctionSelector(selector)), distinctUntilChanged(comparator));
        };
        this.subscribe = function (listener) {
            var subscription = _this.select().subscribe(listener);
            return function () { return subscription.unsubscribe(); };
        };
        this.replaceReducer = function (nextLocalReducer) {
            return replaceLocalReducer(_this.basePath, nextLocalReducer);
        };
        registerFractalReducer(basePath, localReducer);
    }
    return SubStore;
}());

/** @hidden */
var RootStore = /** @class */ (function (_super) {
    __extends(RootStore, _super);
    function RootStore(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this.store = undefined;
        _this.configureStore = function (rootReducer, initState, middleware, enhancers) {
            if (middleware === void 0) { middleware = []; }
            if (enhancers === void 0) { enhancers = []; }
            assert(!_this.store, 'Store already configured!');
            // Variable-arity compose in typescript FTW.
            _this.setStore(compose.apply(void 0, __spread([applyMiddleware.apply(void 0, __spread(middleware))], enhancers))(createStore)(enableFractalReducers(rootReducer), initState));
        };
        _this.provideStore = function (store) {
            assert(!_this.store, 'Store already configured!');
            _this.setStore(store);
        };
        _this.getState = function () { return _this.store.getState(); };
        _this.subscribe = function (listener) {
            return _this.store.subscribe(listener);
        };
        _this.replaceReducer = function (nextReducer) {
            _this.store.replaceReducer(nextReducer);
        };
        _this.dispatch = function (action) {
            assert(!!_this.store, 'Dispatch failed: did you forget to configure your store? ' +
                'https://github.com/angular-redux/platform/blob/master/packages/store/' +
                'README.md#quick-start');
            if (!NgZone.isInAngularZone()) {
                return _this.ngZone.run(function () { return _this.store.dispatch(action); });
            }
            else {
                return _this.store.dispatch(action);
            }
        };
        _this.select = function (selector, comparator) {
            return _this.store$.pipe(distinctUntilChanged(), map(resolveToFunctionSelector(selector)), distinctUntilChanged(comparator));
        };
        _this.configureSubStore = function (basePath, localReducer) {
            return new SubStore(_this, basePath, localReducer);
        };
        _this.storeToObservable = function (store) {
            return new Observable(function (observer) {
                observer.next(store.getState());
                var unsubscribeFromRedux = store.subscribe(function () {
                    return observer.next(store.getState());
                });
                return function () {
                    unsubscribeFromRedux();
                    observer.complete();
                };
            });
        };
        NgRedux.instance = _this;
        _this.store$ = new BehaviorSubject(undefined).pipe(filter(function (n) { return n !== undefined; }), switchMap(function (observableStore) { return observableStore; }));
        return _this;
    }
    RootStore.prototype.setStore = function (store) {
        this.store = store;
        var storeServable = this.storeToObservable(store);
        this.store$.next(storeServable);
    };
    return RootStore;
}(NgRedux));

/** @hidden */
function _ngReduxFactory(ngZone) {
    return new RootStore(ngZone);
}
var NgReduxModule = /** @class */ (function () {
    function NgReduxModule() {
    }
    NgReduxModule = __decorate([
        NgModule({
            providers: [
                DevToolsExtension,
                { provide: NgRedux, useFactory: _ngReduxFactory, deps: [NgZone] },
            ],
        })
    ], NgReduxModule);
    return NgReduxModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { DevToolsExtension, NgRedux, NgReduxModule, WithSubStore, _ngReduxFactory, dispatch, enableFractalReducers, select, select$, RootStore as ɵa };
//# sourceMappingURL=angular-redux-store.js.map
