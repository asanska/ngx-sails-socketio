var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { SailsModel } from "./sails.model";
import { SailsRequest } from "./sails.request";
import { RequestCriteria } from "./sails.request.criteria";
var SailsQuery = /** @class */ (function (_super) {
    __extends(SailsQuery, _super);
    function SailsQuery(sails, modelClass) {
        var _this = _super.call(this, sails) || this;
        _this.modelClass = modelClass;
        _this.errorMsg = "[SailsSocketIO]: the data is not an instance of " + _this.modelClass.name + ".\n        You could SailsModel.serialize<" + _this.modelClass.name + ">(" + _this.modelClass.name + ", data) before doing a SailsQuery action.";
        _this.model = new modelClass();
        return _this;
    }
    Object.defineProperty(SailsQuery.prototype, "model", {
        get: function () {
            return this._model;
        },
        set: function (model) {
            this._model = model;
        },
        enumerable: true,
        configurable: true
    });
    SailsQuery.prototype.find = function () {
        var _this = this;
        this.addParam("where", this.getRequestCriteria());
        var url = "/" + this.model.getEndPoint();
        return this.get(url).then(function (res) {
            if (res.getCode() === "OK") {
                return SailsModel.serialize(_this.modelClass, res.getData());
            }
            throw res;
        });
    };
    SailsQuery.prototype.findById = function (id) {
        var _this = this;
        this.addParam("where", this.getRequestCriteria());
        var url = "/" + this.model.getEndPoint() + "/" + id;
        return this.get(url).then(function (res) {
            if (res.getCode() === "OK") {
                return SailsModel.serialize(_this.modelClass, res.getData());
            }
            throw res;
        });
    };
    SailsQuery.prototype.save = function (model) {
        var _this = this;
        if (!(model instanceof this.modelClass)) {
            throw new TypeError(this.errorMsg);
        }
        var url = "/" + model.getEndPoint();
        var data = Object.assign({}, model);
        if (model.id === null) {
            return this.post(url, data).then(function (res) {
                if (res.getCode() === "CREATED") {
                    return SailsModel.serialize(_this.modelClass, res.getData());
                }
                throw res;
            });
        }
        else {
            return this.put(url.concat("/" + model.id), data).then(function (res) {
                if (res.getCode() === "CREATED") {
                    return SailsModel.serialize(_this.modelClass, res.getData());
                }
                throw res;
            });
        }
    };
    SailsQuery.prototype.update = function (model) {
        var _this = this;
        if (!(model instanceof this.modelClass)) {
            throw new TypeError(this.errorMsg);
        }
        var url = "/" + model.getEndPoint() + "/" + model.id;
        delete model.createdAt;
        delete model.updatedAt;
        var data = Object.assign({}, model);
        return this.put(url, data).then(function (res) {
            if (res.getCode() === "OK") {
                return SailsModel.serialize(_this.modelClass, res.getData());
            }
            throw res;
        });
    };
    SailsQuery.prototype.remove = function (model) {
        var _this = this;
        if (!(model instanceof this.modelClass)) {
            throw new TypeError(this.errorMsg);
        }
        var url = "/" + model.getEndPoint() + "/" + model.id;
        return this.delete(url).then(function (res) {
            if (res.getCode() === "OK") {
                return SailsModel.serialize(_this.modelClass, res.getData());
            }
            throw res;
        });
    };
    SailsQuery.prototype.setLimit = function (limit) {
        this.addParam("limit", limit);
        return this;
    };
    SailsQuery.prototype.setSort = function (sort) {
        this.addParam("sort", sort);
        return this;
    };
    SailsQuery.prototype.setSkip = function (skip) {
        this.addParam("skip", skip);
        return this;
    };
    SailsQuery.prototype.setPopulation = function () {
        var population = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            population[_i] = arguments[_i];
        }
        this.addParam("populate", "[" + population.join(",") + "]");
        return this;
    };
    SailsQuery.prototype.setRequestCriteria = function (criteria) {
        this.criteria = criteria;
        return this;
    };
    SailsQuery.prototype.getRequestCriteria = function () {
        return this.criteria || new RequestCriteria();
    };
    return SailsQuery;
}(SailsRequest));
export { SailsQuery };