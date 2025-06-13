# 🛍️ DaviTienda - Ecommerce Frontend

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.9.x-purple.svg)](https://redux-toolkit.js.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-blueviolet.svg)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Plataforma de ecommerce moderna construida con React, Redux Toolkit y Bootstrap. Diseñada para ofrecer una experiencia de compra fluida con productos electrónicos y servicios financieros.**

## 📋 Tabla de Contenidos

- [🚀 Demo](#-demo)
- [✨ Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [📦 Instalación](#-instalación)
- [⚙️ Configuración](#️-configuración)
- [🏗️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [🎯 Funcionalidades](#-funcionalidades)
- [📱 Capturas de Pantalla](#-capturas-de-pantalla)
- [🔧 Scripts Disponibles](#-scripts-disponibles)
- [🚀 Deployment](#-deployment)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

## 🚀 Demo

🔗 **[Ver Demo en Vivo](https://your-demo-url.com)** (Próximamente)

### Credenciales de Prueba
```
Email: demo@davitineda.com
Password: demo123
```

## ✨ Características

### 🛍️ **Experiencia de Compra**
- ✅ Catálogo de productos con filtros avanzados
- ✅ Búsqueda en tiempo real con debouncing
- ✅ Carrito de compras persistente
- ✅ Proceso de checkout completo
- ✅ Historial de pedidos del usuario
- ✅ Sistema de reseñas y calificaciones

### 🔐 **Autenticación y Seguridad**
- ✅ Registro e inicio de sesión
- ✅ Autenticación JWT
- ✅ Rutas protegidas
- ✅ Gestión de perfiles de usuario
- ✅ Logout automático por expiración

### 🎨 **UI/UX Moderno**
- ✅ Diseño responsive (mobile-first)
- ✅ Interfaz intuitiva con Bootstrap 5
- ✅ Animaciones y transiciones suaves
- ✅ Sistema de notificaciones (toast)
- ✅ Estados de carga y error amigables

### ⚡ **Performance y Optimización**
- ✅ Lazy loading de imágenes
- ✅ Paginación eficiente
- ✅ Estado global optimizado con Redux
- ✅ Bundle splitting automático
- ✅ PWA ready (Service Workers)

## 🛠️ Tecnologías

### **Frontend Core**
- **React 18.x** - Librería de UI
- **Redux Toolkit** - Gestión de estado global
- **React Router v6** - Navegación y routing
- **Axios** - Cliente HTTP para API calls

### **UI Framework**
- **Bootstrap 5** - Framework CSS
- **React Bootstrap** - Componentes React de Bootstrap
- **React Icons** - Librería de iconos
- **React Toastify** - Sistema de notificaciones



### **Desarrollo y Build**
- **Create React App** - Configuración y build tools
- **ESLint** - Linting de código
- **Prettier** - Formateo de código (recomendado)

## 📦 Instalación

### Prerrequisitos
- **Node.js** >= 16.x
- **npm** >= 8.x o **yarn** >= 1.22.x
- **Git**

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/ecomerce_front.git
   cd ecomerce_front
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   # o
   yarn start
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_MEDIA_URL=http://localhost:8000/media

# App Configuration
REACT_APP_APP_NAME=DaviTienda
REACT_APP_VERSION=1.0.0

# External Services (opcional)
REACT_APP_GOOGLE_ANALYTICS_ID=GA_TRACKING_ID
REACT_APP_SENTRY_DSN=SENTRY_DSN
```

### Configuración del Backend

Este frontend requiere un backend compatible. Variables importantes:

- `REACT_APP_API_URL`: URL base de tu API backend
- `REACT_APP_MEDIA_URL`: URL para archivos multimedia (imágenes)

## 🏗️ Estructura del Proyecto

```
ecomerce_front/
├── public/                 # Archivos públicos estáticos
│   ├── index.html         # HTML principal
│   ├── favicon.ico        # Favicon
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── common/       # Componentes comunes (Layout, Header, etc.)
│   │   ├── products/     # Componentes relacionados con productos
│   │   └── cart/         # Componentes del carrito
│   ├── pages/            # Páginas/Vistas principales
│   │   ├── HomePage.js
│   │   ├── ProductsPage.js
│   │   ├── CheckoutPage.js
│   │   └── ...
│   ├── services/         # Servicios para comunicación con API
│   │   ├── api.js        # Configuración base de Axios
│   │   ├── authService.js
│   │   ├── productsService.js
│   │   └── ordersService.js
│   ├── store/            # Configuración de Redux
│   │   ├── index.js      # Store principal
│   │   └── slices/       # Redux slices
│   │       ├── authSlice.js
│   │       ├── productsSlice.js
│   │       ├── cartSlice.js
│   │       └── ordersSlice.js
│   ├── styles/           # Estilos personalizados
│   │   └── custom.css
│   ├── utils/            # Funciones utilitarias
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── App.js            # Componente principal
│   └── index.js          # Punto de entrada
├── package.json          # Dependencias y scripts
└── README.md            # Documentación
```

## 🎯 Funcionalidades

### 🏠 **Página de Inicio**
- Hero section con call-to-action
- Productos destacados
- Características del servicio
- Navegación rápida a categorías

### 🛍️ **Catálogo de Productos**
- Grid responsive de productos
- Filtros por categoría, precio y búsqueda
- Ordenamiento (precio, fecha, popularidad)
- Paginación eficiente
- URL state management (filtros en URL)

### 📝 **Detalle de Producto**
- Información completa del producto
- Galería de imágenes
- Sistema de calificaciones
- Reseñas de usuarios (lectura y escritura)
- Agregar al carrito con validación de stock

### 🛒 **Carrito de Compras**
- Sidebar deslizable
- Gestión de cantidades
- Persistencia en localStorage
- Cálculo automático de totales
- Acceso rápido desde cualquier página

### 💳 **Proceso de Checkout**
- Formulario de información de envío
- Selección de método de pago
- Resumen detallado del pedido
- Validación completa de formularios
- Creación de orden en backend

### 📦 **Gestión de Pedidos**
- Historial completo de pedidos
- Estados de pedido en tiempo real
- Detalles de cada pedido
- Opción de cancelación (según estado)
- Resumen estadístico

### 🔐 **Autenticación**
- Registro de nuevos usuarios
- Inicio de sesión seguro
- Gestión de perfil de usuario
- Protección de rutas privadas
- Manejo de sesiones JWT

## 📱 Capturas de Pantalla

### 🏠 Página de Inicio
![Homepage](docs/screenshots/homepage.png)

### 🛍️ Catálogo de Productos
![Products](docs/screenshots/products.png)

### 🛒 Carrito de Compras
![Cart](docs/screenshots/cart.png)

### 💳 Proceso de Checkout
![Checkout](docs/screenshots/checkout.png)

*Nota: Agrega las capturas reales en la carpeta `docs/screenshots/`*

## 🔧 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`
Inicia la aplicación en modo desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### `npm test`
Ejecuta los tests unitarios en modo interactivo.\
Ver más sobre [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`
Construye la aplicación para producción en la carpeta `build`.\
Optimiza el build para mejor performance.

### `npm run eject`
**Nota: Esta es una operación irreversible.**\
Expone las configuraciones de webpack y babel.

### Scripts Adicionales Recomendados

```json
{
  "scripts": {
    "lint": "eslint src --ext .js,.jsx --fix",
    "format": "prettier --write src/**/*.{js,jsx,css,md}",
    "analyze": "npm run build && npx bundle-analyzer build/static/js/*.js"
  }
}
```

## 🚀 Deployment

### Netlify (Recomendado)
1. Conectar repositorio a Netlify
2. Configurar variables de entorno
3. Deploy automático en cada push

### Vercel
1. `npm i -g vercel`
2. `vercel --prod`
3. Configurar variables de entorno en dashboard

### Hosting Tradicional
1. `npm run build`
2. Subir carpeta `build` al servidor
3. Configurar servidor web (Apache/Nginx)

### Variables de Entorno en Producción
```env
REACT_APP_API_URL=https://api.tu-dominio.com/api
REACT_APP_MEDIA_URL=https://api.tu-dominio.com/media
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor sigue estos pasos:

### Proceso de Contribución
1. **Fork** el repositorio
2. **Crea** una rama feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Estándares de Código
- Usa **ESLint** y **Prettier** para formato consistente
- Escribe **tests** para nuevas funcionalidades
- Documenta cambios importantes en el **changelog**
- Sigue la convención de **commits convencionales**

### Reportar Bugs
- Usa las **GitHub Issues** con la plantilla de bug
- Incluye pasos para **reproducir** el error
- Agrega **screenshots** si es visual
- Especifica **navegador y versión**

### Solicitar Features
- Abre un **GitHub Issue** con la plantilla de feature
- Describe el **caso de uso** y beneficios
- Proporciona **mockups** si es posible

## 📚 Recursos Adicionales

### Documentación
- [React Documentation](https://reactjs.org/docs)
- [Redux Toolkit Guide](https://redux-toolkit.js.org/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [React Router Guide](https://reactrouter.com/)

### APIs y Referencias
- [API Backend Documentation](link-to-your-api-docs)
- [Figma Design System](link-to-figma)
- [Brand Guidelines](link-to-brand-guide)

## 🐛 Troubleshooting

### Problemas Comunes

**Error: Cannot find module**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Puerto 3000 ocupado**
```bash
# Cambiar puerto
PORT=3001 npm start
```

**Errores de CORS**
```bash
# Verificar REACT_APP_API_URL en .env.local
```

### Logs y Debugging
- Usar **Redux DevTools** para debugging de estado
- **React Developer Tools** para componentes
- **Network tab** para debugging de API calls

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo

### Desarrolladores
- **Tu Nombre** - *Desarrollo Frontend* - [@tu-github](https://github.com/tu-usuario)

### Agradecimientos
- **Team Davivienda** por la oportunidad
- **Comunidad React** por las herramientas increíbles
- **Bootstrap Team** por el framework UI

---

## 📞 Contacto

### Soporte Técnico
- 📧 **Email**: soporte@davitineda.com
- 💬 **Slack**: #ecommerce-frontend
- 📱 **WhatsApp**: +57 300 123 4567

### Links del Proyecto
- 🌐 **Repositorio**: [GitHub](https://github.com/tu-usuario/ecomerce_front)
- 🚀 **Demo**: [Live Demo](https://your-demo-url.com)
- 📋 **Backlog**: [Project Board](https://github.com/tu-usuario/ecomerce_front/projects)
- 🐛 **Issues**: [Bug Tracker](https://github.com/tu-usuario/ecomerce_front/issues)

---

**⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella en GitHub!**

---

<div align="center">
  
  **Hecho con ❤️ por el equipo de DaviTienda**
  
  [⬆ Volver arriba](#-davitineda---ecommerce-frontend)
  
</div>
