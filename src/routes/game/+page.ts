import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { isLoggedIn } from '$lib/storage/loginCheck';

export async function load() {
    const loggedIn = get(isLoggedIn);

    if (!loggedIn) {
        // Verhindert, dass die Seite gerendert wird, und leitet direkt zur Startseite um
        throw redirect(302, '/');
    }

    return {};
}
