import { __decorate, __metadata } from 'tslib';
import { NgZone, ApplicationRef, Injectable, NgModule } from '@angular/core';
import { distinctUntilChanged, map, filter, switchMap } from 'rxjs/operators';
import { compose, applyMiddleware, createStore } from 'redux';
import { Observable, BehaviorSubject } from 'rxjs';

/**
 * This is the public interface of @angular-redux/store. It wraps the global
 * redux store and adds a few other add on methods. It's what you'll inject
 * into your Angular application as a service.
 */
class NgRedux {
}
/** @hidden, @deprecated */
NgRedux.instance = undefined;

const environment = (typeof window !== 'undefined'
    ? window
    : {});
/**
 * An angular-2-ified version of the Redux DevTools chrome extension.
 */
let DevToolsExtension = class DevToolsExtension {
    /** @hidden */
    constructor(appRef, ngRedux) {
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
        this.enhancer = (options) => {
            let subscription;
            if (!this.isEnabled()) {
                return null;
            }
            // Make sure changes from dev tools update angular's view.
            this.getDevTools().listen(({ type }) => {
                if (type === 'START') {
                    subscription = this.ngRedux.subscribe(() => {
                        if (!NgZone.isInAngularZone()) {
                            this.appRef.tick();
                        }
                    });
                }
                else if (type === 'STOP') {
                    subscription();
                }
            });
            return this.getDevTools()(options || {});
        };
        /**
         * Returns true if the extension is installed and enabled.
         */
        this.isEnabled = () => !!this.getDevTools();
        /**
         * Returns the redux devtools enhancer.
         */
        this.getDevTools = () => environment &&
            (environment.__REDUX_DEVTOOLS_EXTENSION__ || environment.devToolsExtension);
    }
};
DevToolsExtension.ctorParameters = () => [
    { type: ApplicationRef },
    { type: NgRedux }
];
DevToolsExtension = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ApplicationRef, NgRedux])
], DevToolsExtension);

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
    const [firstElem, ...restElems] = pathElems;
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
const setIn = (obj, [firstElem, ...restElems], value) => 'function' === typeof (obj[firstElem] || {}).setIn
    ? Object.assign({}, obj, { [firstElem]: obj[firstElem].setIn(restElems, value) }) : Object.assign({}, obj, { [firstElem]: restElems.length === 0
        ? value
        : setIn(obj[firstElem] || {}, restElems, value) });

let reducerMap = {};
const composeReducers = (...reducers) => (state, action) => reducers.reduce((subState, reducer) => reducer(subState, action), state);
const ɵ0 = composeReducers;
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
    const existingFractalReducer = reducerMap[JSON.stringify(basePath)];
    if (existingFractalReducer && existingFractalReducer !== localReducer) {
        throw new Error(`attempt to overwrite fractal reducer for basePath ${basePath}`);
    }
    reducerMap[JSON.stringify(basePath)] = localReducer;
}
/** @hidden */
function replaceLocalReducer(basePath, nextLocalReducer) {
    reducerMap[JSON.stringify(basePath)] = nextLocalReducer;
}
function rootFractalReducer(state = {}, action) {
    const fractalKey = action['@angular-redux::fractalkey'];
    const fractalPath = fractalKey ? JSON.parse(fractalKey) : [];
    const localReducer = reducerMap[fractalKey || ''];
    return fractalKey && localReducer
        ? setIn(state, fractalPath, localReducer(getIn(state, fractalPath), action))
        : state;
}

/**
 * OPTIONS_KEY: this is per-class (static) and holds the config from the
 * @SubStore decorator.
 */
const OPTIONS_KEY = '@angular-redux::substore::class::options';
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
const INSTANCE_SUBSTORE_KEY = '@angular-redux::substore::instance::store';
const INSTANCE_SELECTIONS_KEY = '@angular-redux::substore::instance::selections';
/**
 * Used to detect when the base path changes - this allows components to
 * dynamically adjust their selections if necessary.
 */
