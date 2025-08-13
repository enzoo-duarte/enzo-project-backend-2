------- Proyecto Final Curso Backend Avanzado II: Ecommerce API - Diseño y Arquitectura Profesional -------

=== Tecnologías utilizadas ===

Node.js
Express.js
MongoDB Atlas + Mongoose
Postman (tests de los endpoints)
Nodemailer (recuperación de contraseña)
JWT para autenticación
Dotenv (manejo de variables de entorno)

=== Descripción ===

- Patrón Repository
Se implementó el patrón Repository para separar la lógica de acceso a datos de la lógica de negocio en los servicios.

Se conectó con los DAO y modelos existentes, respetando buenas prácticas de diseño.

- Middleware de Autorización por Rol
Se agregó el middleware checkRole que limita el acceso a endpoints según el rol del usuario:

admin: puede crear, modificar y eliminar productos.
user: puede agregar productos al carrito.

- Ruta /current segura
Se refactorizó la ruta /current para evitar exponer información sensible.
Se utiliza un DTO (UserDTO) que entrega únicamente los datos necesarios del usuario autenticado.

- Sistema de Recuperación de Contraseña
Se integró a Nodemailer para enviar los correos de recuperación.
El enlace de reseteo tiene expiración automática a 1 hora.
Se evita que el usuario reutilice la misma contraseña anterior.

=== Testing ===

En resumen, las pruebas son sobre los siguientes endpoints:

Productos (/api/products)

Carritos (/api/carts)

Usuarios (/api/users)

Sesiones y autenticación (/api/sessions)

Recuperación de contraseña (/api/reset-password)

Compras (/api/tickets)

