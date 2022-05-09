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
        title: 'Segunda ronda, incorporando ejércitos',
        description: 'Se agregan 3 ejércitos por jugador'
    },{
        id: 5,
        title: 'Jugador incorpora ejércitos',
        description: 'El jugador debe agregar tantos ejércitos como la mitad de los países que posea'
    },{
        id: 6,
        title: 'Jugador ataca',
        description: 'El jugador puede atacar tantas veces como quiera siempre que tenga más de un ejército en el país atacante'
    }


];

export default statuses;