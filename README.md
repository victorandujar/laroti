# Larotî — propuesta de web

Demo de Ammavaroo para Larotî, micropanadería y obrador abierto en Campos (Mallorca). **No es la web oficial.**

## Por qué

Ya tienen web (laroti.es, WordPress con plantilla Allston): bonita, pero es solo un catálogo. No tiene precios, ni pedidos, ni dice qué hay hoy. Además, dos enlaces del menú dan error 404 («Nuestra historia» y «Contacto»). La propuesta se centra en lo que les falta:

- **Hoy en el mostrador:** el obrador marca desde el móvil qué hay, qué se acaba y qué está agotado, y los clientes lo ven al momento. Desde cada pieza se puede reservar para otro día.
- **Reservas para recoger:** día (de martes a sábado), productos y datos; código de recogida y WhatsApp ya escrito. Se paga en tienda.
- **Panel del obrador** (`/gestion`): cambia el mostrador, ve las reservas por día con la lista «para apartar» sumada, marca recogidas y apunta reservas que llegan por WhatsApp, Instagram o en tienda.

## Dos niveles (oferta para microobradores)

- **590 €:** la web y las reservas por WhatsApp.
- **990 €:** el pack con gestión: reservas guardadas en el sistema, el panel con contraseña y el tablón «Hoy» editable.

En la demo todo se guarda solo en el navegador (`localStorage`): no se envía ni se recoge ningún dato real.

## Diseño

- **Criterio:** editorial y sobrio, con fotografía nítida, jerarquía clara y lo útil en la primera pantalla (abierto o cerrado, dirección, cuántos productos hay hoy).
- **Tipografía:** Syne (titulares) y Albert Sans (texto), autoalojadas.
- **Color:** papel cálido y la tinta azul noche de su emblema. Cada sección lleva un tono suave de su logo: salvia en «Hoy» y melocotón en «La carta». El naranja va solo como acento.
- **Marca:** su emblema en la cabecera y una de sus hojas como pequeño icono en las etiquetas de sección.
- **Detalles de uso:** el mostrador se desplaza en horizontal; al reservar desde él sale un aviso discreto; en escritorio, al pasar por la carta aparece la foto del producto junto al cursor.
- Castellano en `/` e inglés en `/en` (mucho cliente extranjero en Mallorca).

## Contenido y fuentes

Todo sale de laroti.es (noviembre de 2026): los 26 productos con su peso e ingredientes cuando los publican, los granos antiguos de la Finca Bellver Ric (Manacor), la cerámica de Isabella Avalos, la dirección, el horario, el teléfono y el email. Las fotos son las de su catálogo. **No publican precios, y la demo no se los inventa.**

## Pendiente

- [ ] Precios, si quieren mostrarlos.
- [ ] Confirmar que el 684 41 36 41 es también su WhatsApp.
- [ ] Titular y NIF para el aviso legal.
- [ ] Qué productos se pueden reservar y con cuánta antelación.

## Stack

Astro (SSG) · TypeScript estricto · Tailwind 4 · JS mínimo. Modo demo con `PUBLIC_IS_DEMO` (por defecto activo: `noindex`, `robots.txt` cerrado y aviso visible).

```bash
npm install
npm run dev
npm run build
```
