

<script lang="ts">
    //import type { tokenInterface } from "$lib/types"; // Importiere den Typ

    import usersData from "$lib/user.json";
    import { goto } from '$app/navigation'; // Für die Weiterleitung
import {isLoggedIn, currentUser} from "$lib/storage/loginCheck";



    let username = ''; // Gebundene Variable für den Benutzernamen
    let password = ''; // Gebundene Variable für das Passwort
    let loginMessage = ''; // Nachricht für den Login-Status




    function login() {
        // Benutzerüberprüfung
        const user = usersData.find(
            (u) => u.username === username && u.password === password
        );

        if (user) {
            isLoggedIn.set(true); // Setze den Login-Status auf true
            currentUser.set(user); // Setze den aktuellen Benutzer


            goto('/game'); // Weiterleitung zur nächsten Seite
        } else {
            // Fehlgeschlagener Login
            loginMessage = 'Ungültiger Benutzername oder Passwort!';
        }
    }


</script>

<div class="container">
    <h1>Are you the MukkeXpert?</h1>
    <!-- Eingabe mit Login-Trigger bei Enter -->
    <input
            type="text"
            placeholder="user"
            bind:value={username}
            on:keydown={(event) => event.key === 'Enter' && login()}
    />
    <input
            type="password"
            placeholder="password"
            bind:value={password}
            on:keydown={(event) => event.key === 'Enter' && login()}
    />

    <!-- Login-Button -->
    <button on:click={login}>Login</button>
    <p>{loginMessage}</p>


</div>


<style>
    input {
        width: 300px; /* Setze die Breite */
        padding: 10px;
        margin-bottom: 15px; /* Abstand zwischen den Feldern */
        border: 1px solid #ccc;
        border-radius: 5px; /* Abgerundete Ecken */
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
</style>

