# ClientFundManagement

¡Bienvenido! 🎉 Este documento te guiará paso a paso para clonar el proyecto, instalar sus dependencias y ponerlo a correr en tu navegador.

## 📋 Índice
1. [Requisitos previos](#requisitos-previos)
2. [Clonar el repositorio](#clonar-el-repositorio)
3. [Instalar dependencias](#instalar-dependencias)
4. [Ejecutar la aplicación en modo desarrollo](#ejecutar-la-aplicación-en-modo-desarrollo)
5. [Construir para producción](#construir-para-producción)
6. [Solución de problemas comunes](#solución-de-problemas-comunes)

---

## Requisitos previos

| Herramienta | Versión mínima recomendada | Comentario |
|------------|----------------------------|------------|
| **Node.js** | `>= 18.x` | Descárgalo en https://nodejs.org/ |
| **npm** (incluido con Node) | `>= 9.x` | Alternativamente puedes usar **yarn** (`>= 1.22`). |
| **Angular CLI** | `>= 16.x` | `npm install -g @angular/cli` |
| **Git** | Cualquier versión reciente | Necesario para clonar el repositorio. |

> **Tip:** Verifica versiones con `node -v`, `npm -v` y `ng version`.

---

## Clonar el repositorio

```bash
# Ubícate en la carpeta donde quieras el proyecto
cd /ruta/a/tu/carpeta

# Clona el repositorio
git clone https://github.com/edwinfigueroa-dev/client-fund-management.git

# Entra al directorio del proyecto
cd client-fund-management
```

---

## Instalar dependencias

```bash
# Usa npm (o yarn) para instalar paquetes
npm install
# o, si prefieres yarn:
# yarn install
```

> Este comando crea la carpeta `node_modules` y descarga todas las dependencias listadas en `package.json`.

---

## Ejecutar la aplicación en modo desarrollo

```bash
# Levanta el servidor de desarrollo
ng serve
# O con un puerto específico:
# ng serve --port 4201
```

- Abre tu navegador y navega a **http://localhost:4200** (o el puerto que especificaste).
- Cada cambio que guardes en los archivos fuente hará que la aplicación se recargue automáticamente (Hot‑Reload).

---


## Ejecutar los tests

```bash
# Ejecuta los tests unitarios con Karma/Jasmine
ng test
```

> `ng test` abre una ventana del navegador y muestra los resultados en tiempo real.
