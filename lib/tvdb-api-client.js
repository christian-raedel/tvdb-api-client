var Xml2Json = require('./xml2json')
    , agent  = require('superagent')
    , url    = require('url')
    , q      = require('q')
    , _      = require('lodash');

var baseurl = 'http://thetvdb.com/api/';
var apikey = '66019AFB50EA6280';

var languageCache = [];

function fetchLanguages() {
    return q.Promise(function (resolve, reject) {
        if (!languageCache.length) {
            agent.get(url.parse(baseurl + apikey + '/languages.xml'))
            .accept('text/xml')
            .on('error', reject)
            .end(function (response) {
                if (!response.ok) {
                    reject(new Error('Fetching languages got response status: ' + response.statusCode));
                } else {
                    var builder = Xml2Json.createBuilder({
                        'Language': {
                            'id': 'id',
                            'name': 'name',
                            'abbreviation': 'abbreviation'
                        }
                    });
                    languageCache = builder.feed(response.text).end();
                    resolve(languageCache);
                }
            });
        } else {
            resolve(languageCache);
        }
    });
}

module.exports.fetchLanguages = fetchLanguages;

function fetchSeries(name, language) {
    language = language || 'all';
    return q.Promise(function (resolve, reject) {
        if (_.isString(name) && _.isString(language)) {
            agent.get(url.parse(baseurl + 'GetSeries.php'))
            .query({seriesname: name})
            .query({language: language})
            .accept('text/xml')
            .on('error', reject)
            .end(function (response) {
                if (!response.ok) {
                    reject(new Error('Fetching series got response status: ' + response.statusCode));
                } else {
                    var builder = Xml2Json.createBuilder({
                        'Series': {
                            'seriesid': 'id',
                            'SeriesName': 'name',
                            'AliasNames': 'alias',
                            'language': 'language',
                            'banner': 'banner',
                            'Overview': 'overview',
                            'FirstAired': 'firstAired',
                            'Network': 'network',
                            'IMDB_ID': 'imdbId'
                        }
                    });
                    resolve(builder.feed(response.text).end());
                }
            });
        } else {
            reject(new TypeError('Arguments to fetch series must be strings!'));
        }
    });
}

module.exports.fetchSeries = fetchSeries;

function fetchEpisodes(id, language) {
    language = language || 'en';
    return q.Promise(function (resolve, reject) {
        if (_.isNumber(id) && _.isString(language)) {
            agent.get(url.parse(baseurl + apikey + '/series/' + id + '/all/' + language + '.xml'))
            .accept('text/xml')
            .on('error', reject)
            .end(function (response) {
                if (!response.ok) {
                    reject(new Error('Fetching episodes got response status: ' + response.statusCode));
                } else {
                    var builder = Xml2Json.createBuilder({
                        'Episode': {
                            'id': 'id',
                            'EpisodeName': 'name',
                            'Combined_episodenumber': 'episode',
                            'Combined_season': 'season',
                            'seasonid': 'seasonid',
                            'seriesid': 'seriesid'
                        }
                    });
                    resolve(builder.feed(response.text).end());
                }
            });
        } else {
            reject(new TypeError('Arguments to fetch episodes must be a number and a string!'));
        }
    });
}

module.exports.fetchEpisodes = fetchEpisodes;
