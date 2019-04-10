import { toCamelCase } from '../dist/react-parts';

const mockData = [
    {
        'league_id': 1,
        'league_name': 'English Premier League',
        'league_country': 'England',
        'teams': [
            {
                'team_id': 1,
                'team_name': 'Manchester United',
                'team_place': 1,
                'players': [
                    {
                        'player_id': 1,
                        'player_first_name': 'Paul',
                        'player_last_name': 'Pogba',
                    },
                    {
                        'player_id': 2,
                        'player_first_name': 'Marcus',
                        'player_last_name': 'Rashford',
                    },
                ]
            },
            {
                'team_id': 2,
                'team_name': 'Manchester City',
                'team_place': 2,
                'players': [
                    {
                        'player_id': 3,
                        'player_first_name': 'Sergio',
                        'player_last_name': 'Aguero',
                    },
                    {
                        'player_id': 4,
                        'player_first_name': 'Raheem',
                        'player_last_name': 'Sterling',
                    },
                ]
            },
            {
                'team_id': 3,
                'team_name': 'Liverpool',
                'team_place': 3,
                'players': [
                    {
                        'player_id': 5,
                        'player_first_name': 'Sadio',
                        'player_last_name': 'Mane',
                    },
                    {
                        'player_id': 6,
                        'player_first_name': 'Mohamed',
                        'player_last_name': 'Salah',
                    },
                ]
            },
        ]
    },
    {
        'league_id': 2,
        'league_name': 'La Liga',
        'league_country': 'Spanish',
        'teams': [
            {
                'team_id': 4,
                'team_name': 'Barcelona',
                'team_place': 1,
                'players': [
                    {
                        'player_id': 7,
                        'player_first_name': 'Lionel',
                        'player_last_name': 'Messi',
                    },
                    {
                        'player_id': 8,
                        'player_first_name': 'Luis',
                        'player_last_name': 'Suarez',
                    },
                ]
            },
            {
                'team_id': 5,
                'team_name': 'Real Madrid',
                'team_place': 2,
                'players': [
                    {
                        'player_id': 9,
                        'player_first_name': 'Karim',
                        'player_last_name': 'Benzema',
                    },
                    {
                        'player_id': 10,
                        'player_first_name': 'Marco',
                        'player_last_name': 'Assensio',
                    },
                ]
            },
            {
                'team_id': 6,
                'team_name': 'Atlético',
                'team_place': 3,
                'players': [
                    {
                        'player_id': 11,
                        'player_first_name': 'Antoine',
                        'player_last_name': 'Griezmann',
                    },
                    {
                        'player_id': 12,
                        'player_first_name': 'Diego',
                        'player_last_name': 'Costa',
                    },
                ]
            },
        ]
    },
];

const Players = (player) => {
    console.group('Player');
    console.log('info', player);
    console.groupEnd();
};
const Teams = (team) => {
    console.group('Team');
    console.log('info', team);
    for(const player of team.players) {
        Players(player);
    }
    console.groupEnd();
};

const League = (league) => {
    console.group('League');
    console.log('info', league);
    for(const team of league.teams) {
        Teams(team);
    }
    console.groupEnd();
};

// default response transform
for(const league of toCamelCase(mockData)) {
    League(league);
}

// response transform with deep option
for(const league of toCamelCase(mockData, { deep: true })) {
    League(league);
}
