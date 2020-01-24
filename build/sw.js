importScripts("workbox-v4.3.1/workbox-sw.js");

workbox.setConfig({modulePathPrefix: 'workbox-v4.3.1/'})

const precacheManifest = [
  {
    "url": "asset-manifest.json",
    "revision": "179fbefa5eec802620943125562976b0"
  },
  {
    "url": "favicon.ico",
    "revision": "c92b85a5b907c70211f4ec25e29a8c4a"
  },
  {
    "url": "index.html",
    "revision": "8d88277a228c459c5a598a5399a60c6d"
  },
  {
    "url": "logo192.png",
    "revision": "33dbdd0177549353eeeb785d02c294af"
  },
  {
    "url": "logo512.png",
    "revision": "917515db74ea8d1aee6a246cfbcc0b45"
  },
  {
    "url": "manifest.json",
    "revision": "8f18e1af89518699dcad1d7964aea906"
  },
  {
    "url": "precache-manifest.a02b87eb29c0f6c9d15558c316b7a953.js",
    "revision": "a02b87eb29c0f6c9d15558c316b7a953"
  },
  {
    "url": "robots.txt",
    "revision": "3ad0652bd17ff826a31fa29366021cfd"
  },
  {
    "url": "service-worker.js",
    "revision": "10e8224b4e4f05088e874d81479e82c9"
  },
  {
    "url": "static/css/main.5e66961e.chunk.css",
    "revision": "b18e2ee3c5464a177d05d32200019786"
  },
  {
    "url": "static/js/2.5f8cd517.chunk.js",
    "revision": "af72b5bbf2549396324e096887ca5c9a"
  },
  {
    "url": "static/js/main.19c38e67.chunk.js",
    "revision": "9b67186286de2bebad1e4d729c6134b3"
  },
  {
    "url": "static/js/runtime-main.0abab4bc.js",
    "revision": "801fe2711d94cf33470ccc5041efb782"
  }
];

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(precacheManifest);
