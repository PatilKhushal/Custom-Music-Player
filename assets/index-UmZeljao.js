(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) s(n);
  new MutationObserver((n) => {
    for (const o of n)
      if (o.type === "childList")
        for (const d of o.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && s(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(n) {
    const o = {};
    return (
      n.integrity && (o.integrity = n.integrity),
      n.referrerPolicy && (o.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : n.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function s(n) {
    if (n.ep) return;
    n.ep = !0;
    const o = r(n);
    fetch(n.href, o);
  }
})();
let m = document.getElementById("MP3"),
  E = document.body.querySelectorAll(".controls img")[0],
  i = document.body.querySelectorAll(".controls img")[1],
  p = document.body.querySelectorAll(".controls img")[2],
  u = document.body.querySelectorAll("input[type=range]")[0],
  h = document.body.querySelectorAll("input[type=range]")[1],
  f = document.body.querySelector(".volume img"),
  L = document.body.querySelector(".timestamp"),
  S = document.body.querySelector(".currenttime"),
  b = document.getElementById("currentSongName"),
  v = document.body.querySelectorAll(".borAni"),
  a = new Array(),
  l,
  c = 0;
function y(t) {
  t
    ? Array.from(v).forEach((e) => {
        e.style.animationPlayState = "running";
      })
    : Array.from(v).forEach((e) => {
        e.style.animationPlayState = "paused";
      });
}
function M() {
  let t = l.duration,
    e = l.currentTime;
  if (t > 3600) {
    let r = Math.floor(e / 3600);
    e -= r * 3600;
    let s = Math.floor(e / 60);
    e -= s * 60;
    let n = Math.floor(e);
    (e -= s * 60), (e = `${r}:${s}:${n}`);
  } else if (t > 60) {
    let r = Math.floor(e / 60);
    e -= r * 60;
    let s = Math.floor(e);
    (e -= r * 60), (e = `${r}:${s}`);
  } else {
    let r = Math.floor(e);
    (e -= min * 60), (e = `${r}`);
  }
  (S.innerHTML = e),
    u.value >= 100 && p.click(),
    (u.value = (l.currentTime * 100) / l.duration);
}
function g() {
  l.play(),
    (document.getElementById("cover").style.animationPlayState = "running"),
    i.classList.replace("pause", "play"),
    (i.src = "./play-solid.svg"),
    l.addEventListener("timeupdate", M),
    (b.innerHTML = a[c].name),
    (l.volume = h.value / 100),
    y(!0),
    setTimeout(() => {
      let t = l.duration;
      if (t > 3600) {
        let e = Math.floor(t / 3600);
        t -= e * 3600;
        let r = Math.floor(t / 60);
        t -= r * 60;
        let s = Math.floor(t);
        (t -= r * 60), (t = `${e}:${r}:${s}`);
      } else if (t > 60) {
        let e = Math.floor(t / 60);
        t -= e * 60;
        let r = Math.floor(t);
        (t -= e * 60), (t = `${e}:${r}`);
      } else {
        let e = Math.floor(t);
        (t -= e * 60), (t = `${e}`);
      }
      L.innerHTML = t;
    }, 500);
}
m.addEventListener("change", () => {
  Array.from(m.files).forEach((t) => {
    let e = new Audio(URL.createObjectURL(t)),
      r = t.name;
    a.push({ audioElement: e, name: r });
  }),
    console.log(a),
    (l = a[0].audioElement),
    g(),
    (i.parentElement.title = "Pause");
});
i.addEventListener("click", () => {
  a.length
    ? i.classList.contains("pause")
      ? (i.classList.replace("pause", "play"),
        (i.parentElement.title = "Pause"),
        (i.src = "./play-solid.svg"),
        l.play(),
        y(!0),
        (document.getElementById("cover").style.animationPlayState = "running"))
      : (i.classList.replace("play", "pause"),
        (i.parentElement.title = "Play"),
        (i.src = "./pause-solid.svg"),
        l.pause(),
        y(!1),
        (document.getElementById("cover").style.animationPlayState = "paused"))
    : m.click();
});
u.addEventListener("input", () => {
  l && (l.currentTime = (u.value * l.duration) / 100),
    u.value == 100 && p.click();
});
p.addEventListener("click", () => {
  a.length
    ? ((l.currentTime = 0),
      l.pause(),
      (c = ++c % a.length),
      (l = a[c].audioElement),
      g())
    : m.click();
});
E.addEventListener("click", () => {
  a.length
    ? ((l.currentTime = 0),
      l.pause(),
      --c == -1 && (c = a.length - 1),
      (l = a[c].audioElement),
      g())
    : m.click();
});
h.addEventListener("input", (t) => {
  l && (l.volume = t.target.value / 100),
    t.target.value == 0
      ? (f.src = "./volume-xmark-solid.svg")
      : t.target.value > 0 && t.target.value < 50
      ? (f.src = "./volume-low-solid.svg")
      : (f.src = "./volume-high-solid.svg");
});
