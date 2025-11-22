// SpotifyApi.ts

import type { tokenInterface, ArtistInterface } from "$lib/types";

import {PUBLIC_SPOTIFY_CLIENT_ID, PUBLIC_SPOTIFY_CLIENT_SECRET} from "$env/static/public";
import { get } from "svelte/store";
//import {O} from "../../.svelte-kit/output/server/chunks";
import { tokenStore } from "$lib/storage/token";


class SpotifyApi {

//typisierung und angeben des startwerts dh tokenExpirationTime ist entweder null oder eine zahl
    static tokenExpirationTime: number | null = null;
    static refreshTimer: NodeJS.Timeout | null = null;

    static async getToken(): Promise<tokenInterface> {
        // fetch= ein befehl mit dem du HTTP request machen kannst, also mit servern kommunizieren kannst
        // die URl die danach kommt ist der API endpoint, also WOHIN soll die Anfrage geschickt werden
        const res = await fetch('https://accounts.spotify.com/api/token', {

            method: 'POST',                                            // mit welcher Methode geschickt wird
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // was geschickt wird
            },
            //Spotify's Token-Endpunkt (/api/token) verlangt, dass die Daten im application/x-www-form-urlencoded-Format gesendet werden.
            // das, was im header steht, gibt dann das format an, in dem die daten im body geschickt werden, sodass das mit dem server kompatibel ist

            body: new URLSearchParams({
                grant_type: 'client_credentials', //gibt an dass nur die Anwendung selbst (nicht ein Benutzer) autorisiert werden muss,
                client_id: PUBLIC_SPOTIFY_CLIENT_ID,
                client_secret: PUBLIC_SPOTIFY_CLIENT_SECRET
            })
        });

        if (!res.ok) {
            throw new Error(`Error fetching token: ${res.statusText}`);
        }

        const data = await res.json();
        console.log('Spotify API Response:', data); // Debug-Ausgabe

        // Speichere den Access Token im Store
        // mit x.set(y.z) wird z aus y geholt und in x gespeichert dh data brauche ich nur, um den token zu holen,
        // (data selbst beinhaltet die gesamte res also auch token type  usw ich will aber NUR den aktuellen access_token in TokenStore speichern)
        tokenStore.set(data.access_token);

        // Berechne, wann der Token abläuft
        //data.expires_in: Ist ein Wert, den die Spotify-API zurückgibt.
        //
        //
        const expiresIn = data.expires_in //|| 3600; // Standardmäßig 3600 Sekunden
        SpotifyApi.tokenExpirationTime = Date.now() + expiresIn * 1000; // um die 3600sek in millisek umzurechenen,
        // Date.now() gibt die aktuelle Zeit in Millisekunden zurück.

        // Starte den Timer, um den Token kurz vor Ablauf zu erneuern
        SpotifyApi.startTokenRefreshTimer(expiresIn);


        return data as tokenInterface; // in types.ts hab ich die definiert wie die eigenscháften und typen des tokens aussehen sollen
        // hier wird das data objekt so returned, dass es denselben typen wie tokenInterface hat
    }

    static startTokenRefreshTimer(expiresIn: number): void {
        // Lösche den vorherigen Timer, falls er existiert
        if (SpotifyApi.refreshTimer) {
            clearTimeout(SpotifyApi.refreshTimer);
        }

        // Erneuere den Token 60 Sekunden vor Ablauf
        const refreshIn = (expiresIn - 60) * 1000; // Timer auf (3600 - 60) Sekunden setzen
        //console.log(`Token wird in ${refreshIn / 1000} Sekunden erneuert.`);

        SpotifyApi.refreshTimer = setTimeout(async () => {
            try {
                //console.log("Token läuft gleeich ab, get a new one bro...");
                await SpotifyApi.getToken(); // Hole einen neuen Token
            } catch (error) {
                console.error("Fehler beim automatischen Token-Erneuern:", error);
            }
        }, refreshIn);
    }

}


export default SpotifyApi;
