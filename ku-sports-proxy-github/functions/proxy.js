export async function onRequest(context) {
  const wixURL = 'https://medlecontent.wixstudio.com/kusportsa';
  const targetURL = new URL(wixURL);
  targetURL.pathname = context.request.url.replace(/^https?:\/\/[^/]+\/proxy/, '');

  const init = {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
    redirect: 'follow'
  };

  const response = await fetch(targetURL.toString(), init);

  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', '*');
  headers.delete('content-security-policy');
  headers.delete('x-frame-options');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}