import { writable } from 'svelte/store';

// Store, um zu überprüfen, ob der Benutzer eingeloggt ist
export const isLoggedIn = writable(false);

// um zu checken welecher mf grad eingeloggt ist
export const currentUser = writable<null | { username: string }>(null);
