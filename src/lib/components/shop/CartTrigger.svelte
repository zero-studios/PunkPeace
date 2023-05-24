<script>
import { fly, scale } from "svelte/transition";
import { storage } from "$lib/stores/storage";
import { user } from "$lib/stores/user";
</script>

<button class="pointer-events-auto flex items-center justify-center h-[20px] w-[20px] relative z-50 rounded-full bg-[var(--bg-inverse)]" aria-label="Cart Summary" transition:fly="{{ y: 200, duration: 1000 }}" on:click={() => { $storage.cartOpen = !$storage.cartOpen; }}>
	{#if $user.shop.cart?.obj?.totalQuantity > 0}
		<span class="text-[var(--text-inverse)] font-bold text-[length:12px]">{$user.shop.cart.obj.totalQuantity}</span>
		<div class="pointer-events-none bg-[#09FF04] w-[8px] h-[8px] rounded-full absolute top-[0px] -right-[2px] flex items-center justify-center" transition:scale="{{ duration: 400, delay: 600 }}">

		</div>
	{/if}
</button>