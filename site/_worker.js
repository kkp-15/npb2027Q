// 来たホスト名で、その球団のフォルダを返す（tools/combine.py が書き出す。手で直さない）
const HOSTS = {
  "baystars2027q.kkpwebninja.com": "baystars",
  "buffaloes2027q.kkpwebninja.com": "buffaloes",
  "carp2027q.kkpwebninja.com": "carp",
  "dragons2027q.kkpwebninja.com": "dragons",
  "eagles2027q.kkpwebninja.com": "eagles",
  "fighters2027q.kkpwebninja.com": "fighters",
  "giants2027q.kkpwebninja.com": "giants",
  "hawks2027q.kkpwebninja.com": "hawks",
  "lions2027q.kkpwebninja.com": "lions",
  "marines2027q.kkpwebninja.com": "marines",
  "npb2027q.kkpwebninja.com": "npb",
  "swallows2027q.kkpwebninja.com": "swallows",
  "tigers2027q.kkpwebninja.com": "tigers"
};
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const dir = HOSTS[url.hostname] || 'npb';
    url.pathname = '/' + dir + url.pathname;
    const res = await env.ASSETS.fetch(new Request(url, request));
    // Pages が付ける「/carp/x.html → /carp/x」などの転送先から、フォルダ名を外す
    const loc = res.headers.get('location');
    if (loc && res.status >= 300 && res.status < 400) {
      const to = new URL(loc, url);
      if (to.pathname.startsWith('/' + dir + '/') || to.pathname === '/' + dir) {
        to.pathname = to.pathname.slice(dir.length + 1) || '/';
        to.host = new URL(request.url).host;
        const h = new Headers(res.headers); h.set('location', to.toString());
        return new Response(res.body, { status: res.status, headers: h });
      }
    }
    return res;
  }
};
