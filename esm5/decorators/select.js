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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sVUFBVSxNQUFNLENBQ3BCLFFBQTJCLEVBQzNCLFVBQXVCO0lBRXZCLE9BQU8sVUFBQyxNQUFXLEVBQUUsR0FBb0I7UUFDdkMsSUFBTSxnQkFBZ0IsR0FBRyxRQUFRO1lBQy9CLENBQUMsQ0FBQyxRQUFRO1lBQ1YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUN6RCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDUixRQUFRLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqRSxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFNLFVBQVUsT0FBTyxDQUNyQixRQUEwQixFQUMxQixXQUFnQyxFQUNoQyxVQUF1QjtJQUV2QixPQUFPLFFBQVEsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FDZixRQUE0QixFQUM1QixXQUFtQyxFQUNuQyxVQUF1QjtJQUV2QixPQUFPLFNBQVMsU0FBUyxDQUFDLE1BQVcsRUFBRSxHQUFHO1FBQ3hDLFNBQVMsTUFBTTtZQUNiLE9BQU8sb0JBQW9CLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFFRCx3RUFBd0U7UUFDeEUsSUFBSSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ2pDLEdBQUcsRUFBRSxNQUFNO2dCQUNYLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDLENBQUM7U0FDSjtJQUNILENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wYXJhdG9yLCBTZWxlY3RvciwgVHJhbnNmb3JtZXIgfSBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdG9ycyc7XG5pbXBvcnQgeyBnZXRJbnN0YW5jZVNlbGVjdGlvbiB9IGZyb20gJy4vaGVscGVycyc7XG5cbi8qKlxuICogU2VsZWN0cyBhbiBvYnNlcnZhYmxlIGZyb20gdGhlIHN0b3JlLCBhbmQgYXR0YWNoZXMgaXQgdG8gdGhlIGRlY29yYXRlZFxuICogcHJvcGVydHkuXG4gKlxuICogYGBgdHNcbiAqICBpbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG4gKlxuICogIGNsYXNzIFNvbWVDbGFzcyB7XG4gKiAgICBAc2VsZWN0KFsnZm9vJywnYmFyJ10pIGZvbyQ6IE9ic2VydmFibGU8c3RyaW5nPlxuICogfVxuICogYGBgXG4gKlxuICogQHBhcmFtIHNlbGVjdG9yXG4gKiBBIHNlbGVjdG9yIGZ1bmN0aW9uLCBwcm9wZXJ0eSBuYW1lIHN0cmluZywgb3IgcHJvcGVydHkgbmFtZSBwYXRoXG4gKiAoYXJyYXkgb2Ygc3RyaW5ncy9hcnJheSBpbmRpY2VzKSB0aGF0IGxvY2F0ZXMgdGhlIHN0b3JlIGRhdGEgdG8gYmVcbiAqIHNlbGVjdGVkXG4gKlxuICogQHBhcmFtIGNvbXBhcmF0b3IgRnVuY3Rpb24gdXNlZCB0byBkZXRlcm1pbmUgaWYgdGhpcyBzZWxlY3RvciBoYXMgY2hhbmdlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxUPihcbiAgc2VsZWN0b3I/OiBTZWxlY3RvcjxhbnksIFQ+LFxuICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbik6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuICh0YXJnZXQ6IGFueSwga2V5OiBzdHJpbmcgfCBzeW1ib2wpOiB2b2lkID0+IHtcbiAgICBjb25zdCBhZGp1c3RlZFNlbGVjdG9yID0gc2VsZWN0b3JcbiAgICAgID8gc2VsZWN0b3JcbiAgICAgIDogU3RyaW5nKGtleSkubGFzdEluZGV4T2YoJyQnKSA9PT0gU3RyaW5nKGtleSkubGVuZ3RoIC0gMVxuICAgICAgPyBTdHJpbmcoa2V5KS5zdWJzdHJpbmcoMCwgU3RyaW5nKGtleSkubGVuZ3RoIC0gMSlcbiAgICAgIDoga2V5O1xuICAgIGRlY29yYXRlKGFkanVzdGVkU2VsZWN0b3IsIHVuZGVmaW5lZCwgY29tcGFyYXRvcikodGFyZ2V0LCBrZXkpO1xuICB9O1xufVxuXG4vKipcbiAqIFNlbGVjdHMgYW4gb2JzZXJ2YWJsZSB1c2luZyB0aGUgZ2l2ZW4gcGF0aCBzZWxlY3RvciwgYW5kIHJ1bnMgaXQgdGhyb3VnaCB0aGVcbiAqIGdpdmVuIHRyYW5zZm9ybWVyIGZ1bmN0aW9uLiBBIHRyYW5zZm9ybWVyIGZ1bmN0aW9uIHRha2VzIHRoZSBzdG9yZVxuICogb2JzZXJ2YWJsZSBhcyBhbiBpbnB1dCBhbmQgcmV0dXJucyBhIGRlcml2ZWQgb2JzZXJ2YWJsZSBmcm9tIGl0LiBUaGF0IGRlcml2ZWRcbiAqICBvYnNlcnZhYmxlIGlzIHJ1biB0aHJvdWdoIGRpc3RpbmN0VW50aWxDaGFuZ2VzIHdpdGggdGhlIGdpdmVuIG9wdGlvbmFsXG4gKiBjb21wYXJhdG9yIGFuZCBhdHRhY2hlZCB0byB0aGUgc3RvcmUgcHJvcGVydHkuXG4gKlxuICogVGhpbmsgb2YgYSBUcmFuc2Zvcm1lciBhcyBhIEZ1bmN0aW9uU2VsZWN0b3IgdGhhdCBvcGVyYXRlcyBvbiBvYnNlcnZhYmxlc1xuICogaW5zdGVhZCBvZiB2YWx1ZXMuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IHNlbGVjdCQgfSBmcm9tICdhbmd1bGFyLXJlZHV4L3N0b3JlJztcbiAqXG4gKiBleHBvcnQgY29uc3QgZGVib3VuY2VBbmRUcmlwbGUgPSBvYnMkID0+IG9icyRcbiAqICAuZGVib3VuY2UoMzAwKVxuICogIC5tYXAoeCA9PiAzICogeCk7XG4gKlxuICogY2xhc3MgRm9vIHtcbiAqICBAc2VsZWN0JChbJ2ZvbycsICdiYXInXSwgZGVib3VuY2VBbmRUcmlwbGUpXG4gKiAgcmVhZG9ubHkgZGVib3VuY2VkRm9vQmFyJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3QkPFQ+KFxuICBzZWxlY3RvcjogU2VsZWN0b3I8YW55LCBUPixcbiAgdHJhbnNmb3JtZXI6IFRyYW5zZm9ybWVyPGFueSwgVD4sXG4gIGNvbXBhcmF0b3I/OiBDb21wYXJhdG9yLFxuKTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICByZXR1cm4gZGVjb3JhdGUoc2VsZWN0b3IsIHRyYW5zZm9ybWVyLCBjb21wYXJhdG9yKTtcbn1cblxuZnVuY3Rpb24gZGVjb3JhdGUoXG4gIHNlbGVjdG9yOiBTZWxlY3RvcjxhbnksIGFueT4sXG4gIHRyYW5zZm9ybWVyPzogVHJhbnNmb3JtZXI8YW55LCBhbnk+LFxuICBjb21wYXJhdG9yPzogQ29tcGFyYXRvcixcbik6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlY29yYXRvcih0YXJnZXQ6IGFueSwga2V5KTogdm9pZCB7XG4gICAgZnVuY3Rpb24gZ2V0dGVyKHRoaXM6IGFueSkge1xuICAgICAgcmV0dXJuIGdldEluc3RhbmNlU2VsZWN0aW9uKHRoaXMsIGtleSwgc2VsZWN0b3IsIHRyYW5zZm9ybWVyLCBjb21wYXJhdG9yKTtcbiAgICB9XG5cbiAgICAvLyBSZXBsYWNlIGRlY29yYXRlZCBwcm9wZXJ0eSB3aXRoIGEgZ2V0dGVyIHRoYXQgcmV0dXJucyB0aGUgb2JzZXJ2YWJsZS5cbiAgICBpZiAoZGVsZXRlIHRhcmdldFtrZXldKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcbiAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==