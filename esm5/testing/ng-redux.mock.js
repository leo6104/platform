import * as tslib_1 from "tslib";
// TODO: See if this linting rule can be enabled with new build process (ng-packagr)
// tslint:disable:no-implicit-dependencies
// tslint:disable:member-ordering
import { NgRedux, } from '@angular-redux/store';
import { MockObservableStore } from './observable-store.mock';
/**
 * Convenience mock to make it easier to control selector
 * behaviour in unit tests.
 */
var MockNgRedux = /** @class */ (function (_super) {
    tslib_1.__extends(MockNgRedux, _super);
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
            ? (_a = MockNgRedux.getInstance().mockRootStore).getSubStore.apply(_a, tslib_1.__spread(pathSelectors)) : MockNgRedux.getInstance().mockRootStore;
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
export { MockNgRedux };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVkdXgubW9jay5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJlZHV4L3N0b3JlL3Rlc3RpbmcvIiwic291cmNlcyI6WyJuZy1yZWR1eC5tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRkFBb0Y7QUFDcEYsMENBQTBDO0FBQzFDLGlDQUFpQztBQUNqQyxPQUFPLEVBRUwsT0FBTyxHQUdSLE1BQU0sc0JBQXNCLENBQUM7QUFVOUIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQ7OztHQUdHO0FBQ0g7SUFBeUMsdUNBQVU7SUFtRWpELGNBQWM7SUFDZDtRQUFBLFlBQ0UsaUJBQU8sU0FHUjtRQWxCRCxFQUFFO1FBQ00sbUJBQWEsR0FBRyxJQUFJLG1CQUFtQixFQUFPLENBQUM7UUFFdkQsdUJBQWlCLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBd0IsQ0FBQztRQUNoRSxjQUFRLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUF5QixDQUFDO1FBQ3hELGNBQVEsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLFFBQWUsQ0FBQztRQUM5QyxlQUFTLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDekMsb0JBQWMsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztRQUNuRCxZQUFNLEdBRzBCLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBUzFELGtCQUFZLEdBQUcsVUFBQyxDQUFhLElBQVcsT0FBQSxTQUFTLEVBQVQsQ0FBUyxDQUFDO1FBQ2xELG9CQUFjLEdBQUcsVUFDZixDQUEwQixFQUMxQixFQUFPLEVBQ1AsR0FBa0IsRUFDbEIsSUFBMkIsSUFDbEIsT0FBQSxTQUFTLEVBQVQsQ0FBUyxDQUFDO1FBVm5CLHFDQUFxQztRQUNyQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQVcsQ0FBQzs7SUFDakMsQ0FBQztJQXBFRDs7Ozs7O09BTUc7SUFDSSwyQkFBZSxHQUF0QixVQUNFLFFBQXlCLEVBQ3pCLFVBQXVCO1FBRXZCLE9BQU8sV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQzVELFFBQVEsRUFDUixVQUFVLENBQ1gsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLHVCQUFXLEdBQWxCOztRQUNFLHVCQUFnQzthQUFoQyxVQUFnQyxFQUFoQyxxQkFBZ0MsRUFBaEMsSUFBZ0M7WUFBaEMsa0NBQWdDOztRQUVoQyxPQUFPLGFBQWEsQ0FBQyxNQUFNO1lBQ3pCLENBQUMsQ0FBQyxDQUFBLEtBQUEsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQSxDQUFDLFdBQVcsNEJBQUksYUFBYSxHQUN0RSxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxpQkFBSyxHQUFaO1FBQ0UsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoRCxPQUFPLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxZQUFtQixDQUFDO0lBQ3JELENBQUM7SUFFRDs7O09BR0c7SUFDSSx1QkFBVyxHQUFsQjtRQUNFLFdBQVcsQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ3pFLE9BQU8sV0FBVyxDQUFDLFlBQVksQ0FBQztJQUNsQyxDQUFDO0lBcERELHlEQUF5RDtJQUNsRCx3QkFBWSxHQUFzQixTQUFTLENBQUM7SUErRXJELGtCQUFDO0NBQUEsQUFqRkQsQ0FBeUMsT0FBTyxHQWlGL0M7U0FqRlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRPRE86IFNlZSBpZiB0aGlzIGxpbnRpbmcgcnVsZSBjYW4gYmUgZW5hYmxlZCB3aXRoIG5ldyBidWlsZCBwcm9jZXNzIChuZy1wYWNrYWdyKVxuLy8gdHNsaW50OmRpc2FibGU6bm8taW1wbGljaXQtZGVwZW5kZW5jaWVzXG4vLyB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmdcbmltcG9ydCB7XG4gIENvbXBhcmF0b3IsXG4gIE5nUmVkdXgsXG4gIFBhdGhTZWxlY3RvcixcbiAgU2VsZWN0b3IsXG59IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7XG4gIEFueUFjdGlvbixcbiAgRGlzcGF0Y2gsXG4gIE1pZGRsZXdhcmUsXG4gIFJlZHVjZXIsXG4gIFN0b3JlLFxuICBTdG9yZUVuaGFuY2VyLFxufSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNb2NrT2JzZXJ2YWJsZVN0b3JlIH0gZnJvbSAnLi9vYnNlcnZhYmxlLXN0b3JlLm1vY2snO1xuLyoqXG4gKiBDb252ZW5pZW5jZSBtb2NrIHRvIG1ha2UgaXQgZWFzaWVyIHRvIGNvbnRyb2wgc2VsZWN0b3JcbiAqIGJlaGF2aW91ciBpbiB1bml0IHRlc3RzLlxuICovXG5leHBvcnQgY2xhc3MgTW9ja05nUmVkdXg8VCA9IHt9PiBleHRlbmRzIE5nUmVkdXg8VD4ge1xuICAvKiogQGRlcHJlY2F0ZWQgVXNlIE1vY2tOZ1JlZHV4LmdldEluc3RhbmNlKCkgaW5zdGVhZC4gKi9cbiAgc3RhdGljIG1vY2tJbnN0YW5jZT86IE1vY2tOZ1JlZHV4PGFueT4gPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdWJqZWN0IHRoYXQncyBjb25uZWN0ZWQgdG8gYW55IG9ic2VydmFibGUgcmV0dXJuZWQgYnkgdGhlXG4gICAqIGdpdmVuIHNlbGVjdG9yLiBZb3UgY2FuIHVzZSB0aGlzIHN1YmplY3QgdG8gcHVtcCB2YWx1ZXMgaW50byB5b3VyXG4gICAqIGNvbXBvbmVudHMgb3Igc2VydmljZXMgdW5kZXIgdGVzdDsgd2hlbiB0aGV5IGNhbGwgLnNlbGVjdCBvciBAc2VsZWN0XG4gICAqIGluIHRoZSBjb250ZXh0IG9mIGEgdW5pdCB0ZXN0LCBNb2NrTmdSZWR1eCB3aWxsIGdpdmUgdGhlbSB0aGUgdmFsdWVzXG4gICAqIHlvdSBwdXNoZWQgb250byB5b3VyIHN0dWIuXG4gICAqL1xuICBzdGF0aWMgZ2V0U2VsZWN0b3JTdHViPFIsIFM+KFxuICAgIHNlbGVjdG9yPzogU2VsZWN0b3I8UiwgUz4sXG4gICAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4gICk6IFN1YmplY3Q8Uz4ge1xuICAgIHJldHVybiBNb2NrTmdSZWR1eC5nZXRJbnN0YW5jZSgpLm1vY2tSb290U3RvcmUuZ2V0U2VsZWN0b3JTdHViPFM+KFxuICAgICAgc2VsZWN0b3IsXG4gICAgICBjb21wYXJhdG9yLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG1vY2sgc3Vic3RvcmUgdGhhdCBhbGxvd3MgeW91IHRvIHNldCB1cCBzZWxlY3RvclN0dWJzIGZvclxuICAgKiBhbnkgJ2ZyYWN0YWwnIHN0b3JlcyB5b3VyIGFwcCBjcmVhdGVzIHdpdGggTmdSZWR1eC5jb25maWd1cmVTdWJTdG9yZS5cbiAgICpcbiAgICogSWYgeW91ciBhcHAgY3JlYXRlcyBkZWVwbHkgbmVzdGVkIHN1YnN0b3JlcyBmcm9tIG90aGVyIHN1YnN0b3JlcyxcbiAgICogcGFzcyB0aGUgY2hhaW4gb2YgcGF0aFNlbGVjdG9ycyBpbiBhcyBvcmRlcmVkIGFyZ3VtZW50cyB0byBtb2NrXG4gICAqIHRoZSBuZXN0ZWQgc3Vic3RvcmVzIG91dC5cbiAgICogQHBhcmFtIHBhdGhTZWxlY3RvcnNcbiAgICovXG4gIHN0YXRpYyBnZXRTdWJTdG9yZTxTPihcbiAgICAuLi5wYXRoU2VsZWN0b3JzOiBQYXRoU2VsZWN0b3JbXVxuICApOiBNb2NrT2JzZXJ2YWJsZVN0b3JlPFM+IHtcbiAgICByZXR1cm4gcGF0aFNlbGVjdG9ycy5sZW5ndGhcbiAgICAgID8gTW9ja05nUmVkdXguZ2V0SW5zdGFuY2UoKS5tb2NrUm9vdFN0b3JlLmdldFN1YlN0b3JlKC4uLnBhdGhTZWxlY3RvcnMpXG4gICAgICA6IE1vY2tOZ1JlZHV4LmdldEluc3RhbmNlKCkubW9ja1Jvb3RTdG9yZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBhbGwgcHJldmlvdXNseSBjb25maWd1cmVkIHN0dWJzLlxuICAgKi9cbiAgc3RhdGljIHJlc2V0KCk6IHZvaWQge1xuICAgIE1vY2tOZ1JlZHV4LmdldEluc3RhbmNlKCkubW9ja1Jvb3RTdG9yZS5yZXNldCgpO1xuICAgIE5nUmVkdXguaW5zdGFuY2UgPSBNb2NrTmdSZWR1eC5tb2NrSW5zdGFuY2UgYXMgYW55O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNpbmdsZXRvbiBNb2NrTmdSZWR1eCBpbnN0YW5jZS4gVXNlZnVsIGZvciBjYXNlcyB3aGVyZSB5b3VyXG4gICAqIHRlc3RzIG5lZWQgdG8gc3B5IG9uIHN0b3JlIG1ldGhvZHMsIGZvciBleGFtcGxlLlxuICAgKi9cbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgIE1vY2tOZ1JlZHV4Lm1vY2tJbnN0YW5jZSA9IE1vY2tOZ1JlZHV4Lm1vY2tJbnN0YW5jZSB8fCBuZXcgTW9ja05nUmVkdXgoKTtcbiAgICByZXR1cm4gTW9ja05nUmVkdXgubW9ja0luc3RhbmNlO1xuICB9XG4gIC8vXG4gIHByaXZhdGUgbW9ja1Jvb3RTdG9yZSA9IG5ldyBNb2NrT2JzZXJ2YWJsZVN0b3JlPGFueT4oKTtcblxuICBjb25maWd1cmVTdWJTdG9yZSA9IHRoaXMubW9ja1Jvb3RTdG9yZS5jb25maWd1cmVTdWJTdG9yZSBhcyBhbnk7XG4gIGRpc3BhdGNoID0gdGhpcy5tb2NrUm9vdFN0b3JlLmRpc3BhdGNoIGFzIERpc3BhdGNoPGFueT47XG4gIGdldFN0YXRlID0gdGhpcy5tb2NrUm9vdFN0b3JlLmdldFN0YXRlIGFzIGFueTtcbiAgc3Vic2NyaWJlID0gdGhpcy5tb2NrUm9vdFN0b3JlLnN1YnNjcmliZTtcbiAgcmVwbGFjZVJlZHVjZXIgPSB0aGlzLm1vY2tSb290U3RvcmUucmVwbGFjZVJlZHVjZXI7XG4gIHNlbGVjdDogPFNlbGVjdGVkVHlwZT4oXG4gICAgc2VsZWN0b3I/OiBTZWxlY3RvcjxULCBTZWxlY3RlZFR5cGU+LFxuICAgIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuICApID0+IE9ic2VydmFibGU8U2VsZWN0ZWRUeXBlPiA9IHRoaXMubW9ja1Jvb3RTdG9yZS5zZWxlY3Q7XG5cbiAgLyoqIEBoaWRkZW4gKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICAvLyBUaGlzIGhvb2tzIHRoZSBtb2NrIHVwIHRvIEBzZWxlY3QuXG4gICAgTmdSZWR1eC5pbnN0YW5jZSA9IHRoaXMgYXMgYW55O1xuICB9XG5cbiAgcHJvdmlkZVN0b3JlID0gKF86IFN0b3JlPGFueT4pOiB2b2lkID0+IHVuZGVmaW5lZDtcbiAgY29uZmlndXJlU3RvcmUgPSAoXG4gICAgXzogUmVkdWNlcjxhbnksIEFueUFjdGlvbj4sXG4gICAgX186IGFueSxcbiAgICBfX18/OiBNaWRkbGV3YXJlW10sXG4gICAgX19fXz86IFN0b3JlRW5oYW5jZXI8YW55PltdLFxuICApOiB2b2lkID0+IHVuZGVmaW5lZDtcbn1cbiJdfQ==