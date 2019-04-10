import { Api } from '../src/api';

window.urls = {
    players: {
        info: '/player/info', // tag_id
        stat: '/player/stat', // tag_id, season_id, tournament_id,
        table: '/player/table', // tag_id, season_id
        calendar: '/player/calendar', // tag_id, season_id, tournament_id, count, offset, type=[`prev`,`next`]
        seasons: '/player/seasons/:tagId/:seasonId',
    },
};

const api = new Api('/api/v1', {});

// Get/Set endpoints
api.find('players.info'); // => /player/info

api.endpoint('players.info'); // => /api/v1/player/info

api.setEndpoints(window.urls);

// SET HEADERS
api.setHeaders([
    { name: 'X-Fsign', value: 'SW9D1eZo' },
    { name: 'X-GeoIP', value: '1' },
    { name: 'X-Requested-With', value: 'XMLHttpRequest' },
]);

api.setHeader('X-Fsign', 'SW9D1eZo')
    .setHeader('X-GeoIP', '1')
    .setHeader('X-Requested-With', 'XMLHttpRequest')
    .createHttp();

// Make requests
api.request('players.info', {
    method: 'POST',
    params: { date: '2019-05-04' }
}).then(console.log);

api.request('players.seasons', {
    method: 'GET', // Get set as default
    urlParams: {
        tagId: '100500',
        seasonId: 220
    }
}).then(console.log);

// When you need other methods create issues and i added their special for you

