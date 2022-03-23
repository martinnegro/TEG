import { Army_Country } from "../../db/models/Army_Country";
import { Country } from "../../db/models/Country";
import { User_Game } from "../../db/models/User_Game";

const armysCountriesInstances = async (countriesByPlayer: number[],players: User_Game[],countries: Country[]) => {
    for (let i = 0; i < countriesByPlayer.length; i++) {
        const player = players.find( p => p.order === i + 1)
        const initialIndex = i * countriesByPlayer[i]
        const toAddCountries = countries.slice(initialIndex, initialIndex + countriesByPlayer[i]);
        const armies_countries = toAddCountries.map((country) => {
            return {
                id_country: country.id,
                id_user_game: player!.id,
                armys_qty: 1
            }
        });
    
        await Army_Country.bulkCreate(armies_countries);
    }

};

export default armysCountriesInstances;


