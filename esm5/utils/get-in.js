import * as tslib_1 from "tslib";
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
    var _a = tslib_1.__read(pathElems), firstElem = _a[0], restElems = _a.slice(1);
    if (undefined === v[firstElem]) {
        return undefined;
    }
    if (restElems.length === 0) {
        return v[firstElem];
    }
    return getIn(v[firstElem], restElems);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWluLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJ1dGlscy9nZXQtaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLEtBQUssQ0FDbkIsQ0FBa0IsRUFDbEIsU0FBOEI7SUFFOUIsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNOLE9BQU8sQ0FBQyxDQUFDO0tBQ1Y7SUFFRCxtRUFBbUU7SUFDbkUsSUFBSSxVQUFVLEtBQUssT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFO1FBQ2pDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUMzQjtJQUVLLElBQUEsOEJBQXFDLEVBQXBDLGlCQUFTLEVBQUUsdUJBQXlCLENBQUM7SUFFNUMsSUFBSSxTQUFTLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzlCLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0lBRUQsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUMxQixPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNyQjtJQUVELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN4QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBHZXRzIGEgZGVlcGx5LW5lc3RlZCBwcm9wZXJ0eSB2YWx1ZSBmcm9tIGFuIG9iamVjdCwgZ2l2ZW4gYSAncGF0aCdcbiAqIG9mIHByb3BlcnR5IG5hbWVzIG9yIGFycmF5IGluZGljZXMuXG4gKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW4oXG4gIHY6IGFueSB8IHVuZGVmaW5lZCxcbiAgcGF0aEVsZW1zOiAoc3RyaW5nIHwgbnVtYmVyKVtdLFxuKTogYW55IHwgdW5kZWZpbmVkIHtcbiAgaWYgKCF2KSB7XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICAvLyBJZiB0aGlzIGlzIGFuIEltbXV0YWJsZUpTIHN0cnVjdHVyZSwgdXNlIGV4aXN0aW5nIGdldEluIGZ1bmN0aW9uXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2Ygdi5nZXRJbikge1xuICAgIHJldHVybiB2LmdldEluKHBhdGhFbGVtcyk7XG4gIH1cblxuICBjb25zdCBbZmlyc3RFbGVtLCAuLi5yZXN0RWxlbXNdID0gcGF0aEVsZW1zO1xuXG4gIGlmICh1bmRlZmluZWQgPT09IHZbZmlyc3RFbGVtXSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAocmVzdEVsZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB2W2ZpcnN0RWxlbV07XG4gIH1cblxuICByZXR1cm4gZ2V0SW4odltmaXJzdEVsZW1dLCByZXN0RWxlbXMpO1xufVxuIl19