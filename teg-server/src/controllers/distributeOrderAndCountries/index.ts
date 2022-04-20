import { Country } from "../../db/models/Country";
import { Game } from "../../db/models/Game";
import { User_Game } from "../../db/models/User_Game";

import shuffle from './shuffle'
import countriesQty from "./countriesQty";
import armysCountriesInstances from "./armysCountriesInstances";

const distributePlayers = async (game: Game) => {
    await game.update({ id_status: 2 })
    // Array de Jugadores sin orden
    const players = await User_Game.findAll({
        where: { id_game: game.id },
        attributes: ['id']
    })

    // Creación Array con orden aleatorio
    const orderArray = players.map((_e,i) => i + 1);
    
    shuffle(orderArray);
    
    
    // Update de user_game con el orden anterior.
    players.forEach(async (p,i) => {
        p.order = orderArray[i];
        if (orderArray[i] === 1) await game.update({ id_next_player: p.id })
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

    await game.update({ id_status: 3 })

};

export default distributePlayers;

