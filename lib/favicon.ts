const FAVICON_GRADIENT = `<linearGradient id="zing-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
      <stop stop-color="#8b5cf6" />
      <stop stop-color="#06b6d4" />
    </linearGradient>`;

const FAVICON_LOGO = `<rect width="32" height="32" rx="8" fill="url(#zing-gradient)" />
  <g transform="translate(4 4)">
    <path
      d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"
      fill="none"
      stroke="#ffffff"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round" />
  </g>`;

const DEFAULT_FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>${FAVICON_GRADIENT}</defs>
  ${FAVICON_LOGO}
</svg>`;

const BADGED_FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>${FAVICON_GRADIENT}</defs>
  ${FAVICON_LOGO}
  <circle cx="26" cy="6" r="5" fill="#f97316" stroke="#ffffff" stroke-width="1.5" />
</svg>`;

function svgToDataUrl(svg: string) {
	return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const DEFAULT_FAVICON_URL = svgToDataUrl(DEFAULT_FAVICON_SVG);
const BADGED_FAVICON_URL = svgToDataUrl(BADGED_FAVICON_SVG);

let badged = false;
let resetListenersAttached = false;

function applyFavicon(url: string) {
	const links = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
	if (links.length) {
		links.forEach((link) => {
			link.href = url;
		});
		return;
	}

	const link = document.createElement("link");
	link.rel = "icon";
	link.type = "image/svg+xml";
	link.href = url;
	document.head.appendChild(link);
}

export function setFaviconBadged() {
	if (typeof document === "undefined" || badged) return;
	badged = true;
	applyFavicon(BADGED_FAVICON_URL);
}

export function resetFavicon() {
	if (typeof document === "undefined" || !badged) return;
	badged = false;
	applyFavicon(DEFAULT_FAVICON_URL);
}

export function initFaviconBadgeReset() {
	if (typeof window === "undefined" || resetListenersAttached) return;
	resetListenersAttached = true;

	const onFocus = () => resetFavicon();
	const onVisibilityChange = () => {
		if (!document.hidden) onFocus();
	};

	window.addEventListener("focus", onFocus);
	document.addEventListener("visibilitychange", onVisibilityChange);

	return () => {
		window.removeEventListener("focus", onFocus);
		document.removeEventListener("visibilitychange", onVisibilityChange);
		resetListenersAttached = false;
	};
}