const INSTANCE_BASE_PATH_KEY = '@angular-redux::substore::instance::basepath';
const getClassOptions = (decoratedInstance) => decoratedInstance.constructor[OPTIONS_KEY];
const ɵ0$1 = getClassOptions;
/** @hidden */
const setClassOptions = (decoratedClassConstructor, options) => {
    decoratedClassConstructor[OPTIONS_KEY] = options;
};
// I want the store to be saved on the actual instance so
// 1. different instances can have distinct substores if necessary
// 2. the substore/selections will be marked for garbage collection when the
//    instance is destroyed.
const setInstanceStore = (decoratedInstance, store) => (decoratedInstance[INSTANCE_SUBSTORE_KEY] = store);
const ɵ1 = setInstanceStore;
const getInstanceStore = (decoratedInstance) => decoratedInstance[INSTANCE_SUBSTORE_KEY];
const ɵ2 = getInstanceStore;
const getInstanceSelectionMap = (decoratedInstance) => {
    const map = decoratedInstance[INSTANCE_SELECTIONS_KEY] || {};
    decoratedInstance[INSTANCE_SELECTIONS_KEY] = map;
    return map;
};
const ɵ3 = getInstanceSelectionMap;
const hasBasePathChanged = (decoratedInstance, basePath) => decoratedInstance[INSTANCE_BASE_PATH_KEY] !== (basePath || []).toString();
const ɵ4 = hasBasePathChanged;
const setInstanceBasePath = (decoratedInstance, basePath) => {
    decoratedInstance[INSTANCE_BASE_PATH_KEY] = (basePath || []).toString();
};
const ɵ5 = setInstanceBasePath;
const clearInstanceState = (decoratedInstance) => {
    decoratedInstance[INSTANCE_SELECTIONS_KEY] = null;
    decoratedInstance[INSTANCE_SUBSTORE_KEY] = null;
    decoratedInstance[INSTANCE_BASE_PATH_KEY] = null;
};
const ɵ6 = clearInstanceState;
/**
 * Gets the store associated with a decorated instance (e.g. a
 * component or service)
 * @hidden
 */
