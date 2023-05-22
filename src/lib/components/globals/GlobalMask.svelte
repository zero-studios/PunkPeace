<script>
import { onMount } from "svelte";

let el;

onMount(() => {
	el.style.opacity = 0;
});
</script>

<div bind:this={el} class="pointer-events-none z-[100] fixed top-0 left-0 w-full h-full bg-primary-color transition-opacity duration-300">

</div>
