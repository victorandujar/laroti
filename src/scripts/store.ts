/**
 * Datos de la DEMO: se guardan solo en este navegador (localStorage).
 * En la versión real vivirían en una base de datos y el tablón lo cambiaría el obrador desde su panel.
 */
import { porId, productos } from '../data/productos';
import { diasRecogida, iso } from './horario';

export type Disp = 'hay' | 'pocos' | 'agotado' | 'no';
export type Tablon = Record<string, Disp>;
export interface Linea { id: string; qty: number }
export type EstadoReserva = 'confirmada' | 'recogida' | 'cancelada';
export type Canal = 'web' | 'whatsapp' | 'instagram' | 'tienda';
export interface Reserva { code: string; nombre: string; telefono: string; dia: string; nota: string; lineas: Linea[]; estado: EstadoReserva; canal: Canal; creado: string; ejemplo: boolean }

const K_TABLON = 'lar-demo-tablon', K_RESERVAS = 'lar-demo-reservas';
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function tablonInicial(): Tablon {
  const pocos = new Set(['kamut', 'cruasan', 'cinnamon', 'focaccia']);
  const agotado = new Set(['xoco', 'sarraceno']);
  const no = new Set(['senatore', 'espelta', 'pizza', 'bagel', 'almendra', 'barrita', 'farinata']);
  return Object.fromEntries(productos.map((p) => [p.id, no.has(p.id) ? 'no' : agotado.has(p.id) ? 'agotado' : pocos.has(p.id) ? 'pocos' : 'hay'])) as Tablon;
}
const lee = <T>(k: string): T | null => { try { const r = localStorage.getItem(k); return r ? (JSON.parse(r) as T) : null; } catch { return null; } };
const escribe = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } };

export function leerTablon(): Tablon { return { ...tablonInicial(), ...(lee<Tablon>(K_TABLON) ?? {}) }; }
export function guardarTablon(t: Tablon) { escribe(K_TABLON, t); }

export const piezasDe = (l: Linea[]) => l.reduce((s, x) => s + x.qty, 0);
export const textoLinea = (l: Linea) => `${l.qty} × ${porId.get(l.id)?.nombre ?? l.id}`;
export function nuevoCodigo(): string { let c = ''; for (let i = 0; i < 4; i++) c += ALFABETO[Math.floor(Math.random() * ALFABETO.length)] ?? 'X'; return c; }

function ejemplos(): Reserva[] {
  const d = diasRecogida(3).map(iso);
  const r = (code: string, nombre: string, tel: string, dia: number, canal: Canal, lineas: Linea[], estado: EstadoReserva = 'confirmada', nota = ''): Reserva =>
    ({ code, nombre, telefono: tel, dia: d[dia] ?? d[0] ?? '', nota, lineas, estado, canal, creado: new Date().toISOString(), ejemplo: true });
  return [
    r('K7QM', 'Marga (ejemplo)', '600 000 001', 0, 'web', [{ id: 'xeixa', qty: 1 }, { id: 'cruasan', qty: 4 }]),
    r('P3RT', 'Tomeu (ejemplo)', '600 000 002', 0, 'whatsapp', [{ id: 'clasico', qty: 2 }], 'confirmada', 'Pasa sobre las 9'),
    r('W8HN', 'Anna (ejemplo)', '600 000 003', 0, 'web', [{ id: 'sarraceno', qty: 1 }, { id: 'pages', qty: 1 }]),
    r('B5VX', 'Joan (ejemplo)', '600 000 004', 1, 'instagram', [{ id: 'kamut', qty: 1 }, { id: 'focaccia', qty: 1 }]),
    r('T2JD', 'Sophie (ejemplo)', '600 000 005', 1, 'web', [{ id: 'olivas', qty: 1 }, { id: 'cinnamon', qty: 2 }]),
    r('M9CE', 'Xisca (ejemplo)', '600 000 006', 2, 'tienda', [{ id: 'maiz', qty: 1 }, { id: 'briox', qty: 1 }]),
  ];
}
export function leerReservas(): Reserva[] { const r = lee<Reserva[]>(K_RESERVAS); if (r) return r; const e = ejemplos(); escribe(K_RESERVAS, e); return e; }
export function guardarReservas(r: Reserva[]) { escribe(K_RESERVAS, r); }
export function anadirReserva(r: Reserva) { const t = leerReservas(); t.unshift(r); guardarReservas(t); }
export function reiniciar() { try { localStorage.removeItem(K_TABLON); localStorage.removeItem(K_RESERVAS); } catch { /* nada */ } }
