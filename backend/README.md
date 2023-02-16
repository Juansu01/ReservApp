# Descripción de las rutas en la API

## Ruta Auth

```javascript
authRoute.post("/login", async (req, res) => {});
```

Esta ruta recibe un email y password dentro de el body de la request para retornar un mesaje de éxito y el rol del usuario. Casos de error:

- Usuario dentro de la base de datos pero contraseña incorrecta => 404 'Wrong credentials'
- Usuario no existe dentro de la base de datos => 404 'User not found, check your credentials'

## Ruta Registration

```javascript
registerRoute.post("/register", async (req, res) => {});
```

Toma credenciales del usuario dentro del request body, si la contraseña y correo son correctos, se toma la data dentro del request body y se crea una nueva reserva a nombre del usuario.
Casos de error:

- Usuario ya existe y ya tiene orden => 401 'User already exists'
- El email no es un email válido => 401 'Not a valid email'

```javascript
registerRoute.post("/register/booking/:email", async (req, res) => {});
```

Toma correo desde los params de la request, y crea orden para usuario que ya existe pero no tiene una orden a su nombre.
Casos de error:

- El usuario no existe dentro de la base de datos => 404 'User not found'

## Ruta Order Confirmation

```javascript
confirmationRoute.get("/booking/all", async (req, res) => {});
```

Retorna todas las reservas dentro de la base de datos

```javascript
confirmationRoute.put("/booking/:id", async (req, res) => {});
```

Toma una id de una reserva para actualizarla, esta ruta no está terminada.

```javascript
confirmationRoute.put("/booking/confirmation/:id", async (req, res) => {});
```

Toma una id de los params de la URL, busca la orden dentro de la base de datos, luego asigna `true` al campo 'confirmada' y finalmente envía un correo notificando al usuario que su reserva fue confirmada.

## Ruta Role Management

```javascript
roleManagementRoute.post(
  "/users/:email/:password/roles",
  async (req, res) => {}
);
```

Esta ruta permite añadir el rol 'admin' a un usuario dentro de la base de datos, sólo disponible para usuario con rol 'superuser'. Se toman las credenciales del superuser, se loggea el super usuario y después se usan las credenciales dentro del request body para asignarle el rol 'admin'.
Casos de error:

- Usuario no tiene rol 'superuser' => 403 'You are not allowed to use this route.'
- Credenciales de superusuario incorrectas => 401 'Unauthorized, wrong credentials'

```javascript
roleManagementRoute.get("/users/:email/rol", async (req, res) => {});
```

Toma email de la URL, y encuentra usuario con este email, incluyendo a su rol, si es un usuario normal, es decir que no tiene un rol especial, se va a retornar un mensaje 'You're just a normal user'. En el caso de que sí tenga un rol especial, se retorna información del rol que el usuario tiene.
Casos de error:

- Usuario no fue encontrado => 404 'User was not found.'
