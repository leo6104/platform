import * as tslib_1 from "tslib";
import { applyMiddleware, compose, createStore, } from 'redux';
import { NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { assert } from '../utils/assert';
import { enableFractalReducers } from './fractal-reducer-map';
import { NgRedux } from './ng-redux';
import { resolveToFunctionSelector, } from './selectors';
import { SubStore } from './sub-store';
/** @hidden */
var RootStore = /** @class */ (function (_super) {
    tslib_1.__extends(RootStore, _super);
    function RootStore(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this.store = undefined;
        _this.configureStore = function (rootReducer, initState, middleware, enhancers) {
            if (middleware === void 0) { middleware = []; }
            if (enhancers === void 0) { enhancers = []; }
            assert(!_this.store, 'Store already configured!');
            // Variable-arity compose in typescript FTW.
            _this.setStore(compose.apply(void 0, tslib_1.__spread([applyMiddleware.apply(void 0, tslib_1.__spread(middleware))], enhancers))(createStore)(enableFractalReducers(rootReducer), initState));
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
export { RootStore };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9yb290LXN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBRUwsZUFBZSxFQUNmLE9BQU8sRUFDUCxXQUFXLEdBUVosTUFBTSxPQUFPLENBQUM7QUFFZixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXJDLE9BQU8sRUFHTCx5QkFBeUIsR0FFMUIsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxjQUFjO0FBQ2Q7SUFBMEMscUNBQWtCO0lBSTFELG1CQUFvQixNQUFjO1FBQWxDLFlBQ0UsaUJBQU8sU0FRUjtRQVRtQixZQUFNLEdBQU4sTUFBTSxDQUFRO1FBSDFCLFdBQUssR0FBaUMsU0FBUyxDQUFDO1FBY3hELG9CQUFjLEdBQUcsVUFDZixXQUEwQyxFQUMxQyxTQUFvQixFQUNwQixVQUE2QixFQUM3QixTQUEwQztZQUQxQywyQkFBQSxFQUFBLGVBQTZCO1lBQzdCLDBCQUFBLEVBQUEsY0FBMEM7WUFFMUMsTUFBTSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1lBQ2pELDRDQUE0QztZQUM1QyxLQUFJLENBQUMs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QUM7SUErRE8sNEJBQVEsR0FBaEIsVUFBaUIsS0FBdUI7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQW9CLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBZUgsZ0JBQUM7QUFBRCxDQUFDLEFBL0ZELENBQTBDLE9BQU8sR0ErRmhEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQW55QWN0aW9uLFxuICBhcHBseU1pZGRsZXdhcmUsXG4gIGNvbXBvc2UsXG4gIGNyZWF0ZVN0b3JlLFxuICBEaXNwYXRjaCxcbiAgTWlkZGxld2FyZSxcbiAgUmVkdWNlcixcbiAgU3RvcmUsXG4gIFN0b3JlQ3JlYXRvcixcbiAgU3RvcmVFbmhhbmNlcixcbiAgVW5zdWJzY3JpYmUsXG59IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHsgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uL3V0aWxzL2Fzc2VydCc7XG5pbXBvcnQgeyBlbmFibGVGcmFjdGFsUmVkdWNlcnMgfSBmcm9tICcuL2ZyYWN0YWwtcmVkdWNlci1tYXAnO1xuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJy4vbmctcmVkdXgnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZVN0b3JlIH0gZnJvbSAnLi9vYnNlcnZhYmxlLXN0b3JlJztcbmltcG9ydCB7XG4gIENvbXBhcmF0b3IsXG4gIFBhdGhTZWxlY3RvcixcbiAgcmVzb2x2ZVRvRnVuY3Rpb25TZWxlY3RvcixcbiAgU2VsZWN0b3IsXG59IGZyb20gJy4vc2VsZWN0b3JzJztcbmltcG9ydCB7IFN1YlN0b3JlIH0gZnJvbSAnLi9zdWItc3RvcmUnO1xuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGNsYXNzIFJvb3RTdG9yZTxSb290U3RhdGU+IGV4dGVuZHMgTmdSZWR1eDxSb290U3RhdGU+IHtcbiAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8Um9vdFN0YXRlPiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBzdG9yZSQ6IEJlaGF2aW9yU3ViamVjdDxSb290U3RhdGU+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgTmdSZWR1eC5pbnN0YW5jZSA9IHRoaXM7XG4gICAgdGhpcy5zdG9yZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFJvb3RTdGF0ZSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKS5waXBlKFxuICAgICAgZmlsdGVyKG4gPT4gbiAhPT0gdW5kZWZpbmVkKSxcbiAgICAgIHN3aXRjaE1hcChvYnNlcnZhYmxlU3RvcmUgPT4gb2JzZXJ2YWJsZVN0b3JlIGFzIGFueSksXG4gICAgICAvLyBUT0RPOiBmaXggdGhpcz8gbmVlZGluZyB0byBleHBsaWNpdGx5IGNhc3QgdGhpcyBpcyB3cm9uZ1xuICAgICkgYXMgQmVoYXZpb3JTdWJqZWN0PFJvb3RTdGF0ZT47XG4gIH1cblxuICBjb25maWd1cmVTdG9yZSA9IChcbiAgICByb290UmVkdWNlcjogUmVkdWNlcjxSb290U3RhdGUsIEFueUFjdGlvbj4sXG4gICAgaW5pdFN0YXRlOiBSb290U3RhdGUsXG4gICAgbWlkZGxld2FyZTogTWlkZGxld2FyZVtdID0gW10sXG4gICAgZW5oYW5jZXJzOiBTdG9yZUVuaGFuY2VyPFJvb3RTdGF0ZT5bXSA9IFtdLFxuICApOiB2b2lkID0+IHtcbiAgICBhc3NlcnQoIXRoaXMuc3RvcmUsICdTdG9yZSBhbHJlYWR5IGNvbmZpZ3VyZWQhJyk7XG4gICAgLy8gVmFyaWFibGUtYXJpdHkgY29tcG9zZSBpbiB0eXBlc2NyaXB0IEZUVy5cbiAgICB0aGlzLnNldFN0b3JlKFxuICAgICAgY29tcG9zZTxTdG9yZUNyZWF0b3I+KFxuICAgICAgICBhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZSksXG4gICAgICAgIC4uLmVuaGFuY2VycyxcbiAgICAgICkoY3JlYXRlU3RvcmUpKGVuYWJsZUZyYWN0YWxSZWR1Y2Vycyhyb290UmVkdWNlciksIGluaXRTdGF0ZSksXG4gICAgKTtcbiAgfTtcblxuICBwcm92aWRlU3RvcmUgPSAoc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4pID0+IHtcbiAgICBhc3NlcnQoIXRoaXMuc3RvcmUsICdTdG9yZSBhbHJlYWR5IGNvbmZpZ3VyZWQhJyk7XG4gICAgdGhpcy5zZXRTdG9yZShzdG9yZSk7XG4gIH07XG5cbiAgZ2V0U3RhdGUgPSAoKTogUm9vdFN0YXRlID0+IHRoaXMuc3RvcmUhLmdldFN0YXRlKCk7XG5cbiAgc3Vic2NyaWJlID0gKGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogVW5zdWJzY3JpYmUgPT5cbiAgICB0aGlzLnN0b3JlIS5zdWJzY3JpYmUobGlzdGVuZXIpO1xuXG4gIHJlcGxhY2VSZWR1Y2VyID0gKG5leHRSZWR1Y2VyOiBSZWR1Y2VyPFJvb3RTdGF0ZSwgQW55QWN0aW9uPik6IHZvaWQgPT4ge1xuICAgIHRoaXMuc3RvcmUhLnJlcGxhY2VSZWR1Y2VyKG5leHRSZWR1Y2VyKTtcbiAgfTtcblxuICBkaXNwYXRjaDogRGlzcGF0Y2g8QW55QWN0aW9uPiA9IDxBIGV4dGVuZHMgQW55QWN0aW9uPihhY3Rpb246IEEpOiBBID0+IHtcbiAgICBhc3NlcnQoXG4gICAgICAhIXRoaXMuc3RvcmUsXG4gICAgICAnRGlzcGF0Y2ggZmFpbGVkOiBkaWQgeW91IGZvcmdldCB0byBjb25maWd1cmUgeW91ciBzdG9yZT8gJyArXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci1yZWR1eC9wbGF0Zm9ybS9ibG9iL21hc3Rlci9wYWNrYWdlcy9zdG9yZS8nICtcbiAgICAgICAgJ1JFQURNRS5tZCNxdWljay1zdGFydCcsXG4gICAgKTtcblxuICAgIGlmICghTmdab25lLmlzSW5Bbmd1bGFyWm9uZSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuc3RvcmUhLmRpc3BhdGNoKGFjdGlvbikpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zdG9yZSEuZGlzcGF0Y2goYWN0aW9uKTtcbiAgICB9XG4gIH07XG5cbiAgc2VsZWN0ID0gPFNlbGVjdGVkVHlwZT4oXG4gICAgc2VsZWN0b3I/OiBTZWxlY3RvcjxSb290U3RhdGUsIFNlbGVjdGVkVHlwZT4sXG4gICAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4gICk6IE9ic2VydmFibGU8U2VsZWN0ZWRUeXBlPiA9PlxuICAgIHRoaXMuc3RvcmUkLnBpcGUoXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgbWFwKHJlc29sdmVUb0Z1bmN0aW9uU2VsZWN0b3Ioc2VsZWN0b3IpKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKGNvbXBhcmF0b3IpLFxuICAgICk7XG5cbiAgY29uZmlndXJlU3ViU3RvcmUgPSA8U3ViU3RhdGU+KFxuICAgIGJhc2VQYXRoOiBQYXRoU2VsZWN0b3IsXG4gICAgbG9jYWxSZWR1Y2VyOiBSZWR1Y2VyPFN1YlN0YXRlLCBBbnlBY3Rpb24+LFxuICApOiBPYnNlcnZhYmxlU3RvcmU8U3ViU3RhdGU+ID0+XG4gICAgbmV3IFN1YlN0b3JlPFN1YlN0YXRlPih0aGlzLCBiYXNlUGF0aCwgbG9jYWxSZWR1Y2VyKTtcblxuICBwcml2YXRlIHNldFN0b3JlKHN0b3JlOiBTdG9yZTxSb290U3RhdGU+KSB7XG4gICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xuICAgIGNvbnN0IHN0b3JlU2VydmFibGUgPSB0aGlzLnN0b3JlVG9PYnNlcnZhYmxlKHN0b3JlKTtcbiAgICB0aGlzLnN0b3JlJC5uZXh0KHN0b3JlU2VydmFibGUgYXMgYW55KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RvcmVUb09ic2VydmFibGUgPSAoXG4gICAgc3RvcmU6IFN0b3JlPFJvb3RTdGF0ZT4sXG4gICk6IE9ic2VydmFibGU8Um9vdFN0YXRlPiA9PlxuICAgIG5ldyBPYnNlcnZhYmxlPFJvb3RTdGF0ZT4oKG9ic2VydmVyOiBPYnNlcnZlcjxSb290U3RhdGU+KSA9PiB7XG4gICAgICBvYnNlcnZlci5uZXh0KHN0b3JlLmdldFN0YXRlKCkpO1xuICAgICAgY29uc3QgdW5zdWJzY3JpYmVGcm9tUmVkdXggPSBzdG9yZS5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgb2JzZXJ2ZXIubmV4dChzdG9yZS5nZXRTdGF0ZSgpKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICB1bnN1YnNjcmliZUZyb21SZWR1eCgpO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfTtcbiAgICB9KTtcbn1cbiJdfQ==