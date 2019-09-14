import * as tslib_1 from "tslib";
/**
 * Sets a deeply-nested property value from an object, given a 'path'
 * of property names or array indices. Path elements are created if
 * not there already. Does not mutate the given object.
 *
 * @hidden
 */
export var setIn = function (obj, _a, value) {
    var _b, _c;
    var _d = tslib_1.__read(_a), firstElem = _d[0], restElems = _d.slice(1);
    return 'function' === typeof (obj[firstElem] || {}).setIn
        ? tslib_1.__assign({}, obj, (_b = {}, _b[firstElem] = obj[firstElem].setIn(restElems, value), _b)) : tslib_1.__assign({}, obj, (_c = {}, _c[firstElem] = restElems.length === 0
        ? value
        : setIn(obj[firstElem] || {}, restElems, value), _c));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWluLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcmVkdXgvc3RvcmUvIiwic291cmNlcyI6WyJ1dGlscy9zZXQtaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRztBQUNILE1BQU0sQ0FBQyxJQUFNLEtBQUssR0FBRyxVQUNuQixHQUFRLEVBQ1IsRUFBOEMsRUFDOUMsS0FBVTs7UUFEVix1QkFBOEMsRUFBN0MsaUJBQVMsRUFBRSx1QkFBWTtJQUd4QixPQUFBLFVBQVUsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUs7UUFDaEQsQ0FBQyxzQkFDTSxHQUFHLGVBQ0wsU0FBUyxJQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxPQUV2RCxDQUFDLHNCQUNNLEdBQUcsZUFDTCxTQUFTLElBQ1IsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxLQUFLO1FBQ1AsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsTUFDcEQ7QUFYTCxDQVdLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFNldHMgYSBkZWVwbHktbmVzdGVkIHByb3BlcnR5IHZhbHVlIGZyb20gYW4gb2JqZWN0LCBnaXZlbiBhICdwYXRoJ1xuICogb2YgcHJvcGVydHkgbmFtZXMgb3IgYXJyYXkgaW5kaWNlcy4gUGF0aCBlbGVtZW50cyBhcmUgY3JlYXRlZCBpZlxuICogbm90IHRoZXJlIGFscmVhZHkuIERvZXMgbm90IG11dGF0ZSB0aGUgZ2l2ZW4gb2JqZWN0LlxuICpcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNvbnN0IHNldEluID0gKFxuICBvYmo6IGFueSxcbiAgW2ZpcnN0RWxlbSwgLi4ucmVzdEVsZW1zXTogKHN0cmluZyB8IG51bWJlcilbXSxcbiAgdmFsdWU6IGFueSxcbik6IG9iamVjdCA9PlxuICAnZnVuY3Rpb24nID09PSB0eXBlb2YgKG9ialtmaXJzdEVsZW1dIHx8IHt9KS5zZXRJblxuICAgID8ge1xuICAgICAgICAuLi5vYmosXG4gICAgICAgIFtmaXJzdEVsZW1dOiBvYmpbZmlyc3RFbGVtXS5zZXRJbihyZXN0RWxlbXMsIHZhbHVlKSxcbiAgICAgIH1cbiAgICA6IHtcbiAgICAgICAgLi4ub2JqLFxuICAgICAgICBbZmlyc3RFbGVtXTpcbiAgICAgICAgICByZXN0RWxlbXMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICA/IHZhbHVlXG4gICAgICAgICAgICA6IHNldEluKG9ialtmaXJzdEVsZW1dIHx8IHt9LCByZXN0RWxlbXMsIHZhbHVlKSxcbiAgICAgIH07XG4iXX0=