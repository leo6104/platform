/**
 * Gets a deeply-nested property value from an object, given a 'path'
 * of property names or array indices.
 *
 * @hidden
 */
export function getIn(v, pathElems) {
    if (!v) {
        return v;
    }
    // If this is an ImmutableJS structure, use existing getIn function
    if ('function' === typeof v.getIn) {
        return v.getIn(pathElems);
    }
    const [firstElem, ...restElems] = pathElems;
    if (undefined === v[firstElem]) {
        return undefined;
    }
    if (restElems.length === 0) {
        return v[firstElem];
    }
    return getIn(v[firstElem], restElems);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWluLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJ1dGlscy9nZXQtaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsS0FBSyxDQUNuQixDQUFrQixFQUNsQixTQUE4QjtJQUU5QixJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQ04sT0FBTyxDQUFDLENBQUM7S0FDVjtJQUVELG1FQUFtRTtJQUNuRSxJQUFJLFVBQVUsS0FBSyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUU7UUFDakMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzNCO0lBRUQsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUU1QyxJQUFJLFNBQVMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDOUIsT0FBTyxTQUFTLENBQUM7S0FDbEI7SUFFRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzFCLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3JCO0lBRUQsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdldHMgYSBkZWVwbHktbmVzdGVkIHByb3BlcnR5IHZhbHVlIGZyb20gYW4gb2JqZWN0LCBnaXZlbiBhICdwYXRoJ1xuICogb2YgcHJvcGVydHkgbmFtZXMgb3IgYXJyYXkgaW5kaWNlcy5cbiAqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbihcbiAgdjogYW55IHwgdW5kZWZpbmVkLFxuICBwYXRoRWxlbXM6IChzdHJpbmcgfCBudW1iZXIpW10sXG4pOiBhbnkgfCB1bmRlZmluZWQge1xuICBpZiAoIXYpIHtcbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIC8vIElmIHRoaXMgaXMgYW4gSW1tdXRhYmxlSlMgc3RydWN0dXJlLCB1c2UgZXhpc3RpbmcgZ2V0SW4gZnVuY3Rpb25cbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiB2LmdldEluKSB7XG4gICAgcmV0dXJuIHYuZ2V0SW4ocGF0aEVsZW1zKTtcbiAgfVxuXG4gIGNvbnN0IFtmaXJzdEVsZW0sIC4uLnJlc3RFbGVtc10gPSBwYXRoRWxlbXM7XG5cbiAgaWYgKHVuZGVmaW5lZCA9PT0gdltmaXJzdEVsZW1dKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmIChyZXN0RWxlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHZbZmlyc3RFbGVtXTtcbiAgfVxuXG4gIHJldHVybiBnZXRJbih2W2ZpcnN0RWxlbV0sIHJlc3RFbGVtcyk7XG59XG4iXX0=