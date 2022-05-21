import Country from "../../db/models/Country";
import Player from "../../db/models/Player";

const countriesQty = (countries: Country[], players: Player[]): number[] => {
    const countriesByPlayer = Math.floor(countries.length / players.length);
    const remainder = countries.length % players.length
    const auxArray = new Array(players.length).fill(countriesByPlayer);
    if ( remainder > 0 ) {
        for (let i = 0; i < remainder; i++) {
            auxArray[i] += 1;
        }
    }
    return auxArray;
};

export default countriesQty;