


export const settingsDefault = [
    {
        section_name: 'general',
        options: [

        ]
    },
    {
        section_name: 'region',
        options: [
            {
                name: 'theme',
                type: 'string',
                value: 'light',
            },
            {
                name: 'starting_day',
                type: 'string',
                value: 'mon',
            }
        ]
    },
    {
        section_name: 'privacy',
        options: [
            {
                name: 'stay_logged_in',
                type: 'boolean',
                value: 'false',
            },
            {
                name: 'max_session_length',
                type: 'number',
                value: '30',
            }
        ]
    }
]