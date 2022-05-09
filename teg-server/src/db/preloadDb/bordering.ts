const bordering = [
    // Alaska
    {
        countryId: 1,
        borderingCountryId: 2
    },{
        countryId: 1,
        borderingCountryId: 4
    },{
        countryId: 1,
        borderingCountryId: 23
    },
    // Canada
    {
        countryId: 2,
        borderingCountryId: 1
    },{
        countryId: 2,
        borderingCountryId: 4
    },{
        countryId: 2,
        borderingCountryId: 3
    },
    // Groenlandia
    {
        countryId: 3,
        borderingCountryId: 2
    },{
        countryId: 3,
        borderingCountryId: 4
    },{
        countryId: 3,
        borderingCountryId: 5
    },{
        countryId: 3,
        borderingCountryId: 11
    },
    // Estados Unidos
    {
        countryId: 4,
        borderingCountryId: 1
    },{
        countryId: 4,
        borderingCountryId: 2
    },{
        countryId: 4,
        borderingCountryId: 3
    },{
        countryId: 4,
        borderingCountryId: 5
    },{
        countryId: 4,
        borderingCountryId: 6
    },
    // Nueva York
    {
        countryId: 5,
        borderingCountryId: 3
    },{
        countryId: 5,
        borderingCountryId: 4
    },{
        countryId: 5,
        borderingCountryId: 6
    },
    // México
    {
        countryId: 6,
        borderingCountryId: 4
    },{
        countryId: 6,
        borderingCountryId: 5
    },{
        countryId: 6,
        borderingCountryId: 7
    },
    // Colombia
    {
        countryId: 7,
        borderingCountryId: 6
    },{
        countryId: 7,
        borderingCountryId: 8
    },{
        countryId: 7,
        borderingCountryId: 9
    },
    // Brasil
    {
        countryId: 8,
        borderingCountryId: 7
    },{
        countryId: 8,
        borderingCountryId: 9
    },{
        countryId: 8,
        borderingCountryId: 10
    },{
        countryId: 8,
        borderingCountryId: 17
    },
    // Chile
    {
        countryId: 9,
        borderingCountryId: 7
    },{
        countryId: 9,
        borderingCountryId: 8
    },{
        countryId: 9,
        borderingCountryId: 10
    },{
        countryId: 9,
        borderingCountryId: 32
    },
    // Argentina
    {
        countryId: 10,
        borderingCountryId: 8
    },{
        countryId: 10,
        borderingCountryId: 9
    },
    // Islandia
    {
        countryId: 11,
        borderingCountryId: 3
    },{
        countryId: 11,
        borderingCountryId: 12
    },{
        countryId: 11,
        borderingCountryId: 14
    },
    // Gran Bretaña
    {
        countryId: 12,
        borderingCountryId: 11
    },{
        countryId: 12,
        borderingCountryId: 13
    },
    // España
    {
        countryId: 13,
        borderingCountryId: 12
    },{
        countryId: 13,
        borderingCountryId: 16
    },{
        countryId: 13,
        borderingCountryId: 17
    },
    // Suecia
    {
        countryId: 14,
        borderingCountryId: 11
    },{
        countryId: 14,
        borderingCountryId: 15
    },
    // Rusia
    {
        countryId: 15,
        borderingCountryId: 14
    },{
        countryId: 15,
        borderingCountryId: 21
    },{
        countryId: 15,
        borderingCountryId: 24
    },{
        countryId: 15,
        borderingCountryId: 27
    },{
        countryId: 15,
        borderingCountryId: 16
    },
    // Alemania
    {
        countryId: 16,
        borderingCountryId: 13
    },{
        countryId: 16,
        borderingCountryId: 15
    },{
        countryId: 16,
        borderingCountryId: 27
    },
    // Sahara
    {
        countryId: 17,
        borderingCountryId: 13
    },{
        countryId: 17,
        borderingCountryId: 8
    },{
        countryId: 17,
        borderingCountryId: 18
    },{
        countryId: 17,
        borderingCountryId: 19
    },{
        countryId: 17,
        borderingCountryId: 20
    },
    // Egipto
    {
        countryId: 18,
        borderingCountryId: 17
    },{
        countryId: 18,
        borderingCountryId: 19
    },{
        countryId: 18,
        borderingCountryId: 27
    },
    // Etiopía
    {
        countryId: 19,
        borderingCountryId: 17
    },{
        countryId: 19,
        borderingCountryId: 18
    },{
        countryId: 19,
        borderingCountryId: 20
    },
    // Sudáfrica
    {
        countryId: 20,
        borderingCountryId: 19
    },{
        countryId: 20,
        borderingCountryId: 17
    },
    // Siberia
    {
        countryId: 21,
        borderingCountryId: 15
    },{
        countryId: 21,
        borderingCountryId: 22
    },{
        countryId: 21,
        borderingCountryId: 24
    },
    // Mongolia
    {
        countryId: 22,
        borderingCountryId: 21
    },{
        countryId: 22,
        borderingCountryId: 24
    },{
        countryId: 22,
        borderingCountryId: 25
    },{
        countryId: 22,
        borderingCountryId: 23
    },
    // Kamchatka
    {
        countryId: 23,
        borderingCountryId: 1
    },{
        countryId: 23,
        borderingCountryId: 22
    },{
        countryId: 23,
        borderingCountryId: 25
    },{
        countryId: 23,
        borderingCountryId: 26
    },
    // Irán
    {
        countryId: 24,
        borderingCountryId: 15
    },{
        countryId: 24,
        borderingCountryId: 21
    },{
        countryId: 24,
        borderingCountryId: 22
    },{
        countryId: 24,
        borderingCountryId: 25
    },{
        countryId: 24,
        borderingCountryId: 27
    },{
        countryId: 24,
        borderingCountryId: 28
    },
    // China
    {
        countryId: 25,
        borderingCountryId: 22
    },{
        countryId: 25,
        borderingCountryId: 23
    },{
        countryId: 25,
        borderingCountryId: 24
    },{
        countryId: 25,
        borderingCountryId: 26
    },{
        countryId: 25,
        borderingCountryId: 28
    },
    // Japón
    {
        countryId: 26,
        borderingCountryId: 23
    },{
        countryId: 26,
        borderingCountryId: 25
    },
    // Turquía
    {
        countryId: 27,
        borderingCountryId: 15
    },{
        countryId: 27,
        borderingCountryId: 16
    },{
        countryId: 27,
        borderingCountryId: 24
    },{
        countryId: 27,
        borderingCountryId: 28
    },{
        countryId: 27,
        borderingCountryId: 29
    },{
        countryId: 27,
        borderingCountryId: 18
    },
    // Malasia
    {
        countryId: 28,
        borderingCountryId: 24
    },{
        countryId: 28,
        borderingCountryId: 25
    },{
        countryId: 28,
        borderingCountryId: 27
    },{
        countryId: 28,
        borderingCountryId: 29
    },{
        countryId: 28,
        borderingCountryId: 31
    },
    // India
    {
        countryId: 29,
        borderingCountryId: 27
    },{
        countryId: 29,
        borderingCountryId: 28
    },{
        countryId: 29,
        borderingCountryId: 30
    },
    // Sumatra
    {
        countryId: 30,
        borderingCountryId: 29
    },{
        countryId: 30,
        borderingCountryId: 32
    },
    // Borneo
    {
        countryId: 31,
        borderingCountryId: 28
    },{
        countryId: 31,
        borderingCountryId: 32
    },
    // Australia
    {
        countryId: 32,
        borderingCountryId: 30
    },{
        countryId: 32,
        borderingCountryId: 31
    },{
        countryId: 32,
        borderingCountryId: 9
    }
]

export default bordering;