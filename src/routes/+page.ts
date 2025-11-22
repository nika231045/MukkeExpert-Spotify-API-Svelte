import SpotifyApi from "$lib/SpotifyApi";
import usersData from "$lib/user.json";
import { error } from "@sveltejs/kit";

export const load = async () => {
    try {
        const token = await SpotifyApi.getToken();


        return {
            token,
            usersData
        };
    } catch (err) {
        console.error("Fehler beim Abrufen des Tokens:", err);
        throw error(500, "Ein unerwarteter Fehler ist aufgetreten.");
    }
};
