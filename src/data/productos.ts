/**
 * Catálogo de laroti.es (noviembre de 2026). Los pesos e ingredientes son los que publican.
 * Su web no publica precios: aquí tampoco se inventan.
 */
export type Categoria = 'panes' | 'laminados' | 'dulces' | 'salado';
export const categorias: { id: Categoria; es: string; en: string }[] = [
  { id: 'panes', es: 'Panes', en: 'Breads' },
  { id: 'laminados', es: 'Laminados', en: 'Pastries' },
  { id: 'dulces', es: 'Dulces', en: 'Sweet' },
  { id: 'salado', es: 'Salado', en: 'Savoury' },
];

export interface Producto {
  id: string; nombre: string; cat: Categoria;
  /** Formato y peso. */
  formato?: { es: string; en: string };
  es?: string; en?: string;
  /** «Grano antiguo» en su catálogo. */
  antiguo?: true;
  /** Naturalmente sin gluten, no apto para celíacos. */
  sinGluten?: true;
}

export const productos: Producto[] = [
  { id: 'clasico', nombre: 'Clásico', cat: 'panes', formato: { es: 'Hogaza de 850 g', en: '850 g loaf' },
    es: 'Trigo blanco eco, espelta integral eco, masa madre, agua y sal.', en: 'Organic white wheat, organic wholemeal spelt, sourdough, water and salt.' },
  { id: 'xeixa', nombre: 'Xeixa', cat: 'panes', antiguo: true, formato: { es: 'Hogaza de 950 g', en: '950 g loaf' },
    es: 'Xeixa integral eco de la Finca Bellver Ric, en Manacor, trigo integral eco, masa madre, agua y sal.', en: 'Organic wholemeal xeixa from Finca Bellver Ric in Manacor, organic wholemeal wheat, sourdough, water and salt.' },
  { id: 'kamut', nombre: 'Kamut – Khorasan', cat: 'panes', antiguo: true, formato: { es: 'Hogaza de 950 g', en: '950 g loaf' },
    es: '70 % de Kamut eco molido a piedra de la Finca Bellver Ric, en Manacor, trigo blanco eco, masa madre, agua y sal.', en: '70% stone-ground organic Kamut from Finca Bellver Ric in Manacor, organic white wheat, sourdough, water and salt.' },
  { id: 'senatore', nombre: 'Senatore Cappelli', cat: 'panes', antiguo: true, formato: { es: 'Molde de 950 g', en: '950 g tin loaf' },
    es: 'Senatore Cappelli integral eco de la Finca Bellver Ric, en Manacor, trigo integral eco, masa madre, agua y sal.', en: 'Organic wholemeal Senatore Cappelli from Finca Bellver Ric in Manacor, organic wholemeal wheat, sourdough, water and salt.' },
  { id: 'espelta', nombre: 'Espelta – Petit Épeautre', cat: 'panes', antiguo: true, formato: { es: 'Molde de 950 g', en: '950 g tin loaf' },
    es: 'Espelta pequeña integral eco, masa madre, agua y sal. Es el padre de los granos antiguos.', en: 'Organic wholemeal einkorn, sourdough, water and salt. The father of ancient grains.' },
  { id: 'olivas', nombre: 'Olivas & hierbas', cat: 'panes', formato: { es: 'Hogaza de 850 g', en: '850 g loaf' },
    es: 'Trigo blanco eco, olivas negras y verdes, hierbas frescas y pieles de cítricos, masa madre, agua y sal.', en: 'Organic white wheat, black and green olives, fresh herbs and citrus peel, sourdough, water and salt.' },
  { id: 'maiz', nombre: 'Maíz', cat: 'panes', formato: { es: 'Hogaza de 900 g', en: '900 g loaf' },
    es: 'Trigo blanco eco, maíz amarillo eco, semillas de girasol, masa madre, agua y sal.', en: 'Organic white wheat, organic yellow corn, sunflower seeds, sourdough, water and salt.' },
  { id: 'avena', nombre: 'Avena', cat: 'panes', formato: { es: 'Molde de 950 g', en: '950 g tin loaf' },
    es: 'Avena eco escaldada, trigo integral eco, trigo blanco eco, miel, canela, masa madre, agua y sal.', en: 'Scalded organic oats, organic wholemeal and white wheat, honey, cinnamon, sourdough, water and salt.' },
  { id: 'briox', nombre: 'Briox de molde', cat: 'panes', formato: { es: 'Molde de 550 g', en: '550 g tin loaf' },
    es: 'Harina de trigo blanco eco, masa madre, levadura, huevo, mantequilla, azúcar integral de caña, agua y sal.', en: 'Organic white wheat flour, sourdough, yeast, egg, butter, unrefined cane sugar, water and salt.' },
  { id: 'focaccia', nombre: 'Focaccia', cat: 'panes', formato: { es: 'Pieza de 550 g', en: '550 g piece' },
    es: 'Trigo de fuerza blanco eco, masa madre, aceite de oliva virgen extra, escamas de sal marina, hierbas y tomates cherry.', en: 'Organic strong white wheat, sourdough, extra virgin olive oil, sea salt flakes, herbs and cherry tomatoes.' },
  { id: 'sarraceno', nombre: 'Sarraceno', cat: 'panes', sinGluten: true, formato: { es: 'Molde de 800 g', en: '800 g tin loaf' },
    es: 'Trigo sarraceno activado eco, agua, sal, psyllium y seis semillas eco: girasol, mijo, lino, sésamo, amapola y chía.', en: 'Organic activated buckwheat, water, salt, psyllium and six organic seeds: sunflower, millet, flax, sesame, poppy and chia.' },
  { id: 'pages', nombre: 'Pagès sin gluten', cat: 'panes', sinGluten: true, formato: { es: 'Molde de 950 g', en: '950 g tin loaf' },
    es: 'Harina de arroz eco, fécula de yuca eco, harina de trigo sarraceno eco, psyllium, masa madre de arroz, sal y agua.', en: 'Organic rice flour, organic cassava starch, organic buckwheat flour, psyllium, rice sourdough, salt and water.' },
  { id: 'cruasan', nombre: 'Cruasán', cat: 'laminados' },
  { id: 'xoco', nombre: 'Pan de xoco', cat: 'laminados' },
  { id: 'danesa', nombre: 'Danesa', cat: 'laminados' },
  { id: 'cinnamon', nombre: 'Cinnamon roll', cat: 'dulces' },
  { id: 'banana', nombre: 'Banana bread', cat: 'dulces' },
  { id: 'limon', nombre: 'Cake de limón', cat: 'dulces' },
  { id: 'algarroba', nombre: 'Húmedo de algarroba', cat: 'dulces', sinGluten: true },
  { id: 'almendra', nombre: 'Bizcoxo de almendra', cat: 'dulces', sinGluten: true },
  { id: 'barrita', nombre: 'Barrita energética', cat: 'dulces', es: 'Sin azúcar.', en: 'No added sugar.' },
  { id: 'coca', nombre: 'Coca de espelta', cat: 'salado' },
  { id: 'pizza', nombre: 'Pizza', cat: 'salado' },
  { id: 'farinata', nombre: 'Farinata', cat: 'salado' },
  { id: 'mahones', nombre: 'Roll mahonés', cat: 'salado' },
  { id: 'mediterraneo', nombre: 'Roll mediterráneo', cat: 'salado' },
  { id: 'bagel', nombre: 'Bagel de pastrami', cat: 'salado' },
];
export const porId = new Map(productos.map((p) => [p.id, p]));