const getBaseStore = (decoratedInstance) => {
    // The root store hasn't been set up yet.
    if (!NgRedux.instance) {
        return undefined;
    }
    const options = getClassOptions(decoratedInstance);
    // This is not decorated with `@WithSubStore`. Return the root store.
    if (!options) {
        return NgRedux.instance;
    }
    // Dynamic base path support:
    const basePath = decoratedInstance[options.basePathMethodName]();
    if (hasBasePathChanged(decoratedInstance, basePath)) {
        clearInstanceState(decoratedInstance);
        setInstanceBasePath(decoratedInstance, basePath);
    }
    if (!basePath) {
        return NgRedux.instance;
    }
    const store = getInstanceStore(decoratedInstance);
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
const getInstanceSelection = (decoratedInstance, key, selector, transformer, comparator) => {
    const store = getBaseStore(decoratedInstance);
    if (store) {
        const selections = getInstanceSelectionMap(decoratedInstance);
        selections[key] =
            selections[key] ||
                (!transformer
                    ? store.select(selector, comparator)
                    : store.select(selector).pipe(obs$ => transformer(obs$, decoratedInstance), distinctUntilChanged(comparator)));
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
        let originalMethod;
        const wrapped = function (...args) {
            const result = originalMethod.apply(this, args);
            if (result !== undefined) {
                const store = getBaseStore(this) || NgRedux.instance;
                if (store) {
                    store.dispatch(result);
                }
            }
            return result;
        };
        descriptor = descriptor || Object.getOwnPropertyDescriptor(target, key);
        if (descriptor === undefined) {
            const dispatchDescriptor = {
                get: () => wrapped,
                set: setMethod => (originalMethod = setMethod),
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
    return (target, key) => {
        const adjustedSelector = selector
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
function WithSubStore({ basePathMethodName, localReducer, }) {
    return function decorate(constructor) {
        setClassOptions(constructor, {
            basePathMethodName,
            localReducer,
        });
    };
}

/** @hidden */
const assert = (condition, message) => {
    if (!condition) {
        throw new Error(message);
    }
};

/** @hidden */
const sniffSelectorType = (selector) => !selector
    ? 'nil'
    : Array.isArray(selector)
        ? 'path'
        : 'function' === typeof selector
            ? 'function'
            : 'property';
/** @hidden */
const resolver = (selector) => ({
    property: (state) => state ? state[selector] : undefined,
    path: (state) => getIn(state, selector),
    function: selector,
    nil: (state) => state,
});
/** @hidden */
const resolveToFunctionSelector = (selector) => resolver(selector)[sniffSelectorType(selector)];

/** @hidden */
class SubStore {
    constructor(rootStore, basePath, localReducer) {
        this.rootStore = rootStore;
        this.basePath = basePath;
        this.dispatch = action => this.rootStore.dispatch(Object.assign({}, action, { '@angular-redux::fractalkey': JSON.stringify(this.basePath) }));
        this.getState = () => getIn(this.rootStore.getState(), this.basePath);
        this.configureSubStore = (basePath, localReducer) => new SubStore(this.rootStore, [...this.basePath, ...basePath], localReducer);
        this.select = (selector, comparator) => this.rootStore.select(this.basePath).pipe(map(resolveToFunctionSelector(selector)), distinctUntilChanged(comparator));
        this.subscribe = (listener) => {
            const subscription = this.select().subscribe(listener);
            return () => subscription.unsubscribe();
        };
        this.replaceReducer = (nextLocalReducer) => replaceLocalReducer(this.basePath, nextLocalReducer);
        registerFractalReducer(basePath, localReducer);
    }
}

/** @hidden */
class RootStore extends NgRedux {
    constructor(ngZone) {
        super();
        this.ngZone = ngZone;
        this.store = undefined;
        this.configureStore = (rootReducer, initState, middleware = [], enhancers = []) => {
            assert(!this.store, 'Store already configured!');
            // Variable-arity compose in typescript FTW.
            this.setStore(compose(applyMiddleware(...middleware), ...enhancers)(createStore)(enableFractalReducers(rootReducer), initState));
        };
        this.provideStore = (store) => {
            assert(!this.store, 'Store already configured!');
            this.setStore(store);
        };
        this.getState = () => this.store.getState();
        this.subscribe = (listener) => this.store.subscribe(listener);
        this.replaceReducer = (nextReducer) => {
            this.store.replaceReducer(nextReducer);
        };
        this.dispatch = (action) => {
            assert(!!this.store, 'Dispatch failed: did you forget to configure your store? ' +
                'https://github.com/angular-redux/platform/blob/master/packages/store/' +
                'README.md#quick-start');
            if (!NgZone.isInAngularZone()) {
                return this.ngZone.run(() => this.store.dispatch(action));
            }
            else {
                return this.store.dispatch(action);
            }
        };
        this.select = (selector, comparator) => this.store$.pipe(distinctUntilChanged(), map(resolveToFunctionSelector(selector)), distinctUntilChanged(comparator));
        this.configureSubStore = (basePath, localReducer) => new SubStore(this, basePath, localReducer);
        this.storeToObservable = (store) => new Observable((observer) => {
            observer.next(store.getState());
            const unsubscribeFromRedux = store.subscribe(() => observer.next(store.getState()));
            return () => {
                unsubscribeFromRedux();
                observer.complete();
            };
        });
        NgRedux.instance = this;
        this.store$ = new BehaviorSubject(undefined).pipe(filter(n => n !== undefined), switchMap(observableStore => observableStore));
    }
    setStore(store) {
        this.store = store;
        const storeServable = this.storeToObservable(store);
        this.store$.next(storeServable);
    }
}

/** @hidden */
function _ngReduxFactory(ngZone) {
    return new RootStore(ngZone);
}
let NgReduxModule = class NgReduxModule {
};
NgReduxModule = __decorate([
    NgModule({
        providers: [
            DevToolsExtension,
            { provide: NgRedux, useFactory: _ngReduxFactory, deps: [NgZone] },
        ],
    })
], NgReduxModule);

/**
 * Generated bundle index. Do not edit.
 */

export { DevToolsExtension, NgRedux, NgReduxModule, WithSubStore, _ngReduxFactory, dispatch, enableFractalReducers, select, select$, RootStore as ɵa };
//# sourceMappingURL=angular-redux-store.js.map
