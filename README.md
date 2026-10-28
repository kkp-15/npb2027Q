# 背番号クイズ 2027年版（12球団＋総合）の公開用

Cloudflare Pages の公開先 `npb2027q` 1つで、13のアドレス（npb2027q・carp2027q・…・marines2027q.kkpwebninja.com）を配信する。
`site/_worker.js` が来たホスト名を見て `site/{slug}/` を返す。

中身はここで直さない。元は ~/test/_quiz2027_src（template＋data）で、
`/usr/bin/python3 build.py && python3 check.py && python3 tools/combine.py` のあと、`out/_site/` をここの `site/` にコピーして push する。
