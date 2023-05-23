<script>
export let max = 3;
export let min = 1;

let windowWidth;
</script>

<svelte:window bind:innerWidth={windowWidth}></svelte:window>

<div class="grid gap-[20px] dk:gap-[40px] xl:gap-[60px] {(min === 1) ? "dk:grid-cols-2" : "grid-cols-2 dk:grid-cols-3"} xl:grid-cols-[var(--max-rows)] [&>:first-child]:col-span-full dk:[&>:first-child]:col-span-1" style="--max-rows: repeat({max}, minmax(0, 1fr));">
	<slot />
</div>