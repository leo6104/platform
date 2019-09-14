import { NgRedux } from '../components/ng-redux';
import { getBaseStore } from './helpers';
/**
 * Auto-dispatches the return value of the decorated function.
 *
 * Decorate a function creator method with @dispatch and its return
 * value will automatically be passed to ngRedux.dispatch() for you.
 */
export function dispatch() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1yZWR1eC9zdG9yZS8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvZGlzcGF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFekM7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsUUFBUTtJQUN0QixPQUFPLFNBQVMsUUFBUSxDQUN0QixNQUFjLEVBQ2QsR0FBNkIsRUFDN0IsVUFBK0I7UUFFL0IsSUFBSSxjQUE0QixDQUFDO1FBRWpDLElBQU0sT0FBTyxHQUFHO1lBQXdCLGNBQVk7aUJBQVosVUFBWSxFQUFaLHFCQUFZLEVBQVosSUFBWTtnQkFBWix5QkFBWTs7WUFDbEQsSUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDaEQsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUN4QixJQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQztnQkFDckQsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDeEI7YUFDRjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztRQUVGLFVBQVUsR0FBRyxVQUFVLElBQUksTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV4RSxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDNUIsSUFBTSxrQkFBa0IsR0FBdUI7Z0JBQzdDLEdBQUcsRUFBRSxjQUFNLE9BQUEsT0FBTyxFQUFQLENBQU87Z0JBQ2xCLEdBQUcsRUFBRSxVQUFBLFNBQVMsSUFBSSxPQUFBLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQyxFQUE1QixDQUE0QjthQUMvQyxDQUFDO1lBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDdkQsT0FBTyxrQkFBa0IsQ0FBQztTQUMzQjthQUFNO1lBQ0wsY0FBYyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDbEMsVUFBVSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDM0IsT0FBTyxVQUFVLENBQUM7U0FDbkI7SUFDSCxDQUFDLENBQUM7QUFDSixDQUFDO0FBQ0QsaUJBQWlCO0FBQ2pCLGtEQUFrRDtBQUNsRCwrRkFBK0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICcuLi9jb21wb25lbnRzL25nLXJlZHV4JztcbmltcG9ydCB7IGdldEJhc2VTdG9yZSB9IGZyb20gJy4vaGVscGVycyc7XG5cbi8qKlxuICogQXV0by1kaXNwYXRjaGVzIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGRlY29yYXRlZCBmdW5jdGlvbi5cbiAqXG4gKiBEZWNvcmF0ZSBhIGZ1bmN0aW9uIGNyZWF0b3IgbWV0aG9kIHdpdGggQGRpc3BhdGNoIGFuZCBpdHMgcmV0dXJuXG4gKiB2YWx1ZSB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgcGFzc2VkIHRvIG5nUmVkdXguZGlzcGF0Y2goKSBmb3IgeW91LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2goKTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdGUoXG4gICAgdGFyZ2V0OiBvYmplY3QsXG4gICAga2V5OiBzdHJpbmcgfCBzeW1ib2wgfCBudW1iZXIsXG4gICAgZGVzY3JpcHRvcj86IFByb3BlcnR5RGVzY3JpcHRvcixcbiAgKTogUHJvcGVydHlEZXNjcmlwdG9yIHtcbiAgICBsZXQgb3JpZ2luYWxNZXRob2Q6ICgpID0+IEFjdGlvbjtcblxuICAgIGNvbnN0IHdyYXBwZWQgPSBmdW5jdGlvbih0aGlzOiB1bmtub3duLCAuLi5hcmdzOiBhbnkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IHN0b3JlID0gZ2V0QmFzZVN0b3JlKHRoaXMpIHx8IE5nUmVkdXguaW5zdGFuY2U7XG4gICAgICAgIGlmIChzdG9yZSkge1xuICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9yIHx8IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuXG4gICAgaWYgKGRlc2NyaXB0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgZGlzcGF0Y2hEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XG4gICAgICAgIGdldDogKCkgPT4gd3JhcHBlZCxcbiAgICAgICAgc2V0OiBzZXRNZXRob2QgPT4gKG9yaWdpbmFsTWV0aG9kID0gc2V0TWV0aG9kKSxcbiAgICAgIH07XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRpc3BhdGNoRGVzY3JpcHRvcik7XG4gICAgICByZXR1cm4gZGlzcGF0Y2hEZXNjcmlwdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICBkZXNjcmlwdG9yLnZhbHVlID0gd3JhcHBlZDtcbiAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgIH1cbiAgfTtcbn1cbi8vIGdldCBkZXNjcmlwdG9yXG4vLyBpZiBubyBkZXNjcmlwdG9yLCBjcmVhdGUgb25lIHdpdGggZ2V0dGVyIHNldHRlclxuLy8gaWYgZGVzY3JpcHRvciwgc2V0IG9yaWdpbmFsIG1ldGhvZCB0byBkZXNjcmlwdG9yLCBhbmQgdGhlbiBiaW5kIHRoZSB3cmFwcGVkIGZ1bmN0aW9uIGluc3RlYWRcbiJdfQ==