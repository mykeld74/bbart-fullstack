<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { stegaClean, useQuery } from '@sanity/sveltekit';
	import { getImageSrc } from '$lib/cloudinaryFetch';
	import LoadingImage from '$components/loadingImage.svelte';
	import PageBuilder from '$components/pageBuilder.svelte';
	import type {
		EventsQueryResult,
		ExhibitionsPageQueryResult
	} from '$lib/sanity.types';

	let { data } = $props();

	const pageQuery = $derived(
		useQuery<ExhibitionsPageQueryResult>({
			query: data.pageQuery,
			options: { initial: data.pageInitial }
		})
	);
	const eventsQuery = $derived(
		useQuery<EventsQueryResult>({
			query: data.eventsQuery,
			params: data.eventsParams,
			options: { initial: data.eventsInitial }
		})
	);

	const page = $derived($pageQuery.data);
	const events = $derived($eventsQuery.data ?? []);
	const pageTitle = $derived(stegaClean(page?.title) || 'Shows and Exhibitions');

	function formatDate(dateString: string) {
		const [year, month, day] = dateString.split('-').map(Number);
		return new Date(year, month - 1, day).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}

	function formatEventDate(event: {
		isMultiDay?: boolean | null;
		date?: string | null;
		startDate?: string | null;
		endDate?: string | null;
	}) {
		if (event.isMultiDay && event.startDate && event.endDate) {
			return `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`;
		}
		return event.date ? formatDate(event.date) : '';
	}

	function eventPopoverId(id: string) {
		return `event-${id.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
	}
</script>

<svelte:head>
	<title>{pageTitle} | Brenda Bennett Art</title>
</svelte:head>

<div class="container">
	<h1>{page?.title || 'Shows and Exhibitions'}</h1>

	<PageBuilder blocks={page?.pageBuilder} />

	{#if events.length > 0}
		<section class="upcomingEvents">
			<h2>Upcoming Events</h2>
			<ul class="eventCardGrid">
				{#each events as event (event._id)}
					{@const popoverId = eventPopoverId(event._id)}
					<li class="scrollFade">
						<button type="button" class="eventCard" popovertarget={popoverId}>
							{#if event.image?.asset?.url}
								<div class="eventCardImage">
									<LoadingImage
										src={getImageSrc(event.image, 'f_auto,q_auto,w_600')}
										alt=""
										fill
									/>
								</div>
							{/if}
							<div class="eventCardBody">
								<h3>{event.title}</h3>
								<p class="eventMeta">{formatEventDate(event)}</p>
								{#if event.venueName}
									<p class="eventMeta">{event.venueName}</p>
								{/if}
								<span class="eventCardCta">View details</span>
							</div>
						</button>

						<div id={popoverId} class="eventModal" popover>
							<div class="eventModalInner">
								<button
									type="button"
									class="eventModalClose"
									popovertarget={popoverId}
									popovertargetaction="hide"
									aria-label="Close event details"
								>
									<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
										<path
											d="M6.4 6.4 17.6 17.6M17.6 6.4 6.4 17.6"
											fill="none"
											stroke="currentColor"
											stroke-width="1.75"
											stroke-linecap="round"
										/>
									</svg>
								</button>

								{#if event.image?.asset?.url}
									<div class="eventModalImage">
										<LoadingImage
											src={getImageSrc(event.image, 'f_auto,q_auto,w_900')}
											alt={event.image.alt || event.title}
											fill
										/>
									</div>
								{/if}

								<div class="eventModalContent">
									<h3>{event.title}</h3>
									<p class="eventMeta">{formatEventDate(event)}</p>
									{#if event.time}
										<p class="eventMeta">{event.time}</p>
									{/if}
									{#if event.venueName}
										<p class="eventVenue">{event.venueName}</p>
									{/if}
									{#if event.venueAddress}
										<p class="eventAddress">{event.venueAddress}</p>
									{/if}
									{#if event.description}
										<div class="eventDescription">
											<PortableText value={event.description} />
										</div>
									{/if}
								</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</div>

<style>
	.upcomingEvents {
		margin-top: 60px;
		padding-top: 40px;
		border-top: 1px solid #ccc;
		margin-bottom: 40px;
	}

	.eventCardGrid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 24px;
	}

	.eventCard {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 0;
		border: 1px solid #ddd;
		border-radius: 12px;
		background: #fff;
		text-align: left;
		cursor: pointer;
		font: inherit;
		color: inherit;
		overflow: hidden;
		box-shadow: 0 4px 14px rgb(0 0 0 / 0.08);
		transition:
			border-color 200ms ease,
			box-shadow 200ms ease;
	}

	.eventCard:hover,
	.eventCard:focus-visible {
		border-color: var(--primaryColor);
		box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
		outline: none;
	}

	.eventCardImage {
		position: relative;
		aspect-ratio: 3 / 2;
		overflow: hidden;
	}

	.eventCardBody {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 16px;
		flex: 1;
	}

	.eventCardBody h3 {
		color: var(--primaryColor);
		font-size: clamp(20px, 2.5vw, 26px);
		font-weight: 300;
		margin: 0 0 6px;
	}

	.eventMeta,
	.eventVenue {
		margin: 0;
		font-weight: 500;
	}

	.eventCardCta {
		margin-top: auto;
		padding-top: 12px;
		color: var(--primaryColor);
		font-size: 16px;
		font-weight: 500;
	}

	.eventModal {
		width: min(640px, calc(100vw - 2rem));
		max-height: calc(100dvh - 2rem);
		margin: auto;
		padding: 0;
		border: none;
		border-radius: 14px;
		background: #fff;
		overflow: auto;
		box-shadow: 0 16px 48px rgb(0 0 0 / 0.22);
		opacity: 0;
		transform: translateY(1.5rem);
		transition:
			opacity 280ms ease,
			transform 280ms ease,
			overlay 280ms allow-discrete,
			display 280ms allow-discrete;
	}

	.eventModal:popover-open {
		opacity: 1;
		transform: translateY(0);
	}

	@starting-style {
		.eventModal:popover-open {
			opacity: 0;
			transform: translateY(1.5rem);
		}
	}

	.eventModal::backdrop {
		background: rgb(0 0 0 / 0);
		transition:
			background 280ms ease,
			overlay 280ms allow-discrete,
			display 280ms allow-discrete;
	}

	.eventModal:popover-open::backdrop {
		background: rgb(0 0 0 / 0.5);
	}

	@starting-style {
		.eventModal:popover-open::backdrop {
			background: rgb(0 0 0 / 0);
		}
	}

	.eventModalInner {
		position: relative;
	}

	.eventModalClose {
		position: absolute;
		top: 12px;
		right: 12px;
		z-index: 1;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		padding: 0;
		border: 1px solid rgb(0 0 0 / 0.08);
		border-radius: 999px;
		background: rgb(255 255 255 / 0.92);
		box-shadow: 0 2px 10px rgb(0 0 0 / 0.12);
		color: #333;
		cursor: pointer;
		transition:
			background 160ms ease,
			color 160ms ease,
			border-color 160ms ease,
			transform 160ms ease;
	}

	.eventModalClose svg {
		width: 22px;
		height: 22px;
		display: block;
	}

	.eventModalClose:hover,
	.eventModalClose:focus-visible {
		background: #fff;
		color: var(--primaryColor);
		border-color: var(--primaryColor);
		outline: none;
		transform: scale(1.05);
	}

	.eventModalImage {
		position: relative;
		aspect-ratio: 16 / 10;
		overflow: hidden;
	}

	.eventModalContent {
		padding: 24px;
	}

	.eventModalContent h3 {
		color: var(--primaryColor);
		font-size: clamp(24px, 3vw, 32px);
		font-weight: 300;
		margin: 0 0 10px;
	}

	.eventAddress {
		margin: 0 0 16px;
		white-space: pre-line;
	}

	.eventDescription {
		margin-top: 12px;
	}

	.eventDescription :global(a) {
		color: var(--primaryColor);
	}

	@media (prefers-reduced-motion: reduce) {
		.eventModal,
		.eventModal::backdrop {
			transition: none;
		}
	}
</style>
