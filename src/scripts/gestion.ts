import { porId, productos } from '../data/productos';
import { deIso, diasRecogida, fechaLarga, iso } from './horario';
import { guardarReservas, guardarTablon, leerReservas, leerTablon, nuevoCodigo, piezasDe, reiniciar, textoLinea, type Canal, type Disp, type Linea, type Reserva } from './store';

const $ = <T extends HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const CANAL: Record<Canal, string> = { web: 'Web', whatsapp: 'WhatsApp', instagram: 'Instagram', tienda: 'En tienda' };
function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', text = ''): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e;
}

/* ---------- Tablón ---------- */
let tablon = leerTablon();
function pintaTablon() {
  for (const f of $$('[data-fila]')) {
    const e = tablon[f.dataset.fila ?? ''] ?? 'no';
    for (const b of $$('[data-set]', f)) b.setAttribute('aria-pressed', String(b.dataset.set === e));
  }
}
for (const f of $$('[data-fila]')) for (const b of $$('[data-set]', f)) {
  b.addEventListener('click', () => { tablon[f.dataset.fila ?? ''] = (b.dataset.set ?? 'no') as Disp; guardarTablon(tablon); pintaTablon(); });
}
for (const b of $$('[data-todo]')) b.addEventListener('click', () => {
  for (const p of productos) tablon[p.id] = (b.dataset.todo ?? 'no') as Disp;
  guardarTablon(tablon); pintaTablon();
});

/* ---------- Reservas ---------- */
let reservas = leerReservas();
const dias = diasRecogida(6).map(iso);
let dia = dias[0] ?? '';

function pintaDias() {
  $('[data-dias]')!.replaceChildren(...dias.map((d) => {
    const n = reservas.filter((r) => r.dia === d && r.estado !== 'cancelada').length;
    const b = el('button', 'pdia', `${fechaLarga(deIso(d)).replace(/ de \w+$/, '')}${n ? ` · ${n}` : ''}`);
    b.type = 'button'; b.setAttribute('aria-pressed', String(d === dia));
    b.addEventListener('click', () => { dia = d; pinta(); });
    return b;
  }));
}

