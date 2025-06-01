export async function onRequest(context) {
  const targetBase = "https://medlecontent.wixstudio.com/kusportsa";

  // Always proxy to the base Wix URL, ignoring any additional path
  const url = new URL(targetBase);

  const modifiedRequest = new Request(url.toString(), {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
    redirect: 'follow',
  });

  const response = await fetch(modifiedRequest);

  return new HTMLRewriter()
    .on("#WIX_ADS", {
      element(el) {
        el.remove(); // optional: remove Wix Studio banner
      }
    })
    .transform(response);
}