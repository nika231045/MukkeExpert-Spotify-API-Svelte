<script lang="ts">
    import '../lib/global.css';
</script>

<div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-60 bg-grau text-white flex flex-col p-4">
        <div class="text-2xl font-bold mb-6">MukkeXpert</div>
        <nav class="flex flex-col gap-4">
            <a href="/" class="hover:text-green-500">Go Back to Login</a>
            <a href="/" class="hover:text-green-500">random platzhalter1</a>
            <a href="/" class="hover:text-green-500">idk yet </a>
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-6">
        <slot />
    </main>
</div>

<style>
    /* Sidebar styling */
    aside {
        min-height: 100%;
        border-right: 1px solid #444;
    }

    nav a {
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        transition: background-color 0.3s;
    }


</style>


