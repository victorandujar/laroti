/**
 * La historia de Larotî, según lo publicado sobre ellos:
 * - Entrevista de El Amasadero (8/5/2025): el proyecto nace en 2015 en Dubái; antes de la tienda, Larotî
 *   ya tenía nombre y logo; obrador y tienda abren en junio de 2022; fomentan la reserva porque la producción es pequeña.
 * - Eat Drink Sleep Mallorca (15/4/2024): Juan Ocampo fue chef de Tess de Mar, en Campos; cola los días de mercado;
 *   venden chocolate Maüa (Palma); idea de picnic en Es Trenc.
 * - TravelToZero: lo llevan Ana y Juan; harinas ecológicas de Roca Fariners.
 * - laroti.es: granos antiguos de la Finca Bellver Ric (Manacor), cerámica de Isabella Avalos.
 * No se sabe qué significa el nombre: no se inventa.
 */
export const hitos = [
  { any: '2015', es: { t: 'Una idea, lejos de casa', d: 'En Dubái, Juan y Ana empiezan a imaginar una panadería propia: pan de masa madre y una vida que les dejara tiempo para la familia.' },
    en: { t: 'An idea, far from home', d: 'In Dubai, Juan and Ana begin to imagine a bakery of their own: sourdough bread and a life that left time for family.' } },
  { any: 'Antes', es: { t: 'Un nombre antes que una tienda', d: 'Larotî tuvo nombre y logo mucho antes de tener local. Mientras, Juan cocinaba: más de quince años en hostelería, los últimos como chef de Tess de Mar, en Campos.' },
    en: { t: 'A name before a shop', d: 'Larotî had a name and a logo long before it had premises. Meanwhile Juan cooked: over fifteen years in hospitality, the last ones as chef at Tess de Mar, in Campos.' } },
  { any: '2022', es: { t: 'Calle Convent, 15', d: 'En junio abren obrador y tienda a pocos pasos de aquella cocina, con dos hornos de piso y la puerta abierta para ver cómo se forma el pan.' },
    en: { t: 'Carrer Convent, 15', d: 'In June they open the workshop and shop a few steps from that kitchen, with two deck ovens and the door open to watch the bread being shaped.' } },
  { any: 'Hoy', es: { t: 'Cola los días de mercado', d: 'Jueves y sábado, con el mercado de Campos, hay cola en la puerta. Producen poco, a propósito: por eso piden que reserves.' },
    en: { t: 'A queue on market days', d: 'On Thursdays and Saturdays, with the Campos market, there is a queue at the door. They bake little, on purpose: that is why they ask you to reserve.' } },
] as const;

/** Lugares de su Mallorca (lat, lon). */
export const lugares = [
  { id: 'campos', lat: 39.431, lon: 3.019, es: { t: 'Campos', d: 'El obrador, en la calle Convent.' }, en: { t: 'Campos', d: 'The workshop, on Carrer Convent.' }, casa: true },
  { id: 'manacor', lat: 39.57, lon: 3.209, es: { t: 'Manacor', d: 'Xeixa, Kamut y Senatore Cappelli de la Finca Bellver Ric.' }, en: { t: 'Manacor', d: 'Xeixa, Kamut and Senatore Cappelli from Finca Bellver Ric.' } },
  { id: 'palma', lat: 39.57, lon: 2.65, es: { t: 'Palma', d: 'El chocolate Maüa, del grano a la tableta.' }, en: { t: 'Palma', d: 'Maüa chocolate, bean to bar.' } },
  { id: 'trenc', lat: 39.345, lon: 2.975, es: { t: 'Es Trenc', d: 'A un paso: pan, queso y picnic junto al mar.' }, en: { t: 'Es Trenc', d: 'Close by: bread, cheese and a picnic by the sea.' } },
] as const;

/** Costa de Mallorca simplificada (lat, lon), en orden. */
export const costa: [number, number][] = [
  [39.92, 3.06], [39.95, 3.15], [39.962, 3.21], [39.93, 3.17], [39.9, 3.09], [39.88, 3.13], [39.892, 3.195], [39.86, 3.15], [39.84, 3.13],
  [39.78, 3.16], [39.75, 3.21], [39.745, 3.27], [39.765, 3.33], [39.73, 3.4], [39.715, 3.475], [39.68, 3.46], [39.65, 3.44], [39.6, 3.39],
  [39.54, 3.34], [39.49, 3.3], [39.42, 3.27], [39.37, 3.24], [39.355, 3.2], [39.32, 3.15], [39.29, 3.1], [39.265, 3.05], [39.3, 3.0],
  [39.325, 2.99], [39.345, 2.965], [39.36, 2.93], [39.365, 2.85], [39.37, 2.78], [39.43, 2.76], [39.5, 2.745], [39.545, 2.7], [39.565, 2.65],
  [39.55, 2.6], [39.53, 2.57], [39.5, 2.535], [39.465, 2.52], [39.5, 2.47], [39.52, 2.42], [39.545, 2.38], [39.58, 2.35], [39.63, 2.42],
  [39.67, 2.48], [39.7, 2.53], [39.73, 2.6], [39.755, 2.64], [39.795, 2.69], [39.83, 2.75], [39.855, 2.8], [39.88, 2.88], [39.905, 2.96],
];
