# 💊 Pastillero Virtual

Una aplicación web moderna para gestionar tu medicación diaria de manera fácil y eficiente.

## ✨ Características

- **📅 Calendario interactivo**: Visualiza y gestiona tus medicamentos por fecha
- **📋 Resumen completo**: Vista general de todos tus medicamentos con opciones de gestión
- **➕ Agregar medicamentos**: Formulario intuitivo para añadir nuevos tratamientos
- **✏️ Editar medicamentos**: Modifica cualquier aspecto de tus medicamentos
- **📊 Historial detallado**: Seguimiento completo de tu cumplimiento
- **⏰ Fechas de finalización**: Gestión automática de tratamientos temporales
- **📱 Diseño responsive**: Funciona perfectamente en móviles y desktop
- **💾 Persistencia local**: Tus datos se guardan automáticamente en el navegador

## 🛠️ Tecnologías

- **React 18** con TypeScript
- **Vite** para desarrollo rápido
- **React Router** para navegación
- **LocalStorage** para persistencia de datos
- **CSS3** con diseño moderno y responsive

## 🚀 Instalación y Uso

### Requisitos
- Node.js 16+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/pastillero-virtual.git

# Entrar al directorio
cd pastillero-virtual

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Scripts disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de la build
npm run lint         # Verificar código
```

## 📱 Funcionalidades Principales

### Calendario
- Selecciona cualquier fecha para ver tus medicamentos
- Marca medicamentos como tomados
- Vista organizada por momentos del día (desayuno, comida, cena)

### Resumen
- Estadísticas de cumplimiento
- Gestión de medicamentos (editar, pausar, eliminar)
- Información detallada de cada medicamento

### Agregar/Editar Medicamentos
- Nombre y dosis del medicamento
- Selección de momentos del día
- Fecha de finalización opcional
- Validación completa de datos

### Historial
- Seguimiento de cumplimiento
- Estadísticas de medicamentos tomados
- Filtros por fecha

## 🎨 Diseño

- **Interfaz moderna** con gradientes y animaciones
- **Iconos intuitivos** para mejor UX
- **Colores semánticos** (verde para éxito, rojo para eliminar, etc.)
- **Diseño responsive** optimizado para móviles

## 📊 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   └── Header.tsx      # Navegación principal
├── pages/              # Páginas de la aplicación
│   ├── Home.tsx        # Calendario principal
│   ├── Resumen.tsx     # Gestión de medicamentos
│   ├── AgregarMedicamento.tsx
│   ├── EditarMedicamento.tsx
│   └── Historial.tsx
├── hooks/              # Hooks personalizados
│   └── useLocalStorage.ts
├── types/              # Definiciones de TypeScript
│   └── index.ts
├── utils/              # Utilidades y helpers
│   └── helpers.ts
└── App.tsx             # Componente principal
```

## 🔧 Configuración

### Variables de Entorno
No se requieren variables de entorno para el funcionamiento básico.

### LocalStorage
La aplicación utiliza las siguientes claves en localStorage:
- `medicamentos`: Lista de medicamentos registrados
- `registros`: Historial de medicamentos tomados

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente que es un proyecto Vite
3. El despliegue será automático en cada push

### Otros proveedores
La aplicación se puede desplegar en cualquier proveedor que soporte aplicaciones React estáticas:
- Netlify
- GitHub Pages
- Firebase Hosting

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- React y la comunidad de desarrolladores
- Vite por el excelente tooling
- Emojis de [EmojiOne](https://emojione.com/)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
