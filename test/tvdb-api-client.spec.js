var client   = require('../lib/tvdb-api-client')
    , expect = require('chai').expect
    , _      = require('lodash');

describe('tvdb-api-client#fetchLanguages', function () {
    it('should get a list of supported languages', function (done) {
        client.fetchLanguages()
        .then(function (languages) {
            var item = _.find(languages, {id: 14});
            expect(item).to.have.property('name', 'Deutsch');
            expect(item).to.have.property('abbreviation', 'de');
            done();
        })
        .catch(done)
        .done();
    });
});

describe('tvdb-api-client#fetchSeries', function () {
    it('should get a list of matched series', function (done) {
        client.fetchSeries('Apartment 23', 'de')
        .then(function (serieslist) {
            var item = _.find(serieslist, {id: 248812, language: 'de'});
            expect(item).to.have.property('name', 'Apartment 23');
            expect(item).to.have.property('firstAired', 2012);
            done();
        })
        .catch(done)
        .done();
    });
});

describe('tvdb-api-client#fetchEpisodes', function () {
    it('should get a list of episodes for a seriesid', function (done) {
        client.fetchEpisodes(248812, 'de')
        .then(function (episodeslist) {
            var item = _.find(episodeslist, {id: 4558191});
            expect(item).to.have.property('name', 'Chloes Traum');
            expect(item).to.have.property('seriesid', 248812);
            done();
        })
        .catch(done)
        .done();
    });
});
