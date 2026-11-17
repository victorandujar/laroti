import { waUrl } from '../data/empresa';
import { ui, type Lang } from '../i18n/ui';
import { deIso, diaCorto, diasRecogida, fechaLarga, iso, mesCorto, numDia, tienda } from './horario';
import { anadirReserva, leerTablon, nuevoCodigo, piezasDe, textoLinea, type Linea, type Reserva } from './store';

const $ = <T extends HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const lang = (document.documentElement.lang === 'en' ? 'en' : 'es') as Lang;
const tx = ui[lang];

/* ---------- Estado de la tienda ---------- */
function pintaEstado() {
  const t = tienda();
  const hoyIso = iso(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 12)));
  for (const box of $$('[data-estado]')) {
    box.dataset.abierta = String(t.abierta);
    $('[data-e1]', box)!.textContent = t.abierta ? tx.estado.abierto : tx.estado.cerrado;
    $('[data-e2]', box)!.textContent = t.abierta ? tx.estado.hasta
      : `${tx.estado.abrimos} ${t.diaAbre && iso(t.proxima) === hoyIso ? tx.estado.hoy : `${fechaLarga(t.proxima, lang).split(',')[0]} ${tx.estado.alas}`}`;
  }
  const f = $('[data-hoy-fecha]');
  if (f) f.textContent = fechaLarga(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 12)), lang);
  const txt = $('[data-hoy-texto]');
  if (txt && !t.diaAbre) txt.textContent = tx.hoy.cerrado;
  const dow = new Date().getDay();
  for (const d of $$('[data-dow]')) d.classList.toggle('avui', Number(d.dataset.dow) === dow && !d.classList.contains('tancat'));
}

/* ---------- Tablón «Hoy en tienda» ---------- */
function pintaTablon() {
  const tablon = leerTablon();
  let visibles = 0;
  const orden = { hay: 0, pocos: 1, agotado: 2, no: 3 };
  const lista = $('[data-tablon]');
  for (const li of $$('[data-hoy]')) {
    const e = tablon[li.dataset.hoy ?? ''] ?? 'no';
    li.hidden = e === 'no';
    li.dataset.estado = e;
    li.style.order = String(orden[e]);
    if (e !== 'no') { visibles++; $('[data-disp]', li)!.textContent = tx.hoy.disp[e]; }
  }
  if (lista) lista.dataset.buit = String(visibles === 0);
  const rec = $('[data-hoy-recompte]');
  if (rec) rec.textContent = String([...Object.values(tablon)].filter((e) => e === 'hay' || e === 'pocos').length);
  const nada = $('[data-hoy-nada]');
  if (nada) nada.hidden = visibles > 0;
}

/* ---------- Reserva ---------- */
const cesta = new Map<string, number>();
const dias = diasRecogida(6);
let dia = dias[0] ? iso(dias[0]) : '';
const form = $<HTMLFormElement>('[data-form]');

function pintaDias() {
  const box = $('[data-dias]');
  if (!box) return;
  box.replaceChildren(...dias.map((d) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'dia';
    b.setAttribute('aria-pressed', String(iso(d) === dia));
    b.innerHTML = `<span class="d">${diaCorto(d, lang)}</span><span class="n">${numDia(d)}</span><span class="m">${mesCorto(d, lang)}</span>`;
    b.addEventListener('click', () => { dia = iso(d); pintaDias(); pinta(); });
    return b;
  }));
}

