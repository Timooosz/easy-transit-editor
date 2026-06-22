<script lang="ts">
  import Grid from "./components/Grid.svelte";
  import SideBar from "./components/SideBar.svelte";
  import Footer from "./components/Footer.svelte";
  import Transit from "./components/Transit.svelte";
  import ContextMenu from "./components/ContextMenu.svelte";
  import StationMenu from "./components/StationMenu.svelte";
  import TextPrompt from "./components/TextPrompt.svelte";
  import TextFieldMenu from "./components/TextFieldMenu.svelte";
    import { getCurrentTheme } from "./lib/themes.svelte";
</script>

<div class="flex flex-col w-screen h-screen">
  <div class="flex flex-1 overflow-hidden">
    <div class="flex flex-col flex-1 overflow-auto {getCurrentTheme().bg_main}">
      <div class="m-auto relative">
        <Grid />
        <Transit class="absolute inset-0"/>
      </div>
    </div>
    <SideBar class="shrink-0" />
  </div>
  <Footer />

  <ContextMenu />
  <StationMenu />
  <TextFieldMenu />
  <TextPrompt />
</div>