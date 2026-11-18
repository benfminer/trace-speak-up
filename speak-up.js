/* Speak Up engine. Lesson words live in content.js; this file only runs them.
   Nothing here talks to a network. Answers stay in this browser (localStorage).
   Every lesson stands alone: none of them needs answers from another lesson. */
(function () {
'use strict';

/* First-try quiz score. answers[i] is the choice index picked first, or null.
   Pure function, checked in Node (see test-code.js). */
function scoreQuiz(quiz, answers) {
  var right = 0, missed = [];
  quiz.forEach(function (q, i) {
    if (answers[i] === q.best) right++;
    else missed.push(i);
  });
  return { right: right, total: quiz.length, missed: missed };
}

if (typeof document === 'undefined') {
  module.exports = { scoreQuiz: scoreQuiz };
  return;
}

/* =====================================================================
   State
   ===================================================================== */
var C = window.COURSE, B = C.bank;
var KEY = 'speakup.v3';
var app = document.getElementById('app');
var S = load();
var view = { name: 'home' };   /* home | lesson */

function nulls(list) { return (list || []).map(function () { return null; }); }
function blank() {
  var s = { v: 3, checkin: { before: nulls(C.checkin.statements), after: nulls(C.checkin.statements) } };
  /* p holds the student's picks for that lesson, by name. */
  C.lessons.forEach(function (L) {
    s[L.id] = { p: {}, quiz: nulls(L.quiz), recap: nulls(L.recap), at: 0, done: null };
  });
  return s;
}
function load() {
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) { var s = JSON.parse(raw); if (s && s.v === 3) return s; }
  } catch (e) {}
  return blank();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

/* A pick is a bank id, or 'own:' + the student's own words. */
function isOwn(v) { return typeof v === 'string' && v.indexOf('own:') === 0; }
function ownText(v) { return v.slice(4); }
function item(bank, v) { return B[bank].filter(function (x) { return x.id === v; })[0]; }
function cap(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
function low(t) { return t.charAt(0).toLowerCase() + t.slice(1); }
function labelOf(bank, v) { return isOwn(v) ? cap(ownText(v)) : (item(bank, v) || {}).label || ''; }
function sayOf(bank, v) { var it = item(bank, v) || {}; return isOwn(v) ? ownText(v) : it.say || it.label || ''; }
/* Make a full sentence: capital first letter, and a period if nothing ends it. */
function sent(t) { t = cap(t.trim()); return /[.?!”]$/.test(t) ? t : t + '.'; }
function joinAnd(list) {
  if (list.length < 2) return list.join('');
  if (list.length === 2) return list[0] + ' and ' + list[1];
  return list.slice(0, -1).join(', ') + ', and ' + list[list.length - 1];
}
function picks(st, name) { return st.p[name] || []; }
function today() {
  return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ---------- each lesson's script: the student's words, as sentences ---------- */
var WORDS = {
  l1: function (st) {
    var out = [];
    var s = picks(st, 'strengths').map(function (v) { return low(sayOf('strengths', v)); });
    if (s.length) out.push('I am good at ' + joinAnd(s) + '.');
    picks(st, 'hard').forEach(function (hv) {
      out.push(labelOf('hard', hv) + ' is hard for me.');
      var hs = ((st.p.helps || {})[hv] || []).map(function (v) { return sayOf('helps', v); });
      if (hs.length) out.push('It helps when ' + joinAnd(hs) + '.');
    });
    return out;
  },
  l2: function (st) {
    var out = picks(st, 'rights').map(function (v) { return sent(sayOf('rights', v)); });
    var hs = picks(st, 'jobhelps').map(function (v) { return sayOf('helps', v); });
    if (hs.length) {
      out.push('At a job, it helps when ' + joinAnd(hs) + '.');
      out.push('I can ask for that in plain words.');
    }
    return out;
  },
  l3: function (st) {
    var m = picks(st, 'moment')[0];
    if (!m) return [];
    var out = ['Do you have a minute?', sent(sayOf('moments', m))];
    ((st.p.asks || {})[m] || []).forEach(function (v) {
      out.push(isOwn(v) ? 'Can you ' + low(ownText(v)).replace(/[.?!]+$/, '') + '?' : sayOf('asks', v));
    });
    out.push('Thank you.');
    return out;
  },
  l4: function (st) {
    var out = [];
    var g = picks(st, 'goal')[0];
    var hs = picks(st, 'iephelps').map(function (v) { return sayOf('helps', v); });
    if (!g && !hs.length) return out;
    out.push('Hello, everyone. Thank you for coming to my meeting.');
    if (g) out.push('After TRACE, I want to ' + low(sayOf('goals', g)).replace(/[.]+$/, '') + '.');
    if (hs.length) out.push('It helps when ' + joinAnd(hs) + '.');
    out.push('I want to be part of every decision in my plan.');
    return out;
  }
};

/* =====================================================================
   Small DOM helpers
   ===================================================================== */
function h(tag, attrs) {
  var n = document.createElement(tag);
  if (attrs) Object.keys(attrs).forEach(function (k) {
    var v = attrs[k];
    if (v == null || v === false) return;
    if (k === 'class') n.className = v;
    else if (k === 'text') n.textContent = v;
    else if (k.indexOf('on') === 0) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? '' : v);
  });
  for (var i = 2; i < arguments.length; i++) {
    var kid = arguments[i];
    if (kid == null || kid === false) continue;
    (Array.isArray(kid) ? kid : [kid]).forEach(function (x) {
      if (x == null || x === false) return;
      n.appendChild(typeof x === 'string' ? document.createTextNode(x) : x);
    });
  }
  return n;
}

var ICONS = {
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  tool: '<path d="M14.5 5.5a4 4 0 0 0 4 5.5l-8.3 8.3a2 2 0 0 1-2.8-2.8L15.7 8.2a4 4 0 0 0-1.2-2.7z"/><path d="M17 4l3 3"/>',
  loop: '<path d="M4 12a8 8 0 0 1 14-5.3"/><path d="M18.5 3v4h-4"/><path d="M20 12a8 8 0 0 1-14 5.3"/><path d="M5.5 21v-4h4"/>',
  heart: '<path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/>',
  wave: '<path d="M3 9c3-3 6 3 9 0s6 3 9 0"/><path d="M3 15c3-3 6 3 9 0s6 3 9 0"/>',
  sparkle: '<path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8z"/><path d="M18.5 16v4M16.5 18h4"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  bolt: '<path d="M13 2.5L5 13.5h6l-1 8 8-11h-6z"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14a4.2 4.2 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18h2"/>',
  badge: '<rect x="4" y="5" width="16" height="15" rx="2"/><circle cx="12" cy="11" r="2.5"/><path d="M8 17a4 4 0 0 1 8 0"/><path d="M10 5V3h4v2"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  loud: '<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/>',
  page: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15.5h6M9 8.5h2"/>',
  shuffle: '<path d="M3 7h4l8 10h5M3 17h4l2.5-3M13 9.5L15 7h5"/><path d="M18 4.5L20.5 7 18 9.5M18 14.5l2.5 2.5-2.5 2.5"/>',
  people: '<circle cx="8.5" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M3 19a5.5 5.5 0 0 1 11 0M14.5 14.2a4.5 4.5 0 0 1 6.5 4.3"/>',
  hourglass: '<path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7"/><path d="M12 17h.01"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12h.01"/>',
  fast: '<path d="M3.5 6l7.5 6-7.5 6zM12.5 6l7.5 6-7.5 6z"/>',
  pencil: '<path d="M4 20l1-4.5L16.5 4a2.1 2.1 0 0 1 3 3L8.5 19z"/><path d="M14.5 6l3.5 3.5"/>',
  checklist: '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8.5 9l1.500 1.500 3-3M8.5 15l1.500 1.500 3-3"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l5.5 3.5-5.5 3.5z"/>',
  one: '<circle cx="12" cy="12" r="9"/><path d="M10.5 9l2-1.500v9"/>',
  headphones: '<path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"/><rect x="3.5" y="13.5" width="4" height="6.5" rx="1.5"/><rect x="16.5" y="13.5" width="4" height="6.5" rx="1.5"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.500l1.500 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  moretime: '<circle cx="10.5" cy="13.5" r="7"/><path d="M10.5 10v3.500l2.500 1.500M19 2.5v5M16.5 5h5"/>',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8.5 3v4M15.5 3v4"/>',
  chat: '<path d="M4 5h16v11H10l-4.500 4v-4H4z"/><path d="M9 10.5h6"/>',
  image: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M4 17l5-4 3.500 2.500L16 12l4.500 4"/>',
  alarm: '<circle cx="12" cy="13" r="7"/><path d="M12 9.5V13l2 1.500M5 4.5L3 6.5M19 4.5l2 2"/>',
  pause: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7M14 8.5v7"/>',
  cup: '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 10.5h1.500a2.500 2.500 0 0 1 0 5H16M8 3.5V6M12 3.5V6"/>',
  shield: '<path d="M12 3l7 2.500v5.500c0 4.500-3 8-7 10-4-2-7-5.500-7-10V5.500z"/><path d="M9 12l2.200 2.200L15.500 10"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.500"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M14.500 9.300c-.500-.800-1.400-1.300-2.500-1.300-1.500 0-2.600.800-2.600 2s1 1.700 2.600 2 2.700.800 2.700 2-1.200 2-2.700 2c-1.200 0-2.200-.500-2.700-1.400M12 6.500V8M12 16v1.500"/>',
  steps: '<path d="M4 20h4v-4h4v-4h4V8h4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M5 12.5l4.500 4.500L19 7.500"/>',
  home: '<path d="M4 11l8-7 8 7v9h-5.500v-6h-5v6H4z"/>',
  print: '<path d="M7 9V3.500h10V9"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M7 14h10v6.500H7z"/>'
};
function icon(name, cls) {
  var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('viewBox', '0 0 24 24');
  s.setAttribute('class', 'ico' + (cls ? ' ' + cls : ''));
  s.setAttribute('aria-hidden', 'true');
  s.innerHTML = ICONS[name] || '';   /* fixed drawings from the table above, never student text */
  return s;
}
function btn(cls, label, onclick, ico) {
  return h('button', { type: 'button', class: cls, onclick: onclick }, ico ? icon(ico) : null, h('span', { text: label }));
}

/* ---------- read aloud ---------- */
var canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
function stopSpeaking() { if (canSpeak) window.speechSynthesis.cancel(); }
function speak(text) {
  if (!canSpeak) return;
  stopSpeaking();
  var u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}
/* Reads everything marked data-say inside a container, top to bottom. */
function speakIn(root) {
  if (canSpeak && window.speechSynthesis.speaking) { stopSpeaking(); return; }
  var parts = [];
  root.querySelectorAll('[data-say]').forEach(function (n) {
    var t = n.textContent.trim();
    if (t) parts.push(/[.?!”]$/.test(t) ? t : t + '.');
  });
  speak(parts.join(' '));
}
function listenBtn(root, label) {
  if (!canSpeak) return null;
  return btn('listen', label || 'Listen', function () { speakIn(root()); }, 'loud');
}

/* =====================================================================
   Views
   ===================================================================== */
function go(v) { stopSpeaking(); view = v; render(); }
function render() {
  app.textContent = '';
  window.scrollTo(0, 0);
  if (view.name === 'lesson') renderLesson();
  else renderHome();
  var head = app.querySelector('h1');
  if (head) { head.setAttribute('tabindex', '-1'); head.focus({ preventScroll: true }); }
}

function bubble(sentences, lead) {
  return h('div', { class: 'bubble' },
    lead ? h('p', { class: 'bubble__lead', text: lead }) : null,
    sentences.map(function (s) { return h('p', { 'data-say': true, text: s }); }));
}

/* ---------- home ---------- */
function renderHome() {
  /* Show the words from the newest finished lesson, if there is one. */
  var words = [], from = '';
  C.lessons.forEach(function (L) {
    var w = S[L.id].done ? WORDS[L.id](S[L.id]) : [];
    if (w.length) { words = w; from = L.title; }
  });
  var hero = h('section', { class: 'hero' },
    h('div', { class: 'wrap' },
      h('h1', { text: 'Speak up.' }),
      words.length
        ? bubble(words, 'Your words from “' + from + '”')
        : bubble(['Say what you are good at.', 'Say what is hard.', 'Say what helps.'])));

  var list = h('ol', { class: 'lessons' });
  C.lessons.forEach(function (L, i) {
    var st = S[L.id], action;
    if (st.done) action = h('div', { class: 'row__acts' },
      h('span', { class: 'tag tag--done' }, icon('check'), 'Done'),
      btn('btn btn--quiet', 'Print my sheet', function () { printSheet(L); }, 'print'),
      btn('btn btn--quiet', 'Look again', function () { S[L.id].at = 0; save(); go({ name: 'lesson', id: L.id }); }));
    else action = btn('btn', st.at > 0 ? 'Keep going' : 'Start', function () { go({ name: 'lesson', id: L.id }); });
    list.appendChild(h('li', { class: 'row' },
      h('span', { class: 'row__n', text: String(i + 1) }),
      h('div', { class: 'row__txt' }, h('h3', { text: L.title }), h('p', { text: L.idea })),
      action));
  });

  var fresh = h('div', { class: 'fresh' });
  function freshIdle() {
    fresh.textContent = '';
    fresh.appendChild(btn('btn btn--quiet', 'Start fresh for a new student', function () {
      fresh.textContent = '';
      fresh.appendChild(h('p', { text: 'This clears every answer on this device. Print first if you need the sheet.' }));
      fresh.appendChild(btn('btn btn--warn', 'Yes, clear it', function () { S = blank(); save(); go({ name: 'home' }); }));
      fresh.appendChild(btn('btn btn--quiet', 'Keep it', freshIdle));
    }));
  }
  freshIdle();

  app.appendChild(h('div', { class: 'home' }, hero,
    h('section', { class: 'wrap' },
      h('h2', { text: 'Four lessons. About 15 minutes each.' }),
      h('p', { class: 'lede', text: 'Do one today. Come back for the next one. Each lesson ends with a sheet to print.' }),
      list,
      h('div', { class: 'tools' }, fresh),
      h('p', { class: 'fine' }, 'Your answers stay on this device. Nothing is sent anywhere. ',
        h('a', { href: 'staff-guide.html', text: 'Staff guide' })))));
}

/* ---------- lesson frame ---------- */
function lessonById(id) { return C.lessons.filter(function (x) { return x.id === id; })[0]; }

/* Some screens only appear when there is something to show. */
function skipped(scr, st) {
  if (scr.only && !st.p[scr.only]) return true;                         /* opt-in section not opened */
  if (scr.type === 'pickfor' && !picks(st, scr.parent)[scr.slot || 0]) return true;
  return false;
}

function renderLesson() {
  var L = lessonById(view.id), st = S[L.id], screens = L.screens;
  var i = Math.min(st.at || 0, screens.length - 1);
  while (i > 0 && skipped(screens[i], st)) i--;
  var scr = screens[i];
  function step(dir) {
    var k = i + dir;
    while (k >= 0 && k < screens.length && skipped(screens[k], st)) k += dir;
    return k;
  }
  var shown = screens.filter(function (x) { return !skipped(x, st); });
  var isLast = step(1) >= screens.length;

  var stage = h('main', { class: 'stage wrap' });
  var hint = h('p', { class: 'nav__hint', 'aria-live': 'polite' });
  var next = btn('btn btn--next', isLast ? 'Back to home' : 'Next', function () {
    if (next.getAttribute('aria-disabled') === 'true') {
      hint.classList.remove('is-nudge'); void hint.offsetWidth; hint.classList.add('is-nudge');
      return;
    }
    if (isLast) { go({ name: 'home' }); return; }
    st.at = step(1); save(); go({ name: 'lesson', id: L.id });
  });
  var back = btn('btn btn--quiet', 'Back', function () {
    var k = step(-1);
    if (k < 0) { go({ name: 'home' }); return; }
    st.at = k; save(); go({ name: 'lesson', id: L.id });
  });
  var api = {
    L: L, st: st, index: i,
    ready: function (ok, text) {
      next.setAttribute('aria-disabled', ok ? 'false' : 'true');
      hint.textContent = ok ? '' : (text || '');
    }
  };
  api.ready(true);

  var pos = shown.indexOf(scr) + 1;
  var prog = h('div', { class: 'bar__prog' },
    h('span', { text: 'Lesson ' + (C.lessons.indexOf(L) + 1) + ', step ' + pos + ' of ' + shown.length }),
    h('progress', { max: String(shown.length), value: String(pos) }));

  app.appendChild(h('div', { class: 'lesson' },
    h('header', { class: 'bar' },
      h('div', { class: 'wrap bar__in' },
        btn('bar__home', 'Home', function () { go({ name: 'home' }); }, 'home'),
        prog,
        listenBtn(function () { return stage; }))),
    stage,
    h('footer', { class: 'nav' }, h('div', { class: 'wrap nav__in' }, back, hint, next))));

  SCREENS[scr.type](scr, stage, api);
}

function head(scr, root) {
  root.appendChild(h('h1', { 'data-say': true, text: scr.h }));
  (scr.body || []).forEach(function (p) { root.appendChild(h('p', { class: 'lede', 'data-say': true, text: p })); });
}

/* ---------- screen types ---------- */
var SCREENS = {};

SCREENS.say = function (scr, root) {
  head(scr, root);
  if (scr.points) root.appendChild(h(scr.ordered ? 'ol' : 'ul', { class: 'points' + (scr.ordered ? ' points--n' : '') }, scr.points.map(function (p) {
    return h('li', null, p.icon ? icon(p.icon) : null, h('div', null,
      h('p', { class: 'points__t', 'data-say': true, text: p.text }),
      p.more ? h('p', { class: 'points__m', 'data-say': true, text: p.more }) : null));
  })));
  if (scr.pairs) root.appendChild(h('table', { class: 'pairs' + (scr.pairs.plain ? ' pairs--plain' : '') },
    h('thead', null, h('tr', null, h('th', { 'data-say': true, text: scr.pairs.left }), h('th', { 'data-say': true, text: scr.pairs.right }))),
    h('tbody', null, scr.pairs.rows.map(function (r) {
      return h('tr', null, h('td', { 'data-say': true, text: r[0] }), h('td', { 'data-say': true, text: r[1] }));
    }))));
  (scr.after || []).forEach(function (p) { root.appendChild(h('p', { class: 'lede', 'data-say': true, text: p })); });
};

SCREENS.checkin = function (scr, root, api) {
  head(scr, root);
  var vals = S.checkin[scr.when];
  function check() {
    var left = vals.filter(function (v) { return v == null; }).length;
    api.ready(left === 0, 'Answer all ' + vals.length + ' to keep going.');
  }
  C.checkin.statements.forEach(function (text, n) {
    var group = h('div', { class: 'rate', role: 'group', 'aria-label': text });
    var opts = C.checkin.scale.map(function (label, v) {
      return h('button', { type: 'button', class: 'rate__opt', 'aria-pressed': String(vals[n] === v), text: label, onclick: function () {
        vals[n] = v; save();
        opts.forEach(function (o, k) { o.setAttribute('aria-pressed', String(k === v)); });
        check();
      } });
    });
    group.appendChild(h('p', { class: 'rate__q', 'data-say': true, text: text }));
    group.appendChild(h('div', { class: 'rate__opts' }, opts));
    root.appendChild(group);
  });
  check();
};

/* A yes-or-skip question that opens an optional part of the lesson. */
SCREENS.optin = function (scr, root, api) {
  head(scr, root);
  var st = api.st;
  var opts = [[1, scr.yes], [0, scr.no]].map(function (o) {
    return h('button', { type: 'button', class: 'choice', 'aria-pressed': String(st.p[scr.key] === o[0]), 'data-say': true, text: o[1], onclick: function () {
      st.p[scr.key] = o[0]; save(); go({ name: 'lesson', id: api.L.id });
    } });
  });
  root.appendChild(h('div', { class: 'choices' }, opts));
  api.ready(st.p[scr.key] != null, 'Pick one.');
};

/* Shared card grid for picking from a bank, with an "in my own words" card. */
function pickGrid(o) {
  /* o: bank, ids (which bank items to show), more (ids hidden behind a button),
        get(), set(list), max, ownLead, ownTail, ownHint, onchange */
  var grid = h('div', { class: 'cards' + (o.wide ? ' cards--wide' : '') });
  var extra = h('div', { class: 'cards__more' });
  function draw() {
    var picked = o.get();
    grid.textContent = '';
    var full = picked.length >= o.max;
    function card(v, label, ico) {
      var on = picked.indexOf(v) >= 0;
      return h('button', {
        type: 'button', class: 'card', 'aria-pressed': String(on), 'aria-disabled': String(!on && full && o.max > 1),
        onclick: function () {
          var cur = o.get().slice(), at = cur.indexOf(v);
          if (at >= 0) cur.splice(at, 1);
          else if (o.max === 1) cur = [v];          /* picking one: a new tap swaps the choice */
          else if (cur.length < o.max) cur.push(v);
          else return;
          o.set(cur); draw();
        }
      }, icon(ico), h('span', { class: 'card__t', 'data-say': true, text: label }), on ? icon('check', 'card__ok') : null);
    }
    var shown = o.ids.slice();
    if (o.more && (o.open || picked.some(function (v) { return o.more.indexOf(v) >= 0; }))) { shown = shown.concat(o.more); o.open = true; }
    shown.forEach(function (id) { var it = item(o.bank, id); grid.appendChild(card(id, it.label, it.icon)); });
    picked.filter(isOwn).forEach(function (v) { grid.appendChild(card(v, cap(ownText(v)), 'pencil')); });

    extra.textContent = '';
    if (o.more && o.more.length && !o.open) extra.appendChild(btn('btn btn--quiet', 'Show more ideas', function () { o.open = true; draw(); }));
    if (!full || o.max === 1) {
      var inp = h('input', { class: 'field', type: 'text', id: 'own', maxlength: '70', autocomplete: 'off', placeholder: o.ownHint || '' });
      var add = function () {
        var txt = inp.value.trim().replace(/[.!?]+$/, '');
        if (!txt) { inp.focus(); return; }
        var cur = o.max === 1 ? [] : o.get().slice();
        cur.push('own:' + txt); o.set(cur); draw();
      };
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
      extra.appendChild(h('div', { class: 'own' },
        h('label', { class: 'label', for: 'own', text: 'Or use your own words' }),
        h('div', { class: 'own__row' },
          o.ownLead ? h('span', { class: 'own__fix', text: o.ownLead }) : null,
          inp,
          o.ownTail ? h('span', { class: 'own__fix', text: o.ownTail }) : null,
          btn('btn btn--quiet', 'Add', add, 'plus'))));
    }
    o.onchange(picked);
  }
  draw();
  return h('div', null, grid, extra);
}
function ids(bank) { return B[bank].map(function (x) { return x.id; }); }

/* Pick from a whole bank. count = exactly that many; or min and max. */
SCREENS.pick = function (scr, root, api) {
  head(scr, root);
  var st = api.st, name = scr.save || scr.bank;
  var max = scr.count || scr.max, min = scr.count || scr.min || 1;
  if (!st.p[name]) st.p[name] = [];
  root.appendChild(pickGrid({
    bank: scr.bank, ids: ids(scr.bank), wide: scr.wide,
    get: function () { return st.p[name]; },
    set: function (list) { st.p[name] = list; save(); },
    max: max, ownLead: scr.ownLead, ownTail: scr.ownTail, ownHint: scr.ownHint,
    onchange: function (picked) {
      var left = min - picked.length;
      api.ready(left <= 0, left === min && min === 1 ? 'Pick one.' : 'Pick ' + left + ' more.');
    }
  }));
};

/* Pick something that goes with an earlier pick (what helps with this hard thing,
   what to ask in this moment). The earlier pick's "next" list is shown first. */
SCREENS.pickfor = function (scr, root, api) {
  var st = api.st, pv = picks(st, scr.parent)[scr.slot || 0];
  var name = scr.save || scr.bank;
  var first = isOwn(pv) ? ids(scr.bank).slice(0, 4) : item(scr.parentBank, pv).next;
  var rest = ids(scr.bank).filter(function (id) { return first.indexOf(id) < 0; });
  root.appendChild(h('h1', { 'data-say': true, text: scr.h }));
  root.appendChild(h('p', { class: 'chip', 'data-say': true },
    icon(isOwn(pv) ? 'pencil' : item(scr.parentBank, pv).icon), scr.chip.replace('{x}', labelOf(scr.parentBank, pv))));
  (scr.body || []).forEach(function (p) { root.appendChild(h('p', { class: 'lede', 'data-say': true, text: p })); });
  if (!st.p[name]) st.p[name] = {};
  if (!st.p[name][pv]) st.p[name][pv] = [];
  root.appendChild(pickGrid({
    bank: scr.bank, ids: first, more: rest, wide: scr.wide,
    get: function () { return st.p[name][pv]; },
    set: function (list) { st.p[name][pv] = list; save(); },
    max: scr.max || 2, ownLead: scr.ownLead, ownHint: scr.ownHint,
    onchange: function (picked) { api.ready(picked.length >= 1, scr.max === 1 ? 'Pick one.' : 'Pick at least 1.'); }
  }));
};

SCREENS.story = function (scr, root, api) {
  var flag = 'seen' + api.index, st = api.st;
  root.appendChild(h('h1', { 'data-say': true, text: scr.h }));
  scr.scene.forEach(function (p) { root.appendChild(h('p', { class: 'lede', 'data-say': true, text: p })); });
  root.appendChild(h('p', { class: 'ask', 'data-say': true, text: scr.ask }));
  var out = h('div', { class: 'result', 'aria-live': 'polite' });
  var list = h('div', { class: 'choices' });
  scr.choices.forEach(function (c) {
    var b = h('button', { type: 'button', class: 'choice', 'data-say': true, text: c.text, onclick: function () {
      list.querySelectorAll('.choice').forEach(function (x) { x.classList.remove('is-picked', 'is-good', 'is-off'); });
      b.classList.add('is-picked', c.good ? 'is-good' : 'is-off');
      out.textContent = '';
      out.className = 'result ' + (c.good ? 'result--good' : 'result--off');
      out.appendChild(h('p', { class: 'result__h', text: c.good ? 'That works.' : 'Here is what happens.' }));
      out.appendChild(h('p', { text: c.result }));
      if (!c.good) out.appendChild(h('p', { class: 'result__again', text: 'Try a different answer.' }));
      if (canSpeak) out.appendChild(btn('listen', 'Listen', function () { speak(c.result); }, 'loud'));
      if (c.good) { st.p[flag] = 1; save(); }
      api.ready(c.good || !!st.p[flag], 'Find the answer that works.');
    } });
    list.appendChild(b);
  });
  root.appendChild(list);
  root.appendChild(out);
  api.ready(!!st.p[flag], 'Pick an answer.');
};

/* Sort lines into piles, one line at a time. Practice only; not scored. */
SCREENS.sort = function (scr, root, api) {
  var flag = 'seen' + api.index, st = api.st, n = 0;
  head(scr, root);
  var box = h('div', { class: 'sort' });
  root.appendChild(box);
  function draw() {
    var it = scr.items[n];
    box.textContent = '';
    box.appendChild(h('p', { class: 'kicker', text: (n + 1) + ' of ' + scr.items.length }));
    box.appendChild(h('p', { class: 'sort__line', 'data-say': true, text: it.text }));
    var out = h('div', { class: 'result', 'aria-live': 'polite' });
    var row = h('div', { class: 'sort__piles' });
    var buttons = scr.piles.map(function (label, k) {
      return h('button', { type: 'button', class: 'choice', text: label, onclick: function () {
        if (row.dataset.done) return;
        row.dataset.done = '1';
        var ok = k === it.pile;
        buttons.forEach(function (b, j) { b.setAttribute('aria-disabled', 'true'); if (j === it.pile) b.classList.add('is-good'); });
        if (!ok) buttons[k].classList.add('is-off');
        out.className = 'result ' + (ok ? 'result--good' : 'result--off');
        out.appendChild(h('p', { class: 'result__h', text: ok ? 'Yes.' : 'It is “' + scr.piles[it.pile] + '.”' }));
        out.appendChild(h('p', { text: it.why }));
        if (n < scr.items.length - 1) out.appendChild(btn('btn', 'Next one', function () { n++; draw(); }));
        else { st.p[flag] = 1; save(); api.ready(true); }
      } });
    });
    buttons.forEach(function (b) { row.appendChild(b); });
    box.appendChild(row);
    box.appendChild(out);
  }
  draw();
  api.ready(!!st.p[flag], 'Sort all ' + scr.items.length + ' to keep going.');
};

/* A quiz question. set: 'quiz' (this lesson) or 'recap' (from earlier lessons). */
SCREENS.q = function (scr, root, api) {
  var set = scr.set || 'quiz', q = api.L[set][scr.n], ans = api.st[set];
  var lead = set === 'recap' ? 'From last time, question ' : 'Quiz, question ';
  root.appendChild(h('p', { class: 'kicker', text: lead + (scr.n + 1) + ' of ' + api.L[set].length }));
  root.appendChild(h('h1', { 'data-say': true, text: q.scene }));
  root.appendChild(h('p', { class: 'ask', 'data-say': true, text: q.ask }));
  var list = h('div', { class: 'choices' });
  var out = h('div', { class: 'result', 'aria-live': 'polite' });
  var buttons = q.choices.map(function (text, k) {
    return h('button', { type: 'button', class: 'choice', 'data-say': true, text: text, onclick: function () {
      if (ans[scr.n] != null) return;
      ans[scr.n] = k; save(); show();   /* the first tap is the one that counts */
    } });
  });
  function show() {
    var picked = ans[scr.n];
    if (picked == null) { api.ready(false, 'Pick your answer. Your first try counts.'); return; }
    buttons.forEach(function (b, k) {
      b.setAttribute('aria-disabled', 'true');
      if (k === q.best) { b.classList.add('is-good'); b.appendChild(h('span', { class: 'choice__tag', text: 'Best answer' })); }
      else if (k === picked) { b.classList.add('is-off'); b.appendChild(h('span', { class: 'choice__tag', text: 'Your answer' })); }
    });
    var ok = picked === q.best;
    out.className = 'result ' + (ok ? 'result--good' : 'result--off');
    out.textContent = '';
    out.appendChild(h('p', { class: 'result__h', text: ok ? 'You got it.' : 'Not this time.' }));
    out.appendChild(h('p', { text: q.why }));
    if (canSpeak) out.appendChild(btn('listen', 'Listen', function () { speak(q.why); }, 'loud'));
    api.ready(true);
  }
  buttons.forEach(function (b) { list.appendChild(b); });
  root.appendChild(list);
  root.appendChild(out);
  show();
};

SCREENS.build = function (scr, root, api) {
  root.appendChild(h('h1', { text: scr.h || 'These are your words.' }));
  root.appendChild(h('p', { class: 'lede', text: (scr.body || ['You picked every part. Read it out loud, or tap Listen.'])[0] }));
  var b = bubble(WORDS[api.L.id](api.st));
  root.appendChild(b);
  if (canSpeak) root.appendChild(h('div', { class: 'acts' }, listenBtn(function () { return b; }, 'Listen to my words')));
  (scr.after || []).forEach(function (p) { root.appendChild(h('p', { class: 'lede', text: p })); });
  root.appendChild(h('p', { class: 'fine', text: 'Want to change something? Tap Back and pick again.' }));
};

SCREENS.done = function (scr, root, api) {
  var L = api.L, st = api.st;
  if (!st.done) { st.done = today(); save(); }
  var sc = scoreQuiz(L.quiz, st.quiz);
  root.appendChild(h('h1', { 'data-say': true, text: 'Lesson ' + (C.lessons.indexOf(L) + 1) + ' is done.' }));
  root.appendChild(h('p', { class: 'score', 'data-say': true },
    'Quiz: ', h('strong', { text: sc.right + ' of ' + sc.total }), ' right on the first try.'));
  if (L.recap) {
    var rc = scoreQuiz(L.recap, st.recap);
    root.appendChild(h('p', { class: 'score score--s', 'data-say': true },
      'From earlier lessons: ', h('strong', { text: rc.right + ' of ' + rc.total }), ' remembered.'));
  }
  root.appendChild(h('p', { class: 'lede', 'data-say': true, text: 'Print your sheet. It has your words and your score. It goes in your folder.' }));
  root.appendChild(h('div', { class: 'acts' }, btn('btn', 'Print my sheet', function () { printSheet(L); }, 'print')));
  if (L.todo) {
    root.appendChild(h('h2', { class: 'sub', 'data-say': true, text: L.todoTitle || 'Before the next lesson' }));
    root.appendChild(h('ul', { class: 'todo' }, L.todo.map(function (t) { return h('li', { 'data-say': true, text: t }); })));
  }
};

/* =====================================================================
   The printed sheet (one page per lesson)
   ===================================================================== */
function ul(list) { return h('ul', null, list.map(function (t) { return h('li', { text: t }); })); }
function block(title, node) { return h('div', null, h('h2', { text: title }), node); }

/* The top of each lesson's sheet: what the student picked. */
var SHEET = {
  l1: function (st) {
    var rows = picks(st, 'hard').map(function (hv) {
      var hs = ((st.p.helps || {})[hv] || []).map(function (v) { return labelOf('helps', v); });
      return h('tr', null, h('td', { text: labelOf('hard', hv) }), h('td', null, hs.map(function (t) { return h('div', { text: t }); })));
    });
    return [
      block('I am good at', ul(picks(st, 'strengths').map(function (v) { return labelOf('strengths', v); }))),
      block('What is hard, and what helps', h('table', { class: 'sh__tbl' },
        h('thead', null, h('tr', null, h('th', { text: 'Hard for me' }), h('th', { text: 'What helps' }))),
        h('tbody', null, rows)))
    ];
  },
  l2: function (st) {
    return [
      block('Rights I want to remember', ul(picks(st, 'rights').map(function (v) { return labelOf('rights', v); }))),
      block('At a job, I might ask for', ul(picks(st, 'jobhelps').map(function (v) { return labelOf('helps', v); })))
    ];
  },
  l3: function (st) {
    var m = picks(st, 'moment')[0];
    return [
      block('A moment that happens to me', ul(m ? [labelOf('moments', m)] : [])),
      block('What I will ask', ul(((st.p.asks || {})[m] || []).map(function (v) { return labelOf('asks', v); })))
    ];
  },
  l4: function (st) {
    return [
      block('My next step in my meeting', ul(picks(st, 'ladder').map(function (v) { return labelOf('ladder', v); }))),
      block('My goal and what helps', ul(
        picks(st, 'goal').map(function (v) { return 'Goal: ' + labelOf('goals', v); })
          .concat(picks(st, 'iephelps').map(function (v) { return 'Helps: ' + labelOf('helps', v); }))))
    ];
  }
};

function printSheet(L) {
  var st = S[L.id], sc = scoreQuiz(L.quiz, st.quiz);
  var sheet = document.getElementById('sheet');
  var n = C.lessons.indexOf(L) + 1;
  sheet.textContent = '';

  var quizRows = L.quiz.map(function (q, i) {
    var ok = st.quiz[i] === q.best;
    return h('tr', null,
      h('td', { text: String(i + 1) }), h('td', { text: q.skill }),
      h('td', { text: st.quiz[i] == null ? 'Not answered' : ok ? 'Right' : 'Missed' }));
  });

  /* Confidence check: asked before Lesson 1 and after Lesson 4. */
  var when = L.screens.filter(function (x) { return x.type === 'checkin'; }).map(function (x) { return x.when; })[0];
  var check = null;
  if (when) {
    var both = when === 'after' && S.checkin.before.some(function (v) { return v != null; });
    check = h('div', null,
      h('p', { text: when === 'before' ? 'Before the course, the student said:' : 'After the course, the student said:' }),
      h('table', { class: 'sh__tbl' },
        both ? h('thead', null, h('tr', null, h('th'), h('th', { text: 'Before' }), h('th', { text: 'After' }))) : null,
        h('tbody', null, C.checkin.statements.map(function (t, i) {
          var a = S.checkin[when][i], b = S.checkin.before[i];
          return h('tr', null, h('td', { text: t }),
            both ? h('td', { text: b == null ? '' : C.checkin.scale[b] }) : null,
            h('td', { text: a == null ? '' : C.checkin.scale[a] }));
        }))));
  }
  var recap = null;
  if (L.recap) {
    var rc = scoreQuiz(L.recap, st.recap);
    recap = h('p', null, 'Remembered from earlier lessons: ', h('strong', { text: rc.right + ' of ' + rc.total }));
  }

  sheet.appendChild(h('div', { class: 'sh' },
    h('div', { class: 'sh__top' },
      h('div', null, h('p', { class: 'sh__brand', text: 'Speak Up' }), h('p', { class: 'sh__title', text: 'Lesson ' + n + ': ' + L.title })),
      h('div', { class: 'sh__who' },
        h('p', null, 'Name ', h('span', { class: 'sh__line' })),
        h('p', { text: 'Date: ' + (st.done || today()) }))),

    h('div', { class: 'sh__cols' }, SHEET[L.id](st)),

    h('h2', { text: 'My words' }),
    h('div', { class: 'sh__bubble' }, WORDS[L.id](st).map(function (s) { return h('p', { text: s }); })),

    L.card ? h('div', { class: 'sh__card' },
      h('h2', { text: L.card.h }),
      h(L.card.ordered ? 'ol' : 'ul', null, L.card.items.map(function (t) { return h('li', { text: t }); }))) : null,

    h('div', { class: 'sh__staff' },
      h('h2', { text: 'Staff record' }),
      h('div', { class: 'sh__cols' },
        h('div', null,
          h('p', null, 'Quiz, first try: ', h('strong', { text: sc.right + ' of ' + sc.total })),
          h('table', { class: 'sh__tbl' },
            h('thead', null, h('tr', null, h('th', { text: '#' }), h('th', { text: 'Skill' }), h('th', { text: 'First try' }))),
            h('tbody', null, quizRows))),
        h('div', null,
          recap, check,
          L.todo ? h('div', { class: 'sh__todo' },
            h('p', null, h('strong', { text: 'Student, ' + low(L.todoTitle || 'Before the next lesson') + ':' })),
            L.todo.map(function (t) { return h('p', null, h('span', { class: 'sh__box' }), ' ' + t); })) : null)),
      h('p', { class: 'sh__sign' },
        h('span', { class: 'sh__box' }), ' Student read their words out loud to staff',
        h('span', { class: 'sh__gap' }), 'Staff initials ', h('span', { class: 'sh__line sh__line--s' })),
      h('p', null, 'Notes ', h('span', { class: 'sh__line sh__line--l' })))));

  window.print();
}

render();
})();
