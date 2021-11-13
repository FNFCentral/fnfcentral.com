<script>
    import Header from "../Header.svelte";
    import Footer from "../Footer.svelte";

    import "../app.css";
    import "../sweetAlert.scss";
</script>

<div class="flex flex-col h-screen">
    <div class="justify-self-start"><Header /></div>

    <div class="flex-grow justify-self-start"><slot /></div>

    <div class="justify-self-end"><Footer /></div>
</div>
