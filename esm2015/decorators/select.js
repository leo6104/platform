import { getInstanceSelection } from './helpers';
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
export function select(selector, comparator) {
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
export function select$(selector, transformer, comparator) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sVUFBVSxNQUFNLENBQ3BCLFFBQTJCLEVBQzNCLFVBQXVCO0lBRXZCLE9BQU8sQ0FBQyxNQUFXLEVBQUUsR0FBb0IsRUFBUSxFQUFFO1FBQ2pELE1BQU0sZ0JBQWdCLEdBQUcsUUFBUTtZQUMvQixDQUFDLENBQUMsUUFBUTtZQUNWLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDekQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ1IsUUFBUSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxVQUFVLE9BQU8sQ0FDckIsUUFBMEIsRUFDMUIsV0FBZ0MsRUFDaEMsVUFBdUI7SUFFdkIsT0FBTyxRQUFRLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRUQsU0FBUyxRQUFRLENBQ2YsUUFBNEIsRUFDNUIsV0FBbUMsRUFDbkMsVUFBdUI7SUFFdkIsT0FBTyxTQUFTLFNBQVMsQ0FBQyxNQUFXLEVBQUUsR0FBRztRQUN4QyxTQUFTLE1BQU07WUFDYixPQUFPLG9CQUFvQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBRUQsd0VBQXdFO1FBQ3hFLElBQUksT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNqQyxHQUFHLEVBQUUsTUFBTTtnQkFDWCxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsWUFBWSxFQUFFLElBQUk7YUFDbkIsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcGFyYXRvciwgU2VsZWN0b3IsIFRyYW5zZm9ybWVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3RvcnMnO1xuaW1wb3J0IHsgZ2V0SW5zdGFuY2VTZWxlY3Rpb24gfSBmcm9tICcuL2hlbHBlcnMnO1xuXG4vKipcbiAqIFNlbGVjdHMgYW4gb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIGF0dGFjaGVzIGl0IHRvIHRoZSBkZWNvcmF0ZWRcbiAqIHByb3BlcnR5LlxuICpcbiAqIGBgYHRzXG4gKiAgaW1wb3J0IHsgc2VsZWN0IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuICpcbiAqICBjbGFzcyBTb21lQ2xhc3Mge1xuICogICAgQHNlbGVjdChbJ2ZvbycsJ2JhciddKSBmb28kOiBPYnNlcnZhYmxlPHN0cmluZz5cbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBzZWxlY3RvclxuICogQSBzZWxlY3RvciBmdW5jdGlvbiwgcHJvcGVydHkgbmFtZSBzdHJpbmcsIG9yIHByb3BlcnR5IG5hbWUgcGF0aFxuICogKGFycmF5IG9mIHN0cmluZ3MvYXJyYXkgaW5kaWNlcykgdGhhdCBsb2NhdGVzIHRoZSBzdG9yZSBkYXRhIHRvIGJlXG4gKiBzZWxlY3RlZFxuICpcbiAqIEBwYXJhbSBjb21wYXJhdG9yIEZ1bmN0aW9uIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoaXMgc2VsZWN0b3IgaGFzIGNoYW5nZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VD4oXG4gIHNlbGVjdG9yPzogU2VsZWN0b3I8YW55LCBUPixcbiAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4pOiBQcm9wZXJ0eURlY29yYXRvciB7XG4gIHJldHVybiAodGFyZ2V0OiBhbnksIGtleTogc3RyaW5nIHwgc3ltYm9sKTogdm9pZCA9PiB7XG4gICAgY29uc3QgYWRqdXN0ZWRTZWxlY3RvciA9IHNlbGVjdG9yXG4gICAgICA/IHNlbGVjdG9yXG4gICAgICA6IFN0cmluZyhrZXkpLmxhc3RJbmRleE9mKCckJykgPT09IFN0cmluZyhrZXkpLmxlbmd0aCAtIDFcbiAgICAgID8gU3RyaW5nKGtleSkuc3Vic3RyaW5nKDAsIFN0cmluZyhrZXkpLmxlbmd0aCAtIDEpXG4gICAgICA6IGtleTtcbiAgICBkZWNvcmF0ZShhZGp1c3RlZFNlbGVjdG9yLCB1bmRlZmluZWQsIGNvbXBhcmF0b3IpKHRhcmdldCwga2V5KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBTZWxlY3RzIGFuIG9ic2VydmFibGUgdXNpbmcgdGhlIGdpdmVuIHBhdGggc2VsZWN0b3IsIGFuZCBydW5zIGl0IHRocm91Z2ggdGhlXG4gKiBnaXZlbiB0cmFuc2Zvcm1lciBmdW5jdGlvbi4gQSB0cmFuc2Zvcm1lciBmdW5jdGlvbiB0YWtlcyB0aGUgc3RvcmVcbiAqIG9ic2VydmFibGUgYXMgYW4gaW5wdXQgYW5kIHJldHVybnMgYSBkZXJpdmVkIG9ic2VydmFibGUgZnJvbSBpdC4gVGhhdCBkZXJpdmVkXG4gKiAgb2JzZXJ2YWJsZSBpcyBydW4gdGhyb3VnaCBkaXN0aW5jdFVudGlsQ2hhbmdlcyB3aXRoIHRoZSBnaXZlbiBvcHRpb25hbFxuICogY29tcGFyYXRvciBhbmQgYXR0YWNoZWQgdG8gdGhlIHN0b3JlIHByb3BlcnR5LlxuICpcbiAqIFRoaW5rIG9mIGEgVHJhbnNmb3JtZXIgYXMgYSBGdW5jdGlvblNlbGVjdG9yIHRoYXQgb3BlcmF0ZXMgb24gb2JzZXJ2YWJsZXNcbiAqIGluc3RlYWQgb2YgdmFsdWVzLlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBzZWxlY3QkIH0gZnJvbSAnYW5ndWxhci1yZWR1eC9zdG9yZSc7XG4gKlxuICogZXhwb3J0IGNvbnN0IGRlYm91bmNlQW5kVHJpcGxlID0gb2JzJCA9PiBvYnMkXG4gKiAgLmRlYm91bmNlKDMwMClcbiAqICAubWFwKHggPT4gMyAqIHgpO1xuICpcbiAqIGNsYXNzIEZvbyB7XG4gKiAgQHNlbGVjdCQoWydmb28nLCAnYmFyJ10sIGRlYm91bmNlQW5kVHJpcGxlKVxuICogIHJlYWRvbmx5IGRlYm91bmNlZEZvb0JhciQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0JDxUPihcbiAgc2VsZWN0b3I6IFNlbGVjdG9yPGFueSwgVD4sXG4gIHRyYW5zZm9ybWVyOiBUcmFuc2Zvcm1lcjxhbnksIFQ+LFxuICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbik6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIGRlY29yYXRlKHNlbGVjdG9yLCB0cmFuc2Zvcm1lciwgY29tcGFyYXRvcik7XG59XG5cbmZ1bmN0aW9uIGRlY29yYXRlKFxuICBzZWxlY3RvcjogU2VsZWN0b3I8YW55LCBhbnk+LFxuICB0cmFuc2Zvcm1lcj86IFRyYW5zZm9ybWVyPGFueSwgYW55PixcbiAgY29tcGFyYXRvcj86IENvbXBhcmF0b3IsXG4pOiBQcm9wZXJ0eURlY29yYXRvciB7XG4gIHJldHVybiBmdW5jdGlvbiBkZWNvcmF0b3IodGFyZ2V0OiBhbnksIGtleSk6IHZvaWQge1xuICAgIGZ1bmN0aW9uIGdldHRlcih0aGlzOiBhbnkpIHtcbiAgICAgIHJldHVybiBnZXRJbnN0YW5jZVNlbGVjdGlvbih0aGlzLCBrZXksIHNlbGVjdG9yLCB0cmFuc2Zvcm1lciwgY29tcGFyYXRvcik7XG4gICAgfVxuXG4gICAgLy8gUmVwbGFjZSBkZWNvcmF0ZWQgcHJvcGVydHkgd2l0aCBhIGdldHRlciB0aGF0IHJldHVybnMgdGhlIG9ic2VydmFibGUuXG4gICAgaWYgKGRlbGV0ZSB0YXJnZXRba2V5XSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iXX0=