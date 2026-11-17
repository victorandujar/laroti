/** Datos publicados por Larotî en laroti.es (noviembre de 2026). */
export const empresa = {
  name: 'Larotî',
  street: 'C/ Convent, 15',
  postalCode: '07630',
  city: 'Campos',
  region: 'Mallorca',
  phone: { display: '684 41 36 41', e164: '+34684413641', wa: '34684413641' },
  email: 'hola@laroti.es',
  instagram: { handle: '@laroti.ok', url: 'https://www.instagram.com/laroti.ok/' },
  maps: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Larotî Micropanadería, Carrer Convent 15, 07630 Campos, Mallorca'),
} as const;

export const telUrl = `tel:${empresa.phone.e164}`;
export const waUrl = (text = '') => `https://wa.me/${empresa.phone.wa}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const mailUrl = `mailto:${empresa.email}`;
