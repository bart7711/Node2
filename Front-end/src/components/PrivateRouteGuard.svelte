<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { isLoggedIn } from "../stores/userInfo";

	const navigate = useNavigate();
	const location = useLocation();

	$: if (!$isLoggedIn) {
		navigate("/shopping-basket", {
			state: { from: $location.pathname },
			replace: true,
		});
	}
</script>

{#if $isLoggedIn}
	<slot />
{/if}