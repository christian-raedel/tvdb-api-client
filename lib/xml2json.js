var cheerio = require('cheerio')
    , _     = require('lodash');

function Xml2Json(mapping) {
    if (_.isPlainObject(mapping)) {
        this.mapping = mapping;
    } else {
        throw new TypeError('Xml2Json requires a mapping object!');
    }
    this.xml = [];
    this.data = [];
}

Xml2Json.prototype.feed = function(chunk) {
    this.xml.push(chunk);
    return this;
};

Xml2Json.prototype.end = function() {
    var $ = cheerio.load(this.xml.join(''));
    _.forOwn(this.mapping, function (mapping, selector) {
        var self = this;
        $(selector).each(function () {
            var item = {};
            _.forOwn(mapping, function (field, mapping) {
                var value = $(this).find(mapping).text();
                var int = _.parseInt(value);
                if (_.isNaN(int)) {
                    item[field] = value;
                } else {
                    item[field] = int;
                }
            }, this);
            self.data.push(item);
        });
        return false;
    }, this);
    return this.data;
};

module.exports = Xml2Json;

function createBuilder(mapping) {
    return new Xml2Json(mapping);
}

module.exports.createBuilder = createBuilder;
