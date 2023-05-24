<script>
import { storage } from "$lib/stores/storage";
import { user } from "$lib/stores/user";
import ResponsiveImage from "$lib/components/elements/ResponsiveImage.svelte";
import PriceDisplay from "$lib/components/shop/PriceDisplay.svelte";
import { PlusIcon, MinusIcon } from "svelte-feather-icons";

let timeout;
let lock = false;

/**
 * update the cart
 * @param item
 * @param quantity
 */
const quantityChange = async (item, quantity) => {

	if(lock === true) return;

	lock = true;

	let update = await fetch("/api/v1/shop/cart/update", {
		method: "POST",
		body: JSON.stringify({
			cart: $user.shop.cart.id,
			lines: [item]
		})
	}).catch((error) => {
		console.log(error);
	});

	let data = await update.json();

	$user.shop.cart.id = data.cartId;
	$user.shop.cart.obj = data.cart;

	lock = false;
};

const setClose = () => {

	timeout = setTimeout(() => {
		$storage.cartOpen = false;
	}, 1500);
};
</script>

{#if $storage.cartOpen === true}
	<div class="absolute pointer-events-auto w-[375px] text-[var(--text-color)] bg-[var(--bg-color)] max-w-[calc(100vw_-_30px)] border border-current -top-[20px] -translate-x-1/2 left-1/2 p-[15px] z-40" on:mouseenter={() => { clearTimeout(timeout); }} on:mouseleave={setClose} >
		<div class="pt-[33px] relative">
			<form>
				{#each $user.shop?.cart?.obj?.lines?.edges as lineItem, i}
					{@const colorDesc = (lineItem.node.merchandise.product?.metafields[0] && typeof lineItem.node.merchandise.product?.metafields[0] === "object") ? lineItem.node.merchandise.product?.metafields?.find((m) => m?.key === "color_description") : null }
					<div class="grid grid-cols-2 gap-[15px] mb-[14px]">
						<div class="rounded-[10px] overflow-hidden">
							<ResponsiveImage src={lineItem.node.merchandise.image.url} width={240} />
						</div>
						<div class="flex flex-col justify-center">
							<div class="flex w-full justify-between">
								<p class="text-[length:12px] font-bold leading-[16px] pr-[15px] !mb-0">{lineItem.node.merchandise.product.title}</p>
								<p class="inline-block font-bold text-xs text-right !mb-0">
									<PriceDisplay price={lineItem.node.cost.subtotalAmount.amount} />
								</p>
							</div>
							{#if colorDesc}
								<p class="text-[length:10px] pt-[5px] !mb-[10px]">{colorDesc.value}</p>
							{/if}
							<div class="field-group mb-[20px] w-full">
								<div class="border border-current pl-[10px] pr-[10px] pt-[7px] pb-[5px] flex justify-between items-center w-full">
									<p class="text-[length:13px] font-bold m-0">QTY</p>
									<div class="flex">
										<button on:click={() => {
											if(lock === true) return;
											if(lineItem.node.quantity > 0) lineItem.node.quantity--;
											quantityChange(lineItem, lineItem.node.quantity);
										}}><MinusIcon size={"18"} strokeWidth={1.25} /></button>
										<input class="border-0 p-0 w-[30px] m-0 appearance-none text-center min-w-0 inline-block h-auto pointer-events-none" type="text" name="quantity" bind:value={lineItem.node.quantity} />
										<button on:click={() => {
											if(lock === true) return;
											lineItem.node.quantity++;
											quantityChange(lineItem, lineItem.node.quantity);
										}}><PlusIcon size={"18"} strokeWidth={1.25} /></button>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</form>
		</div>
		<div>
			<a class="btn text-center" href={$user.shop.cart.obj.checkoutUrl}>Checkout</a>
		</div>
	</div>
{/if}