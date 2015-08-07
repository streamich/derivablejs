/// <reference path="./node_modules/havelock/dist/havelock.d.ts"/>
/// <reference path="./node_modules/immutable/dist/immutable.d.ts"/>
var havelock_1 = require('havelock');
function makeRoot() {
    var root = havelock_1.atom(window.location.hash);
    window.addEventListener('hashchange', function () { return root.set(window.location.hash); });
    return root;
}
var root = havelock_1.atom("");
var immutable_1 = require('immutable');
var route = root.derive(function (root) {
    var params = immutable_1.Map();
    root = root.trim();
    switch (root) {
        case "":
        case "#":
        case "#/":
            return { parts: immutable_1.List([]), params: params };
        default:
            var paramsIdx = root.indexOf("?");
            if (paramsIdx >= 0) {
                params = parseParams(root.slice(paramsIdx + 1));
                root = root.slice(2, paramsIdx);
            }
            else {
                root = root.slice(2);
            }
            return { parts: immutable_1.List(root.split("/")), params: params };
    }
});
function parseParams(str) {
    var result = immutable_1.Map().asMutable();
    var parts = str.split(/&/);
    for (var _i = 0; _i < parts.length; _i++) {
        var part = parts[_i];
        var equalsIdx = part.indexOf("=");
        if (equalsIdx >= 0) {
            result.set(part.slice(0, equalsIdx), part.slice(equalsIdx + 1));
        }
        else {
            result.set(part, "");
        }
    }
    return result;
}
console.log(route.get());
root.set("#/route");
console.log(route.get());
root.set("#/some/route");
console.log(route.get());
root.set("#/some/route/with?a=param");
console.log(route.get());
root.set("#/some/route/with?a=param&more=params&others&evenmore");
console.log(route.get());
var routeParts = route.derive(function (r) { return r.parts; });
var chosenRoute = routeParts.derive(null);
