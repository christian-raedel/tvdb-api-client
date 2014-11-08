#thetvdb.com api client#

[Node.js](http://nodejs.org) utility to fetch supported languages, series matched a series name
and the episodes of a series from [thetvdb.com](http://thetvdb.com).

#installation#

```
$ npm install --save git+https://github.com/christian-raedel/tvdb-api-client
```

#usage#

``` JavaScript
var client = require('tvdb-api-client');

client.fetchLanguages().then(console.log);

client.fetchSeries(seriesName, language).then(console.log);

client.fetchEpisodes(seriesId, language).then(console.log);
```

For detailled usage, please have a look at the test specs...
