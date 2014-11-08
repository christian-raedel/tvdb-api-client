var Xml2Json = require('../lib/xml2json')
    , expect = require('chai').expect;

describe('Xml2Json#constructor', function () {
    it('should instantiates', function () {
        expect(new Xml2Json({})).to.be.an.instanceof(Xml2Json);
        expect(Xml2Json.createBuilder({})).to.be.an.instanceof(Xml2Json);
    });
});

describe('Xml2Json', function () {
    var xml = '<root><nodeA>valueA</nodeA><nodeB>2</nodeB></root>';

    it('should convert to JSON', function () {
        var builder = Xml2Json.createBuilder({root: {nodeA: 'string', nodeB: 'int'}});
        builder.feed(xml);
        expect(builder.xml).to.be.deep.equal([xml]);
        expect(builder.end()).to.be.deep.equal([{string: 'valueA', int: 2}]);
    });
});