function pinta() {
  pintaDias();
  const delDia = reservas.filter((r) => r.dia === dia);
  const vivas = delDia.filter((r) => r.estado !== 'cancelada');
  const kpi = (k: string, v: number) => { $(`[data-kpi="${k}"]`)!.textContent = String(v); };
  kpi('reservas', vivas.length);
  kpi('piezas', vivas.reduce((s, r) => s + piezasDe(r.lineas), 0));
  kpi('pendientes', vivas.filter((r) => r.estado === 'confirmada').length);
  $('[data-dia-txt]')!.textContent = dia ? `el ${fechaLarga(deIso(dia))}` : '';

  const suma = new Map<string, number>();
  for (const r of vivas) for (const l of r.lineas) suma.set(l.id, (suma.get(l.id) ?? 0) + l.qty);
  const orden = productos.map((p) => p.id).filter((id) => suma.has(id));
  $('[data-apartar]')!.replaceChildren(...(orden.length ? orden.map((id) => {
    const li = el('li', 'flex items-center gap-2 rounded-full bg-mar-2 py-1.5 pl-1.5 pr-4');
    li.append(el('span', 'grid size-8 place-items-center rounded-full bg-taronja font-bold tabular-nums text-mar', String(suma.get(id))), el('span', 'font-semibold', porId.get(id)?.nombre ?? id));
    return li;
  }) : [el('li', 'text-sal/65', 'Nada reservado para este día.')]));

  $('[data-reservas]')!.replaceChildren(...(delDia.length ? delDia.map((r) => {
    const li = el('li', `rounded-2xl bg-white p-5 ring-1 ring-linia ${r.estado === 'cancelada' ? 'opacity-55' : ''}`);
    const top = el('div', 'flex flex-wrap items-center gap-x-3 gap-y-1');
    top.append(el('span', 'rounded-md bg-mar px-2 py-1 font-mono text-sm font-bold tracking-widest text-sal', r.code), el('span', 'text-lg font-semibold', r.nombre), el('span', 'rounded-full bg-sal-2 px-2.5 py-0.5 text-xs font-semibold', CANAL[r.canal]));
    top.append(el('span', `rounded-full px-2.5 py-0.5 text-xs font-bold ${r.estado === 'recogida' ? 'bg-[#dcefe1] text-verd' : r.estado === 'cancelada' ? 'bg-[#fbe9e4] text-[#8a2a12]' : 'bg-[#fdf0dc] text-[#7a4a05]'}`,
      r.estado === 'recogida' ? 'Recogida' : r.estado === 'cancelada' ? 'Cancelada' : 'Por recoger'));
    li.append(top);
    li.append(el('p', 'mt-2.5 text-[0.97rem]', r.lineas.map(textoLinea).join(' · ')));
    if (r.nota) li.append(el('p', 'mt-1 text-sm text-gris', `Nota: ${r.nota}`));
    const acc = el('div', 'mt-4 flex flex-wrap items-center gap-2');
    const tel = r.telefono.replace(/\D/g, '');
    if (tel && !r.ejemplo) {
      const a = el('a', 'btn btn-line min-h-10 px-4 text-sm', 'WhatsApp');
      a.href = `https://wa.me/${tel.length === 9 ? `34${tel}` : tel}?text=${encodeURIComponent(`Hola, ${r.nombre}. Tu reserva ${r.code} está confirmada para el ${fechaLarga(deIso(r.dia))}. ¡Te esperamos de 8 a 14 h!`)}`;
      a.target = '_blank'; a.rel = 'noopener'; acc.append(a);
    } else if (tel) acc.append(el('span', 'text-sm text-gris', r.telefono));
    const boton = (t: string, cls: string, fn: () => void) => { const b = el('button', `btn min-h-10 px-4 text-sm ${cls}`, t); b.type = 'button'; b.addEventListener('click', fn); acc.append(b); };
    const cambia = (e: Reserva['estado']) => { r.estado = e; guardarReservas(reservas); pinta(); };
    if (r.estado === 'confirmada') {
      boton('Marcar recogida', 'btn-mar', () => cambia('recogida'));
      boton('Cancelar…', 'btn-line', () => { if (window.confirm(`¿Cancelar la reserva ${r.code} de ${r.nombre}?`)) cambia('cancelada'); });
    } else if (r.estado === 'recogida') boton('Deshacer', 'btn-line', () => cambia('confirmada'));
    li.append(acc);
    return li;
  }) : [el('li', 'rounded-2xl bg-sal-2 px-5 py-8 text-center text-gris', 'No hay reservas para este día.')]));
}

$('[data-reiniciar]')?.addEventListener('click', () => { reiniciar(); tablon = leerTablon(); reservas = leerReservas(); pintaTablon(); pinta(); });

/* Reserva manual */
const filas = $('[data-filas]')!, tpl = $<HTMLTemplateElement>('[data-fila-tpl]')!;
const otra = () => filas.append(tpl.content.cloneNode(true));
otra();
$('[data-otra]')?.addEventListener('click', otra);
const manual = $<HTMLFormElement>('[data-manual]')!;
manual.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const d = new FormData(manual), nombre = String(d.get('nombre') ?? '').trim();
  if (!nombre) { manual.querySelector<HTMLInputElement>('[name=nombre]')?.focus(); return; }
  const lineas: Linea[] = $$('[data-filas] > div').map((f) => ({ id: $<HTMLSelectElement>('[data-m-prod]', f)?.value ?? '', qty: Math.max(1, Math.min(20, Number($<HTMLInputElement>('[data-m-qty]', f)?.value) || 1)) }));
  reservas.unshift({ code: nuevoCodigo(), nombre, telefono: String(d.get('telefono') ?? '').trim(), dia, nota: '', lineas, estado: 'confirmada', canal: String(d.get('canal') ?? 'whatsapp') as Canal, creado: new Date().toISOString(), ejemplo: false });
  guardarReservas(reservas);
  manual.reset(); filas.replaceChildren(); otra(); manual.closest('details')?.removeAttribute('open'); pinta();
});

pintaTablon();
pinta();
