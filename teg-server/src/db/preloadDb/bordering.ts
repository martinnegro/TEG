const bordering = [
    // Alaska
    {
        id_country: 1,
        id_bordering_country: 2
    },{
        id_country: 1,
        id_bordering_country: 4
    },{
        id_country: 1,
        id_bordering_country: 23
    },
    // Canada
    {
        id_country: 2,
        id_bordering_country: 1
    },{
        id_country: 2,
        id_bordering_country: 4
    },{
        id_country: 2,
        id_bordering_country: 3
    },
    // Groenlandia
    {
        id_country: 3,
        id_bordering_country: 2
    },{
        id_country: 3,
        id_bordering_country: 4
    },{
        id_country: 3,
        id_bordering_country: 5
    },{
        id_country: 3,
        id_bordering_country: 11
    },
    // Estados Unidos
    {
        id_country: 4,
        id_bordering_country: 1
    },{
        id_country: 4,
        id_bordering_country: 2
    },{
        id_country: 4,
        id_bordering_country: 3
    },{
        id_country: 4,
        id_bordering_country: 5
    },{
        id_country: 4,
        id_bordering_country: 6
    },
    // Nueva York
    {
        id_country: 5,
        id_bordering_country: 3
    },{
        id_country: 5,
        id_bordering_country: 4
    },{
        id_country: 5,
        id_bordering_country: 6
    },
    // México
    {
        id_country: 6,
        id_bordering_country: 4
    },{
        id_country: 6,
        id_bordering_country: 5
    },{
        id_country: 6,
        id_bordering_country: 7
    },
    // Colombia
    {
        id_country: 7,
        id_bordering_country: 6
    },{
        id_country: 7,
        id_bordering_country: 8
    },{
        id_country: 7,
        id_bordering_country: 9
    },
    // Brasil
    {
        id_country: 8,
        id_bordering_country: 7
    },{
        id_country: 8,
        id_bordering_country: 9
    },{
        id_country: 8,
        id_bordering_country: 10
    },{
        id_country: 8,
        id_bordering_country: 17
    },
    // Chile
    {
        id_country: 9,
        id_bordering_country: 7
    },{
        id_country: 9,
        id_bordering_country: 8
    },{
        id_country: 9,
        id_bordering_country: 10
    },{
        id_country: 9,
        id_bordering_country: 32
    },
    // Argentina
    {
        id_country: 10,
        id_bordering_country: 8
    },{
        id_country: 10,
        id_bordering_country: 9
    },
    // Islandia
    {
        id_country: 11,
        id_bordering_country: 3
    },{
        id_country: 11,
        id_bordering_country: 12
    },{
        id_country: 11,
        id_bordering_country: 14
    },
    // Gran Bretaña
    {
        id_country: 12,
        id_bordering_country: 11
    },{
        id_country: 12,
        id_bordering_country: 13
    },
    // España
    {
        id_country: 13,
        id_bordering_country: 12
    },{
        id_country: 13,
        id_bordering_country: 16
    },{
        id_country: 13,
        id_bordering_country: 17
    },
    // Suecia
    {
        id_country: 14,
        id_bordering_country: 11
    },{
        id_country: 14,
        id_bordering_country: 15
    },
    // Rusia
    {
        id_country: 15,
        id_bordering_country: 14
    },{
        id_country: 15,
        id_bordering_country: 21
    },{
        id_country: 15,
        id_bordering_country: 24
    },{
        id_country: 15,
        id_bordering_country: 27
    },{
        id_country: 15,
        id_bordering_country: 16
    },
    // Alemania
    {
        id_country: 16,
        id_bordering_country: 13
    },{
        id_country: 16,
        id_bordering_country: 15
    },{
        id_country: 16,
        id_bordering_country: 27
    },
    // Sahara
    {
        id_country: 17,
        id_bordering_country: 13
    },{
        id_country: 17,
        id_bordering_country: 8
    },{
        id_country: 17,
        id_bordering_country: 18
    },{
        id_country: 17,
        id_bordering_country: 19
    },{
        id_country: 17,
        id_bordering_country: 20
    },
    // Egipto
    {
        id_country: 18,
        id_bordering_country: 17
    },{
        id_country: 18,
        id_bordering_country: 19
    },{
        id_country: 18,
        id_bordering_country: 27
    },
    // Etiopía
    {
        id_country: 19,
        id_bordering_country: 17
    },{
        id_country: 19,
        id_bordering_country: 18
    },{
        id_country: 19,
        id_bordering_country: 20
    },
    // Sudáfrica
    {
        id_country: 20,
        id_bordering_country: 19
    },{
        id_country: 20,
        id_bordering_country: 17
    },
    // Siberia
    {
        id_country: 21,
        id_bordering_country: 15
    },{
        id_country: 21,
        id_bordering_country: 22
    },{
        id_country: 21,
        id_bordering_country: 24
    },
    // Mongolia
    {
        id_country: 22,
        id_bordering_country: 21
    },{
        id_country: 22,
        id_bordering_country: 24
    },{
        id_country: 22,
        id_bordering_country: 25
    },{
        id_country: 22,
        id_bordering_country: 23
    },
    // Kamchatka
    {
        id_country: 23,
        id_bordering_country: 1
    },{
        id_country: 23,
        id_bordering_country: 22
    },{
        id_country: 23,
        id_bordering_country: 25
    },{
        id_country: 23,
        id_bordering_country: 26
    },
    // Irán
    {
        id_country: 24,
        id_bordering_country: 15
    },{
        id_country: 24,
        id_bordering_country: 21
    },{
        id_country: 24,
        id_bordering_country: 22
    },{
        id_country: 24,
        id_bordering_country: 25
    },{
        id_country: 24,
        id_bordering_country: 27
    },{
        id_country: 24,
        id_bordering_country: 28
    },
    // China
    {
        id_country: 25,
        id_bordering_country: 22
    },{
        id_country: 25,
        id_bordering_country: 23
    },{
        id_country: 25,
        id_bordering_country: 24
    },{
        id_country: 25,
        id_bordering_country: 26
    },{
        id_country: 25,
        id_bordering_country: 28
    },
    // Japón
    {
        id_country: 26,
        id_bordering_country: 23
    },{
        id_country: 26,
        id_bordering_country: 25
    },
    // Turquía
    {
        id_country: 27,
        id_bordering_country: 15
    },{
        id_country: 27,
        id_bordering_country: 16
    },{
        id_country: 27,
        id_bordering_country: 24
    },{
        id_country: 27,
        id_bordering_country: 28
    },{
        id_country: 27,
        id_bordering_country: 29
    },{
        id_country: 27,
        id_bordering_country: 18
    },
    // Malasia
    {
        id_country: 28,
        id_bordering_country: 24
    },{
        id_country: 28,
        id_bordering_country: 25
    },{
        id_country: 28,
        id_bordering_country: 27
    },{
        id_country: 28,
        id_bordering_country: 29
    },{
        id_country: 28,
        id_bordering_country: 31
    },
    // India
    {
        id_country: 29,
        id_bordering_country: 27
    },{
        id_country: 29,
        id_bordering_country: 28
    },{
        id_country: 29,
        id_bordering_country: 30
    },
    // Sumatra
    {
        id_country: 30,
        id_bordering_country: 29
    },{
        id_country: 30,
        id_bordering_country: 32
    },
    // Borneo
    {
        id_country: 31,
        id_bordering_country: 28
    },{
        id_country: 31,
        id_bordering_country: 32
    },
    // Australia
    {
        id_country: 32,
        id_bordering_country: 30
    },{
        id_country: 32,
        id_bordering_country: 31
    },{
        id_country: 32,
        id_bordering_country: 9
    }
]

export default bordering;