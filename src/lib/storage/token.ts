import { writable } from 'svelte/store';

// Initialisiere den Store für den Token
export const tokenStore = writable<string | null>(null);
//
//
//     Der Token wird zentral verwaltet und ist unabhängig von der Klasse SpotifyApi.
//     Wiederverwendbarkeit: Andere Module oder Komponenten können auf den Token zugreifen, indem sie einfach tokenStore importieren.
//Svelte Stores sind Objekte, die speziell entwickelt wurden, um reaktive Werte zu verwalten.
// Das bedeutet, wenn der Wert im Store geändert wird, werden automatisch alle Abonnenten
// (z. B. Komponenten, die auf den Wert hören) benachrichtigt.
//tokenStore ist ein Store, der den aktuellen Spotify-Token speichert.