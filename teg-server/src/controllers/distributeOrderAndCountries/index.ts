import Country from "../../db/models/Country";
import Game from "../../db/models/Game";
import Player from "../../db/models/Player";

import shuffle from './shuffle'
import countriesQty from "./countriesQty";
import armysCountriesInstances from "./armysCountriesInstances";

const distributePlayers = async (game: Game) => {
    await game.update({ statusId: 2 })
    // Array de Jugadores sin orden
    const players = await Player.findAll({
        where: { gameId: game.id },
        attributes: ['id']
    })

    // Creación Array con orden aleatorio
    const orderArray = players.map((_e,i) => i + 1);
    
    shuffle(orderArray);
    
    
    // Update de user_game con el orden anterior.
    players.forEach(async (p,i) => {
        p.order = orderArray[i];
        if (orderArray[i] === 1) await game.update({ nextPlayerId: p.id })
        await p.save()
    })

    // Baraja de países
    const countries = await Country.findAll({ attributes: ['id'] });
    shuffle(countries);

    //  Define cantidad de países por jugador en un array.
    //  Agrega el resto a los primeros
    const countriesByPlayer = countriesQty(countries,players)

    // Inserta en DB la relación entre user_game y countri
    await armysCountriesInstances(countriesByPlayer,players,countries, game.id);

    await game.update({ statusId: 3 })

};

export default distributePlayers;

