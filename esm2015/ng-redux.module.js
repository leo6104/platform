import * as tslib_1 from "tslib";
import { NgModule, NgZone } from '@angular/core';
import { DevToolsExtension } from './components/dev-tools';
import { NgRedux } from './components/ng-redux';
import { RootStore } from './components/root-store';
/** @hidden */
export function _ngReduxFactory(ngZone) {
    return new RootStore(ngZone);
}
let NgReduxModule = class NgReduxModule {
};
NgReduxModule = tslib_1.__decorate([
    NgModule({
        providers: [
            DevToolsExtension,
            { provide: NgRedux, useFactory: _ngReduxFactory, deps: [NgZone] },
        ],
    })
], NgReduxModule);
export { NgReduxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVkdXgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJuZy1yZWR1eC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFcEQsY0FBYztBQUNkLE1BQU0sVUFBVSxlQUFlLENBQUMsTUFBYztJQUM1QyxPQUFPLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFRRCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0NBQUcsQ0FBQTtBQUFoQixhQUFhO0lBTnpCLFFBQVEsQ0FBQztRQUNSLFNBQVMsRUFBRTtZQUNULGlCQUFpQjtZQUNqQixFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtTQUNsRTtLQUNGLENBQUM7R0FDVyxhQUFhLENBQUc7U0FBaEIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERldlRvb2xzRXh0ZW5zaW9uIH0gZnJvbSAnLi9jb21wb25lbnRzL2Rldi10b29scyc7XG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnLi9jb21wb25lbnRzL25nLXJlZHV4JztcbmltcG9ydCB7IFJvb3RTdG9yZSB9IGZyb20gJy4vY29tcG9uZW50cy9yb290LXN0b3JlJztcblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbmdSZWR1eEZhY3Rvcnkobmdab25lOiBOZ1pvbmUpIHtcbiAgcmV0dXJuIG5ldyBSb290U3RvcmUobmdab25lKTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGV2VG9vbHNFeHRlbnNpb24sXG4gICAgeyBwcm92aWRlOiBOZ1JlZHV4LCB1c2VGYWN0b3J5OiBfbmdSZWR1eEZhY3RvcnksIGRlcHM6IFtOZ1pvbmVdIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVkdXhNb2R1bGUge31cbiJdfQ==