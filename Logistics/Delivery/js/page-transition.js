document.addEventListener("click", function (event) {
    const link = event.target.closest("a[href]");

    if (!link) return;

    if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === "_blank" ||
        link.hasAttribute("download")
    ) {
        return;
    }

    const destination = new URL(link.href, window.location.href);

    if (
        destination.origin !== window.location.origin ||
        destination.pathname === window.location.pathname
    ) {
        return;
    }

    // Normal navigation. No fade, no artificial delay.
});