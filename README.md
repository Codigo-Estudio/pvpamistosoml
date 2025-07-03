# Mi Página Web

Este proyecto es una página web sencilla y moderna que utiliza HTML, CSS y JavaScript. La estructura está organizada para separar los estilos y scripts generales de los específicos de la página principal, facilitando el mantenimiento y la escalabilidad.

## Estructura de Archivos

```
├── index.html           # Página principal
├── css/
│   ├── general.css      # Estilos compartidos (header, menú, footer, modo oscuro, etc.)
│   └── index.css        # Estilos exclusivos de la página principal
├── js/
│   ├── general.js       # Scripts compartidos (menú, modo oscuro, footer, etc.)
│   └── index.js         # Scripts exclusivos de la página principal
├── img/
│   └── *.png            # Imágenes utilizadas en la web
└── README.md            # Documentación del proyecto
```

## Descripción de Archivos

- **index.html**: Página principal de la web. Contiene la estructura básica y enlaza los archivos de estilos y scripts necesarios para la funcionalidad principal.
- **css/general.css**: Estilos globales y compartidos (header, menú, footer, modo claro/oscuro, etc.).
- **css/index.css**: Estilos exclusivos para la página principal.
- **js/general.js**: Scripts globales y compartidos (menú lateral, modo oscuro, footer motivacional, etc.).
- **js/index.js**: Scripts exclusivos para la página principal (validaciones, generación de resultados, almacenamiento local, etc.).
- **img/**: Carpeta con todas las imágenes utilizadas en la web.
