<script>
import { fly, scale } from "svelte/transition";
import { storage } from "$lib/stores/storage";
import { user } from "$lib/stores/user";
import { ShoppingCartIcon } from "svelte-feather-icons";
</script>

<button class="accent pointer-events-auto flex items-center justify-center h-[52px] w-[52px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-black/50 shadow-sm active:shadow-inner" aria-label="Cart Summary" transition:fly="{{ y: 200, duration: 1000 }}" on:click={() => { $storage.cartOpen = !$storage.cartOpen; }}>
	<span class="block -ml-[4px]">
		<ShoppingCartIcon size={"24"} />
	</span>
	{#if $user.shop.cart?.obj?.totalQuantity > 0}
		<div class="pointer-events-none bg-red-500 w-[16px] h-[16px] rounded-full absolute top-[9px] right-[9px] flex items-center justify-center" transition:scale="{{ duration: 400, delay: 600 }}">
			<span class="text-white font-semibold text-[length:13px]">{$user.shop.cart.obj.totalQuantity}</span>
		</div>
	{/if}
</button>