<script>
import { format } from "$js/helpers/price";

export let price;
export let comparePrice = null;

</script>

{#if comparePrice}
	<del>${format(comparePrice)}</del>
{/if}
${format(price)}
