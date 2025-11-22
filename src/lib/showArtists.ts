import { get } from "svelte/store"; //get: Wird verwendet, um Werte aus einem Svelte-Store abzurufen. Hier: tokenStore.
import { tokenStore } from "$lib/storage/token";
import type { ArtistInterface } from "$lib/types";

/**
 * Hauptfunktion zum Abrufen der Künstlerdaten
 */
export async function showArtists(): Promise<ArtistInterface[]> {
    // Prüfe, ob Künstler bereits in sessionStorage gespeichert sind
    const storedArtists = sessionStorage.getItem("gameArtists");
    if (storedArtists) {
        console.log("Künstler aus sessionStorage geladen");
        return JSON.parse(storedArtists); // Lade die gespeicherten Künstler
    }

    const token = get(tokenStore); // Token aus dem Store abrufen
    const randomLetter = getRandomLetter(); // Zufälligen Buchstaben generieren

    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(randomLetter)}&type=artist&limit=5`,
        {
            headers: {
                Authorization: `Bearer ${token}`, // Das Authorization-Header und die Syntax deines Requests sind von der Spotify-API vorgegeben
            },
        }
    );

    if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Künstler");
    }

    const data = await response.json(); // Antworte in ein JSON parsen
    console.log("Nach dem JSON-Parsing:", data);

    // Künstlerdaten mappen
    const artists = data.artists.items.map((artist: ArtistInterface) => ({
        name: artist.name,
        image: artist.images[0]?.url || null, // Nimm das erste Bild aus dem Array (falls es existiert)
    }));

    // Künstler in sessionStorage speichern
    sessionStorage.setItem("gameArtists", JSON.stringify(artists));
    console.log("Künstler in sessionStorage gespeichert");

    return artists;
}

/**
 * Funktion, um einen zufälligen Buchstaben zu generieren
 */
function getRandomLetter(): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}
