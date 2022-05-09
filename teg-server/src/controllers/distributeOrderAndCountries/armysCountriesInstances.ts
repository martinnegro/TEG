import ArmyCountry from "../../db/models/ArmyCountry";
import Country from "../../db/models/Country";
import Player from "../../db/models/Player";

const armysCountriesInstances = async (countriesByPlayer: number[],players: Player[],countries: Country[],id_game:string) => {
    for (let i = 0; i < countriesByPlayer.length; i++) {
        const player = players.find( p => p.order === i + 1)
        const initialIndex = i * countriesByPlayer[i]
        const toAddCountries = countries.slice(initialIndex, initialIndex + countriesByPlayer[i]);
        const armiesCountries = toAddCountries.map((country) => {
            return {
                gameId: id_game,
                countryId: country.id,
                playerId: player!.id,
                armiesQty: 1
            }
        });
    
        await ArmyCountry.bulkCreate(armiesCountries);
    }

};

export default armysCountriesInstances;


