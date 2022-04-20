const statuses = [
    {
        id: 0,
        title: 'Creación',
        description: 'Creación de partida. Se asigna usuario creador'
    },{
        id: 1,
        title: 'Inscribiendo',
        description: 'Se inscriben otros usuarios, se asigna numero por orden de llegada, cada jugador elije su color de los disponibles.'
    },{
        id: 2,
        title: 'Repartiendo',
        description: 'Se reparten paises. Se agrega un ejército por país. Se reparten objetivos. Se define primer jugador aleatoriamente.'
    },{
        id: 3,
        title: 'Primera ronda, incorporando ejércitos.',
        description: 'Se agregan 5 ejércitos por jugador'
    },{
        id: 4,
        title: 'Segunda ronda, incorporando ejércitos'
    }

];

export default statuses;