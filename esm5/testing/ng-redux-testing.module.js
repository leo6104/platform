import * as tslib_1 from "tslib";
// TODO: See if this linting rule can be enabled with new build process (ng-packagr)
// tslint:disable:no-implicit-dependencies
import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { MockDevToolsExtension } from './dev-tools.mock';
import { MockNgRedux } from './ng-redux.mock';
// Needs to be initialized early so @select's use the mocked version too.
var mockNgRedux = MockNgRedux.getInstance();
/** @hidden */
export function _mockNgReduxFactory() {
    return mockNgRedux;
}
var NgReduxTestingModule = /** @class */ (function () {
    function NgReduxTestingModule() {
    }
    NgReduxTestingModule = tslib_1.__decorate([
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
export { NgReduxTestingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVkdXgtdGVzdGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS90ZXN0aW5nLyIsInNvdXJjZXMiOlsibmctcmVkdXgtdGVzdGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9GQUFvRjtBQUNwRiwwQ0FBMEM7QUFDMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTlDLHlFQUF5RTtBQUN6RSxJQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7QUFFOUMsY0FBYztBQUNkLE1BQU0sVUFBVSxtQkFBbUI7SUFDakMsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQVNEO0lBQUE7SUFBbUMsQ0FBQztJQUF2QixvQkFBb0I7UUFQaEMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRTtnQkFDckQsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFO2FBQ2hFO1NBQ0YsQ0FBQztPQUNXLG9CQUFvQixDQUFHO0lBQUQsMkJBQUM7Q0FBQSxBQUFwQyxJQUFvQztTQUF2QixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUT0RPOiBTZWUgaWYgdGhpcyBsaW50aW5nIHJ1bGUgY2FuIGJlIGVuYWJsZWQgd2l0aCBuZXcgYnVpbGQgcHJvY2VzcyAobmctcGFja2Fncilcbi8vIHRzbGludDpkaXNhYmxlOm5vLWltcGxpY2l0LWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgRGV2VG9vbHNFeHRlbnNpb24sIE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9ja0RldlRvb2xzRXh0ZW5zaW9uIH0gZnJvbSAnLi9kZXYtdG9vbHMubW9jayc7XG5pbXBvcnQgeyBNb2NrTmdSZWR1eCB9IGZyb20gJy4vbmctcmVkdXgubW9jayc7XG5cbi8vIE5lZWRzIHRvIGJlIGluaXRpYWxpemVkIGVhcmx5IHNvIEBzZWxlY3QncyB1c2UgdGhlIG1vY2tlZCB2ZXJzaW9uIHRvby5cbmNvbnN0IG1vY2tOZ1JlZHV4ID0gTW9ja05nUmVkdXguZ2V0SW5zdGFuY2UoKTtcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbW9ja05nUmVkdXhGYWN0b3J5KCkge1xuICByZXR1cm4gbW9ja05nUmVkdXg7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE5nUmVkdXgsIHVzZUZhY3Rvcnk6IF9tb2NrTmdSZWR1eEZhY3RvcnkgfSxcbiAgICB7IHByb3ZpZGU6IERldlRvb2xzRXh0ZW5zaW9uLCB1c2VDbGFzczogTW9ja0RldlRvb2xzRXh0ZW5zaW9uIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVkdXhUZXN0aW5nTW9kdWxlIHt9XG4iXX0=