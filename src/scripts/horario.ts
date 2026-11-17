/** Horario de la tienda (hora de Madrid): de martes a sábado, de 8:00 a 14:00. */
const ABRE = 8 * 60, CIERRA = 14 * 60;
const DIAS: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };
export const abreElDia = (dow: number) => dow >= 2 && dow <= 6;

function madrid(now: Date) {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Madrid', weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now);
  const v = (t: string) => p.find((x) => x.type === t)?.value ?? '0';
  return { dow: DIAS[v('weekday')] ?? 0, min: Number(v('hour')) * 60 + Number(v('minute')), y: Number(v('year')), m: Number(v('month')), d: Number(v('day')) };
}

export interface Tienda { abierta: boolean; diaAbre: boolean; minutos: number; proxima: Date }
export function tienda(now = new Date()): Tienda {
  const t = madrid(now);
  const diaAbre = abreElDia(t.dow);
  const abierta = diaAbre && t.min >= ABRE && t.min < CIERRA;
  // días hasta la próxima apertura
  let dias = 0;
  if (!(diaAbre && t.min < ABRE)) { dias = 1; while (!abreElDia((t.dow + dias) % 7)) dias++; }
  return { abierta, diaAbre, minutos: abierta ? CIERRA - t.min : 0, proxima: new Date(Date.UTC(t.y, t.m - 1, t.d + (abierta ? 0 : dias), 12)) };
}

/** Próximos días de apertura para recoger una reserva (a partir de mañana). */
export function diasRecogida(n = 6, now = new Date()): Date[] {
  const t = madrid(now), out: Date[] = [];
  for (let i = 1; out.length < n && i < 21; i++) {
    const d = new Date(Date.UTC(t.y, t.m - 1, t.d + i, 12));
    if (abreElDia(d.getUTCDay())) out.push(d);
  }
  return out;
}
export const iso = (d: Date) => d.toISOString().slice(0, 10);
export const deIso = (s: string) => new Date(`${s}T12:00:00Z`);
const loc = (lang: string) => (lang === 'en' ? 'en-GB' : 'es-ES');
export const fechaLarga = (d: Date, lang = 'es') => new Intl.DateTimeFormat(loc(lang), { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' }).format(d);
export const diaCorto = (d: Date, lang = 'es') => new Intl.DateTimeFormat(loc(lang), { timeZone: 'UTC', weekday: 'short' }).format(d).replace('.', '');
export const numDia = (d: Date) => d.getUTCDate();
export const mesCorto = (d: Date, lang = 'es') => new Intl.DateTimeFormat(loc(lang), { timeZone: 'UTC', month: 'short' }).format(d).replace('.', '');
