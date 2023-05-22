<script>
export let max = 3;
export let min = 1;

let windowWidth;
</script>

<svelte:window bind:innerWidth={windowWidth}></svelte:window>

<div class="w-full grid grid-flow-col grid-cols-[var(--max-rows)] [&>*]:col-span-1 gap-[20px]" style="--max-rows:{max};">
	<slot />
</div>