function lineas(): Linea[] { return [...cesta].filter(([, q]) => q > 0).map(([id, qty]) => ({ id, qty })); }
function pinta() {
  const l = lineas(), piezas = piezasDe(l);
  for (const it of $$('[data-item]')) {
    const q = cesta.get(it.dataset.item ?? '') ?? 0;
    $('[data-qty]', it)!.textContent = String(q);
    const b = $('[data-badge]', it); if (b) b.textContent = String(q);
    it.classList.toggle('on', q > 0);
  }
  for (const c of $$('[data-cuenta]')) { c.textContent = String(piezas); c.hidden = piezas === 0; }
  const barra = $('[data-barra]');
  if (barra) { barra.hidden = piezas === 0; $('[data-barra-piezas]', barra)!.textContent = tx.reserva.piezas(piezas); }
  $('[data-dia-txt]')!.textContent = dia ? fechaLarga(deIso(dia), lang) : '';
  $('[data-vacio]')!.hidden = piezas > 0;
  $('[data-lineas]')!.replaceChildren(...l.map((x) => { const li = document.createElement('li'); li.className = 'flex justify-between gap-3 font-bold'; li.textContent = textoLinea(x); return li; }));
}
for (const it of $$('[data-item]')) {
  const id = it.dataset.item ?? '';
  const cambia = (d: number) => { cesta.set(id, Math.max(0, Math.min(12, (cesta.get(id) ?? 0) + d))); pinta(); };
  for (const b of $$('[data-mas]', it)) b.addEventListener('click', () => cambia(1));
  $('[data-menos]', it)?.addEventListener('click', () => cambia(-1));
}
const paso = (n: 'form' | 'ok') => { for (const p of $$('[data-paso]')) p.hidden = p.dataset.paso !== n; };
$('[data-otra]')?.addEventListener('click', () => paso('form'));

form?.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const d = new FormData(form), l = lineas();
  const nombre = String(d.get('nombre') ?? '').trim(), telefono = String(d.get('telefono') ?? '').trim(), nota = String(d.get('nota') ?? '').trim();
  const err = $('[data-error]')!;
  const falla = !l.length ? tx.reserva.eVacio : !nombre ? tx.reserva.eNombre : telefono.replace(/\D/g, '').length < 9 ? tx.reserva.eTel : '';
  err.hidden = !falla; err.textContent = falla;
  if (falla) return;
  const r: Reserva = { code: nuevoCodigo(), nombre, telefono, dia, nota, lineas: l, estado: 'confirmada', canal: 'web', creado: new Date().toISOString(), ejemplo: false };
  anadirReserva(r);
  const fecha = fechaLarga(deIso(dia), lang);
  $('[data-ok-nombre]')!.textContent = nombre;
  $('[data-ok-codigo]')!.textContent = r.code;
  $('[data-ok-dia]')!.textContent = fecha;
  $('[data-ok-lineas]')!.replaceChildren(...l.map((x) => { const li = document.createElement('li'); li.textContent = textoLinea(x); return li; }));
  $<HTMLAnchorElement>('[data-ok-wa]')!.href = waUrl([tx.reserva.msg(nombre), ...l.map((x) => `- ${textoLinea(x)}`), `${tx.reserva.msgDia} ${fecha}`, nota ? `${tx.reserva.msgNota} ${nota}` : '', `${tx.reserva.msgCod} ${r.code}`].filter(Boolean).join('\n'));
  cesta.clear(); form.reset(); pinta(); paso('ok');
  $('#reserva')?.scrollIntoView({ block: 'start' });
});

/* ---------- Reservar desde el mostrador ---------- */
const toast = $('[data-toast]');
let toastT = 0;
for (const b of $$<HTMLButtonElement>('[data-quick]')) b.addEventListener('click', () => {
  const id = b.dataset.quick ?? '';
  cesta.set(id, Math.min(12, (cesta.get(id) ?? 0) + 1));
  pinta();
  if (toast) {
    $('[data-toast-txt]', toast)!.textContent = tx.hoy.anadido(b.dataset.nom ?? '');
    toast.classList.add('on');
    window.clearTimeout(toastT);
    toastT = window.setTimeout(() => toast.classList.remove('on'), 3200);
  }
});

/* ---------- Filtro de la reserva ---------- */
for (const f of $$('[data-rfiltro]')) f.addEventListener('click', () => {
  for (const o of $$('[data-rfiltro]')) o.setAttribute('aria-pressed', String(o === f));
  for (const c of $$('[data-item]')) c.hidden = f.dataset.rfiltro !== 'todo' && c.dataset.cat !== f.dataset.rfiltro;
});

pintaEstado(); pintaTablon(); pintaDias(); pinta();
window.setInterval(() => { pintaEstado(); pintaTablon(); }, 60000);
window.addEventListener('storage', pintaTablon);
