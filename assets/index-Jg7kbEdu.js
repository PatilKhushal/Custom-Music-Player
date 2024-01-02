(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) s(n);
  new MutationObserver((n) => {
    for (const o of n)
      if (o.type === "childList")
        for (const m of o.addedNodes)
          m.tagName === "LINK" && m.rel === "modulepreload" && s(m);
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
let d = document.getElementById("MP3"),
  E = document.body.querySelectorAll(".controls img")[0],
  a = document.body.querySelectorAll(".controls img")[1],
  p = document.body.querySelectorAll(".controls img")[2],
  u = document.body.querySelectorAll("input[type=range]")[0],
  h = document.body.querySelectorAll("input[type=range]")[1],
  f = document.body.querySelector(".volume img"),
  L = document.body.querySelector(".timestamp"),
  S = document.body.querySelector(".currenttime"),
  b = document.getElementById("currentSongName"),
  v = document.body.querySelectorAll(".borAni"),
  i = new Array(),
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
    a.classList.replace("pause", "play"),
    (a.src = "./assets/play-solid.svg"),
    l.addEventListener("timeupdate", M),
    (b.innerHTML = i[c].name),
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
d.addEventListener("change", () => {
  Array.from(d.files).forEach((t) => {
    let e = new Audio(URL.createObjectURL(t)),
      r = t.name;
    i.push({ audioElement: e, name: r });
  }),
    console.log(i),
    (l = i[0].audioElement),
    g(),
    (a.parentElement.title = "Pause");
});
a.addEventListener("click", () => {
  i.length
    ? a.classList.contains("pause")
      ? (a.classList.replace("pause", "play"),
        (a.parentElement.title = "Pause"),
        (a.src = "./assets/play-solid.svg"),
        l.play(),
        y(!0),
        (document.getElementById("cover").style.animationPlayState = "running"))
      : (a.classList.replace("play", "pause"),
        (a.parentElement.title = "Play"),
        (a.src = "./assets/pause-solid.svg"),
        l.pause(),
        y(!1),
        (document.getElementById("cover").style.animationPlayState = "paused"))
    : d.click();
});
u.addEventListener("input", () => {
  l && (l.currentTime = (u.value * l.duration) / 100),
    u.value == 100 && p.click();
});
p.addEventListener("click", () => {
  i.length
    ? ((l.currentTime = 0),
      l.pause(),
      (c = ++c % i.length),
      (l = i[c].audioElement),
      g())
    : d.click();
});
E.addEventListener("click", () => {
  i.length
    ? ((l.currentTime = 0),
      l.pause(),
      --c == -1 && (c = i.length - 1),
      (l = i[c].audioElement),
      g())
    : d.click();
});
h.addEventListener("input", (t) => {
  l && (l.volume = t.target.value / 100),
    t.target.value == 0
      ? (f.src = "./assets/volume-xmark-solid.svg")
      : t.target.value > 0 && t.target.value < 50
      ? (f.src = "./assets/volume-low-solid.svg")
      : (f.src = "./assets/volume-high-solid.svg");
});
