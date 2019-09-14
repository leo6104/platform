import * as tslib_1 from "tslib";
import { NgModule, NgZone } from '@angular/core';
import { DevToolsExtension } from './components/dev-tools';
import { NgRedux } from './components/ng-redux';
import { RootStore } from './components/root-store';
/** @hidden */
export function _ngReduxFactory(ngZone) {
    return new RootStore(ngZone);
}
var NgReduxModule = /** @class */ (function () {
    function NgReduxModule() {
    }
    NgReduxModule = tslib_1.__decorate([
        NgModule({
            providers: [
                DevToolsExtension,
                { provide: NgRedux, useFactory: _ngReduxFactory, deps: [NgZone] },
            ],
        })
    ], NgReduxModule);
    return NgReduxModule;
}());
export { NgReduxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVkdXgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJuZy1yZWR1eC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFcEQsY0FBYztBQUNkLE1BQU0sVUFBVSxlQUFlLENBQUMsTUFBYztJQUM1QyxPQUFPLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFRRDtJQUFBO0lBQTRCLENBQUM7SUFBaEIsYUFBYTtRQU56QixRQUFRLENBQUM7WUFDUixTQUFTLEVBQUU7Z0JBQ1QsaUJBQWlCO2dCQUNqQixFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTthQUNsRTtTQUNGLENBQUM7T0FDVyxhQUFhLENBQUc7SUFBRCxvQkFBQztDQUFBLEFBQTdCLElBQTZCO1NBQWhCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZXZUb29sc0V4dGVuc2lvbiB9IGZyb20gJy4vY29tcG9uZW50cy9kZXYtdG9vbHMnO1xuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJy4vY29tcG9uZW50cy9uZy1yZWR1eCc7XG5pbXBvcnQgeyBSb290U3RvcmUgfSBmcm9tICcuL2NvbXBvbmVudHMvcm9vdC1zdG9yZSc7XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgZnVuY3Rpb24gX25nUmVkdXhGYWN0b3J5KG5nWm9uZTogTmdab25lKSB7XG4gIHJldHVybiBuZXcgUm9vdFN0b3JlKG5nWm9uZSk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIERldlRvb2xzRXh0ZW5zaW9uLFxuICAgIHsgcHJvdmlkZTogTmdSZWR1eCwgdXNlRmFjdG9yeTogX25nUmVkdXhGYWN0b3J5LCBkZXBzOiBbTmdab25lXSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ1JlZHV4TW9kdWxlIHt9XG4iXX0=