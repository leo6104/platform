import { distinctUntilChanged, map } from 'rxjs/operators';
import { getIn } from '../utils/get-in';
import { registerFractalReducer, replaceLocalReducer, } from './fractal-reducer-map';
import { resolveToFunctionSelector, } from './selectors';
/** @hidden */
export class SubStore {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViLXN0b3JlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3N1Yi1zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIsbUJBQW1CLEdBQ3BCLE1BQU0sdUJBQXVCLENBQUM7QUFHL0IsT0FBTyxFQUdMLHlCQUF5QixHQUUxQixNQUFNLGFBQWEsQ0FBQztBQUVyQixjQUFjO0FBQ2QsTUFBTSxPQUFPLFFBQVE7SUFDbkIsWUFDVSxTQUF1QixFQUN2QixRQUFzQixFQUM5QixZQUF1QztRQUYvQixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3ZCLGFBQVEsR0FBUixRQUFRLENBQWM7UUFNaEMsYUFBUSxHQUF3QixNQUFNLENBQUMsRUFBRSxDQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsbUJBQ2pCLE1BQWMsSUFDbEIsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQzNELENBQUM7UUFFTCxhQUFRLEdBQUcsR0FBVSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhFLHNCQUFpQixHQUFHLENBQ2xCLFFBQXNCLEVBQ3RCLFlBQTBDLEVBQ2YsRUFBRSxDQUM3QixJQUFJLFFBQVEsQ0FDVixJQUFJLENBQUMsU0FBUyxFQUNkLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQy9CLFlBQVksQ0FDYixDQUFDO1FBRUosV0FBTSxHQUFHLENBQ1AsUUFBeUMsRUFDekMsVUFBdUIsRUFDSSxFQUFFLENBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQzlDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUN4QyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FDakMsQ0FBQztRQUVKLGNBQVMsR0FBRyxDQUFDLFFBQW9CLEVBQWdCLEVBQUU7WUFDakQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2RCxPQUFPLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxDQUFDLENBQUM7UUFFRixtQkFBYyxHQUFHLENBQUMsZ0JBQTJDLEVBQUUsRUFBRSxDQUMvRCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFwQ3JELHNCQUFzQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBb0NGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW55QWN0aW9uLCBEaXNwYXRjaCwgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGdldEluIH0gZnJvbSAnLi4vdXRpbHMvZ2V0LWluJztcbmltcG9ydCB7XG4gIHJlZ2lzdGVyRnJhY3RhbFJlZHVjZXIsXG4gIHJlcGxhY2VMb2NhbFJlZHVjZXIsXG59IGZyb20gJy4vZnJhY3RhbC1yZWR1Y2VyLW1hcCc7XG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnLi9uZy1yZWR1eCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlU3RvcmUgfSBmcm9tICcuL29ic2VydmFibGUtc3RvcmUnO1xuaW1wb3J0IHtcbiAgQ29tcGFyYXRvcixcbiAgUGF0aFNlbGVjdG9yLFxuICByZXNvbHZlVG9GdW5jdGlvblNlbGVjdG9yLFxuICBTZWxlY3Rvcixcbn0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG4vKiogQGhpZGRlbiAqL1xuZXhwb3J0IGNsYXNzIFN1YlN0b3JlPFN0YXRlPiBpbXBsZW1lbnRzIE9ic2VydmFibGVTdG9yZTxTdGF0ZT4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvb3RTdG9yZTogTmdSZWR1eDxhbnk+LFxuICAgIHByaXZhdGUgYmFzZVBhdGg6IFBhdGhTZWxlY3RvcixcbiAgICBsb2NhbFJlZHVjZXI6IFJlZHVjZXI8U3RhdGUsIEFueUFjdGlvbj4sXG4gICkge1xuICAgIHJlZ2lzdGVyRnJhY3RhbFJlZHVjZXIoYmFzZVBhdGgsIGxvY2FsUmVkdWNlcik7XG4gIH1cblxuICBkaXNwYXRjaDogRGlzcGF0Y2g8QW55QWN0aW9uPiA9IGFjdGlvbiA9PlxuICAgIHRoaXMucm9vdFN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIC4uLihhY3Rpb24gYXMgYW55KSxcbiAgICAgICdAYW5ndWxhci1yZWR1eDo6ZnJhY3RhbGtleSc6IEpTT04uc3RyaW5naWZ5KHRoaXMuYmFzZVBhdGgpLFxuICAgIH0pO1xuXG4gIGdldFN0YXRlID0gKCk6IFN0YXRlID0+IGdldEluKHRoaXMucm9vdFN0b3JlLmdldFN0YXRlKCksIHRoaXMuYmFzZVBhdGgpO1xuXG4gIGNvbmZpZ3VyZVN1YlN0b3JlID0gPFN1YlN0YXRlPihcbiAgICBiYXNlUGF0aDogUGF0aFNlbGVjdG9yLFxuICAgIGxvY2FsUmVkdWNlcjogUmVkdWNlcjxTdWJTdGF0ZSwgQW55QWN0aW9uPixcbiAgKTogT2JzZXJ2YWJsZVN0b3JlPFN1YlN0YXRlPiA9PlxuICAgIG5ldyBTdWJTdG9yZTxTdWJTdGF0ZT4oXG4gICAgICB0aGlzLnJvb3RTdG9yZSxcbiAgICAgIFsuLi50aGlzLmJhc2VQYXRoLCAuLi5iYXNlUGF0aF0sXG4gICAgICBsb2NhbFJlZHVjZXIsXG4gICAgKTtcblxuICBzZWxlY3QgPSA8U2VsZWN0ZWRTdGF0ZT4oXG4gICAgc2VsZWN0b3I/OiBTZWxlY3RvcjxTdGF0ZSwgU2VsZWN0ZWRTdGF0ZT4sXG4gICAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4gICk6IE9ic2VydmFibGU8U2VsZWN0ZWRTdGF0ZT4gPT5cbiAgICB0aGlzLnJvb3RTdG9yZS5zZWxlY3Q8U3RhdGU+KHRoaXMuYmFzZVBhdGgpLnBpcGUoXG4gICAgICBtYXAocmVzb2x2ZVRvRnVuY3Rpb25TZWxlY3RvcihzZWxlY3RvcikpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoY29tcGFyYXRvciksXG4gICAgKTtcblxuICBzdWJzY3JpYmUgPSAobGlzdGVuZXI6ICgpID0+IHZvaWQpOiAoKCkgPT4gdm9pZCkgPT4ge1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHRoaXMuc2VsZWN0KCkuc3Vic2NyaWJlKGxpc3RlbmVyKTtcbiAgICByZXR1cm4gKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH07XG5cbiAgcmVwbGFjZVJlZHVjZXIgPSAobmV4dExvY2FsUmVkdWNlcjogUmVkdWNlcjxTdGF0ZSwgQW55QWN0aW9uPikgPT5cbiAgICByZXBsYWNlTG9jYWxSZWR1Y2VyKHRoaXMuYmFzZVBhdGgsIG5leHRMb2NhbFJlZHVjZXIpO1xufVxuIl19