const repo = "fran56caton/geotrazo-actualizaciones";
// The static link remains usable when GitHub's API is unavailable or rate-limited.
fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
  signal: AbortSignal.timeout(7000),
})
  .then((response) => {
    if (!response.ok) throw new Error("No disponible");
    return response.json();
  })
  .then((release) => {
    const asset = release.assets?.find((item) =>
      /^GeoTrazo-Instalar-[\d.]+-Windows-x64\.exe$/.test(item.name),
    );
    if (
      !asset ||
      !asset.browser_download_url.startsWith(
        `https://github.com/${repo}/releases/download/`,
      )
    )
      return;
    document
      .querySelectorAll("[data-download]")
      .forEach((link) => (link.href = asset.browser_download_url));
    const version = release.tag_name?.replace(/^v/, "");
    if (version && /^\d+\.\d+\.\d+$/.test(version))
      document
        .querySelectorAll("[data-version]")
        .forEach((node) => (node.textContent = version));
  })
  .catch(() => {});
