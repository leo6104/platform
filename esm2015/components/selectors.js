import { getIn } from '../utils/get-in';
/** @hidden */
export const sniffSelectorType = (selector) => !selector
    ? 'nil'
    : Array.isArray(selector)
        ? 'path'
        : 'function' === typeof selector
            ? 'function'
            : 'property';
/** @hidden */
export const resolver = (selector) => ({
    property: (state) => state ? state[selector] : undefined,
    path: (state) => getIn(state, selector),
    function: selector,
    nil: (state) => state,
});
/** @hidden */
export const resolveToFunctionSelector = (selector) => resolver(selector)[sniffSelectorType(selector)];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUF5QnhDLGNBQWM7QUFDZCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxDQUMvQixRQUFpQyxFQUNqQyxFQUFFLENBQ0YsQ0FBQyxRQUFRO0lBQ1AsQ0FBQyxDQUFDLEtBQUs7SUFDUCxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQyxDQUFDLE1BQU07UUFDUixDQUFDLENBQUMsVUFBVSxLQUFLLE9BQU8sUUFBUTtZQUNoQyxDQUFDLENBQUMsVUFBVTtZQUNaLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFFakIsY0FBYztBQUNkLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxDQUFlLFFBQWlDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUUsUUFBUSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FDdkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0lBQ3pELElBQUksRUFBRSxDQUFDLEtBQWdCLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsUUFBd0IsQ0FBQztJQUNsRSxRQUFRLEVBQUUsUUFBMEM7SUFDcEQsR0FBRyxFQUFFLENBQUMsS0FBZ0IsRUFBRSxFQUFFLENBQUMsS0FBSztDQUNqQyxDQUFDLENBQUM7QUFFSCxjQUFjO0FBQ2QsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsQ0FDdkMsUUFBaUMsRUFDakMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZ2V0SW4gfSBmcm9tICcuLi91dGlscy9nZXQtaW4nO1xuXG4vKipcbiAqIEN1c3RvbSBlcXVhbGl0eSBjaGVja2VyIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBgLnNlbGVjdGAgYW5kIGBAc2VsZWN0YC5cbiAqIGBgYHRzXG4gKiBjb25zdCBjdXN0b21Db21wYXJlOiBDb21wYXJhdG9yID0gKHg6IGFueSwgeTogYW55KSA9PiB7XG4gKiAgcmV0dXJuIHguaWQgPT09IHkuaWRcbiAqIH1cbiAqXG4gKiBAc2VsZWN0KHNlbGVjdG9yLCBjdXN0b21Db21wYXJlKVxuICogYGBgXG4gKi9cbmV4cG9ydCB0eXBlIENvbXBhcmF0b3IgPSAoeDogYW55LCB5OiBhbnkpID0+IGJvb2xlYW47XG5leHBvcnQgdHlwZSBUcmFuc2Zvcm1lcjxSb290U3RhdGUsIFY+ID0gKFxuICBzdG9yZSQ6IE9ic2VydmFibGU8Um9vdFN0YXRlPixcbiAgc2NvcGU6IGFueSxcbikgPT4gT2JzZXJ2YWJsZTxWPjtcbmV4cG9ydCB0eXBlIFByb3BlcnR5U2VsZWN0b3IgPSBzdHJpbmcgfCBudW1iZXIgfCBzeW1ib2w7XG5leHBvcnQgdHlwZSBQYXRoU2VsZWN0b3IgPSAoc3RyaW5nIHwgbnVtYmVyKVtdO1xuZXhwb3J0IHR5cGUgRnVuY3Rpb25TZWxlY3RvcjxSb290U3RhdGUsIFM+ID0gKHM6IFJvb3RTdGF0ZSkgPT4gUztcbmV4cG9ydCB0eXBlIFNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4gPVxuICB8IFByb3BlcnR5U2VsZWN0b3JcbiAgfCBQYXRoU2VsZWN0b3JcbiAgfCBGdW5jdGlvblNlbGVjdG9yPFJvb3RTdGF0ZSwgUz47XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY29uc3Qgc25pZmZTZWxlY3RvclR5cGUgPSA8Um9vdFN0YXRlLCBTPihcbiAgc2VsZWN0b3I/OiBTZWxlY3RvcjxSb290U3RhdGUsIFM+LFxuKSA9PlxuICAhc2VsZWN0b3JcbiAgICA/ICduaWwnXG4gICAgOiBBcnJheS5pc0FycmF5KHNlbGVjdG9yKVxuICAgID8gJ3BhdGgnXG4gICAgOiAnZnVuY3Rpb24nID09PSB0eXBlb2Ygc2VsZWN0b3JcbiAgICA/ICdmdW5jdGlvbidcbiAgICA6ICdwcm9wZXJ0eSc7XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY29uc3QgcmVzb2x2ZXIgPSA8Um9vdFN0YXRlLCBTPihzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4pID0+ICh7XG4gIHByb3BlcnR5OiAoc3RhdGU6IGFueSkgPT5cbiAgICBzdGF0ZSA/IHN0YXRlW3NlbGVjdG9yIGFzIFByb3BlcnR5U2VsZWN0b3JdIDogdW5kZWZpbmVkLFxuICBwYXRoOiAoc3RhdGU6IFJvb3RTdGF0ZSkgPT4gZ2V0SW4oc3RhdGUsIHNlbGVjdG9yIGFzIFBhdGhTZWxlY3RvciksXG4gIGZ1bmN0aW9uOiBzZWxlY3RvciBhcyBGdW5jdGlvblNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4sXG4gIG5pbDogKHN0YXRlOiBSb290U3RhdGUpID0+IHN0YXRlLFxufSk7XG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgY29uc3QgcmVzb2x2ZVRvRnVuY3Rpb25TZWxlY3RvciA9IDxSb290U3RhdGUsIFM+KFxuICBzZWxlY3Rvcj86IFNlbGVjdG9yPFJvb3RTdGF0ZSwgUz4sXG4pID0+IHJlc29sdmVyKHNlbGVjdG9yKVtzbmlmZlNlbGVjdG9yVHlwZShzZWxlY3RvcildO1xuIl19