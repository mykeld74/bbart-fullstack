const cloudName = 'drst9cyhc';

export function cloudinaryFetch(sanityUrl: string, transforms = 'f_auto,q_auto') {
	return `https://res.cloudinary.com/${cloudName}/image/fetch/${transforms}/${encodeURIComponent(sanityUrl)}`;
}

type SanityImage = {
	asset?: { url?: string | null } | null;
	alt?: string | null;
	secure_url?: string | null;
	url?: string | null;
};

/** Resolve a Sanity image via Cloudinary fetch, or a legacy Cloudinary asset URL. */
export function getImageSrc(image: SanityImage | null | undefined, transforms = 'f_auto,q_auto') {
	if (!image) return '';

	const sanityUrl = image.asset?.url;
	if (sanityUrl) return cloudinaryFetch(sanityUrl, transforms);

	const cloudinaryUrl = image.secure_url || image.url;
	if (cloudinaryUrl?.includes('/upload/')) {
		return cloudinaryUrl.replace('/upload/', `/upload/${transforms}/`);
	}

	return cloudinaryUrl ?? '';
}
