
<script lang="ts">
    import { onMount } from "svelte";
    import SpotifyApi from "$lib/SpotifyApi"; // Importiere die Spotify API
    import { goto } from '$app/navigation'; // Für die Weiterleitung
    import { currentUser } from "$lib/storage/loginCheck";
    import type { tokenInterface, ArtistInterface } from "$lib/types";
    import { get } from "svelte/store";
    import { showArtists } from "$lib/showArtists";


    // Typisierte Künstlerliste
    let artists: ArtistInterface[] = [];
    let token: tokenInterface []= [];
    let derNaechsteBitte = false;
    let currentArtistIndex = 0;
    let userGuess = "";
    let feedback = "";
    let correctAnswers = 0;
    let wrongAnswers = 0;
    //const userId = 1; // Beispiel: Aktuelle User-ID (kann dynamisch kommen)
    let  gameIsOver = false;


    // Abrufe der Künstlerliste
    onMount(async () => {
        if (!token) {
            console.error("Kein Token gefunden! Weiterleitung zum Login...");
            await goto("/"); // Leite zur Login-Seite weiter
            return;
        }
        try {
            artists = await showArtists();
        } catch (error) {
            console.error("Fehler beim Abrufen der Künstler:", error);
        }
    });

    // Benutzerantwort prüfen
    function checkAnswer() {
        const currentArtist = artists[currentArtistIndex];
        if (userGuess.toLowerCase() === currentArtist.name.toLowerCase()) {
            correctAnswers++;
            feedback = "Richtig";

        } else {
            wrongAnswers++;
            feedback = "Falsch! That was " + currentArtist.name + "!";

        }
        userGuess = ""; // Eingabe zurücksetzen
        derNaechsteBitte = true; // Aktiviert die Space-Mechanik
    }

    // Leertaste für den Wechsel zum nächsten Artist
    function handleKeydown(event: KeyboardEvent) {
        if (derNaechsteBitte && event.key === " ") {
            event.preventDefault(); // Verhindert Scrollen der Seite
            feedback = ""; // Feedback zurücksetzen
            derNaechsteBitte = false; // Weiterschalten deaktivieren
            currentArtistIndex++; // Nächster Artist

            // Prüfen, ob das Spiel vorbei ist
            if (currentArtistIndex >= artists.length) {
                gameIsOver = true;
            }
        }
    }




</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Höhe des Viewports */
        text-align: center;
    }

    img {
        max-width: 300px;
        border-radius: 10px; /* Optional: Runde Ecken für das Bild */
        margin-bottom: 20px;
    }


    input {
        width: 300px;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
    }

    button {
        background-color: #28a745;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    }

    button:hover {
        background-color: #218838;
    }

    h1 {
        margin-bottom: 20px;
    }

    p {
        margin-top: 15px;
    }
</style>

<svelte:body on:keydown={handleKeydown} />

<div class="container">
    {#if !gameIsOver}
        <h1>Who is this???</h1>
        <h2>press space to see the next one</h2>
        {#if artists.length > 0}
            <img src={artists[currentArtistIndex]?.image} alt="Artist" />
            <input
                    type="text"
                    bind:value={userGuess}
                    placeholder="Name des Künstlers"
                    on:keydown={(event) => event.key === 'Enter' && checkAnswer()}
            />
            <button on:click={checkAnswer} disabled={derNaechsteBitte}>
                check answer
            </button>
            <p>{feedback}</p>
        {/if}
    {:else}
        <h1>Game Over!</h1>
        <button
                on:click={() =>
        goto(`/results/${get(currentUser)?.username}?correct=${correctAnswers}&wrong=${wrongAnswers}`)
    }>
            Zu den Ergebnissen
        </button>


    {/if}
</div>



