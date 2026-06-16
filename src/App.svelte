<script lang="ts">
  import Grid from "./components/Grid.svelte";
  import SideBar from "./components/SideBar.svelte";
  import Footer from "./components/Footer.svelte";
  import Transit from "./components/Transit.svelte";
</script>

<div class="flex flex-col w-screen h-screen">
  <div class="flex flex-1 overflow-hidden">
    <div class="flex flex-1 justify-center items-center overflow-auto bg-taupe-900">
      <div class="relative">
        <Grid />
        <Transit class="absolute inset-0"/>
      </div>
    </div>
    <SideBar class="shrink-0" />
  </div>
  <Footer />
</div>