<script lang="ts">
    import { page } from "$app/stores"; // Zugriff auf die Route-Parameter
    import { onMount } from "svelte";
    import { isLoggedIn, currentUser } from "$lib/storage/loginCheck";
    import type { ArtistInterface } from "$lib/types"; // Typisierung für die Künstler

    let correctAnswers = 0;
    let wrongAnswers = 0;
    let artists: ArtistInterface[] = []; // Künstler-Liste
    let userId: string = "";

    // **Direktes Binding an den Store mit $currentUser**
    $: userId = $currentUser ? $currentUser.username : "";

    // Hole die Daten aus der URL und aus sessionStorage
    onMount(() => {
        const searchParams = new URLSearchParams($page.url.search); // Holen der Query-Parameter
        correctAnswers = Number(searchParams.get("correct") || 0);
        wrongAnswers = Number(searchParams.get("wrong") || 0);

        // Abrufen der Künstler aus sessionStorage
        const storedArtists = sessionStorage.getItem("gameArtists");
        if (storedArtists) {
            artists = JSON.parse(storedArtists); // Künstlerdaten in das artists-Array speichern
        } else {
            console.error("Keine Künstlerdaten im sessionStorage gefunden.");
        }
    });

    function logout() {
        isLoggedIn.set(false);
        currentUser.set(null); // Benutzerdaten löschen
        window.location.href = "/"; // Weiterleitung zur Login-Seite
    }
</script>

<h1 class="text-2xl font-bold">Your Results {userId}!</h1>
<p class="text-lg class:highlight={correctAnswers > 5}">Correct answers: {correctAnswers}</p>
<p class="text-lg text-red-500">Wrong answers: {wrongAnswers}</p>
<button on:click={logout} class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
    Logout
</button>

<!-- Abschnitt für die Anzeige der Künstler -->
<h2 class="mt-4 text-xl font-semibold">Artists Shown During the Game:</h2>
<div class="artist-list">
    {#if artists.length > 0}
        {#each artists as artist}
            <div class="artist-card">
                <img src={artist.image || "fallback-image-url"} alt={artist.name} class="artist-image" />
                <p class="artist-name">{artist.name}</p>
            </div>
        {/each}
    {:else}
        <p>No artists to display.</p>
    {/if}
</div>

<style>
    /* Container für die Künstlerliste */
    .artist-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center; /* Zentriert die Elemente horizontal */
        align-items: center; /* Zentriert die Elemente vertikal */
        gap: 16px; /* Abstand zwischen den Künstlerkarten */
        margin-top: 16px;
    }

    .artist-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 8px;
        width: 150px; /* Einheitliche Breite für die Karten */
        transition: transform 0.2s;
    }



    .artist-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 8px;
    }

    .artist-name {
        font-size: 16px;
        font-weight: bold;
    }

    h1, h2, p {
        text-align: center;
    }

    button {
        display: block;
        margin: 20px auto;
    }
</style>