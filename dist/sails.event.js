export var Verb = {
    CREATED: "created",
    UPDATED: "updated",
    ADDED: "added",
    DESTROYED: "destroyed",
    REMOVED: "removed",
};
var SailsEvent = /** @class */ (function () {
    function SailsEvent(JWR, ack) {
        this.JWR = JWR;
        this.ack = ack;
    }
    SailsEvent.prototype.isCreated = function () {
        return this.getVerb() === Verb.CREATED;
    };
    SailsEvent.prototype.isUpdated = function () {
        return this.getVerb() === Verb.UPDATED;
    };
    SailsEvent.prototype.isDestroyed = function () {
        return this.getVerb() === Verb.DESTROYED;
    };
    SailsEvent.prototype.isAdded = function () {
        return this.getVerb() === Verb.ADDED;
    };
    SailsEvent.prototype.isRemoved = function () {
        return this.getVerb() === Verb.REMOVED;
    };
    SailsEvent.prototype.getVerb = function () {
        return this.JWR.verb;
    };
    SailsEvent.prototype.getData = function () {
        return this.JWR.data;
    };
    SailsEvent.prototype.getId = function () {
        return this.JWR.id;
    };
    SailsEvent.prototype.hasAck = function () {
        return !!this.ack;
    };
    SailsEvent.prototype.acknowledge = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (!this.ack)
            return false;
        this.ack.apply(this, params);
        return true;
    };
    return SailsEvent;
}());
export { SailsEvent };
//# sourceMappingURL=sails.event.js.map