# Bloc 1: Javascript
## Práctica 4.1 - DOM
En esta práctica continuaremos la aplcación que empezamos en la práctica anterior (3.1).

En lugar de crear un nuevo repositorio crearemos una nueva rama en el de la práctica anterior (podéis llamarla 4.1-DOM o como queráis) y así mantenemos en la rama 'master' nuestra solución de la práctica 3.1 y en esta nueva rama la de esta práctica.

La práctica consistirá en crear una página HTML para poder interactuar con el almacén creado anteriormente. Para ello os proporciono unos ficheros con parte del trabajo a realizar:
- _index.html_: página de nuestra aplicación que sustituirá al actual
- _index.js_: fichero principal de la aplicación que sustituye al actual
- _datosIni.json_: fichero con datos para mostrar inicialmente (quien haya hecho el ejercicio 3.2 ya lo tiene)

Para dar un mejor aspecto a la página con poco trabajo utilizaremos **_bootstrap_**. De momento simplemente enlazaremos su CDN en el \<HEAD> de nuestra página (sólo el CSS).

Las tareas a realizar son:

### HTML
En el _index.html_ debemos enlazar el CDN de bootstrap y completar:
- el formulario de añadir categoría con los campos necesarios y los botones de 'Añadir' y 'Reset'
- el formulario de eliminar categoría
- debemos poner atributos a los campos para que cumplan las validaciones necesarias (campos obligatorios, enteros, mayores que 0, ...)
- podemos poner atributos 'id' a los elementos que deseemos para facilitarnos el acceso a ellos desde el código JS

Además debéis eliminar el mensaje de ejemplo del DIV _messages_ y los 2 productos de ejemplo del TBODY. Al cargar la página estarán vacíos y serán métodos de la vista los encargados de rellenarlos.

También será un método de la vista el encargado de rellenar las OPTION de categoría con las categorías que hay inicialmente en el modelo.

### Javascript
Para hacer nuestra aplicación seguiremos el patrón MVC. 

#### Modelo
El modelo ya lo tenemos hecho y en la carpeta _model_ meteremos los ficheros de las clases 'Category', 'Product' y 'Store'.

Si hemos hecho el ejercicio 3.2 ya tenemos datos iniciales que mostrar y con los que trabajar.

#### Vista
Esta clase no tiene propiedades, sólo métodos que reciben del controlador unos datos (un producto a añadir o a eliminar) y modifica la página para reflejar esos datos. 

Crearemos también métodos para añadir y eliminar categorías, aunque de momento no harán nada ya que en la página sólo se muestran los productos.

Además debe tener un método para pintar el mensaje pasado por el controlador... y algún método más.

#### Controlador
Esta clase tendrá 2 propiedades:
- **store**: almacenará una instancia de la clase 'Store' donde guardar los datos del modelo
- **view**: será una instancia de la clase 'View'

Tendrá un método para cada una de las 4 acciones que puede realizar el usuario: añadir producto, añadir categoría, eliminar producto y eliminar categoría.

Los de añadir (productos o categorías) recibirán un objeto (_payload_) con los datos recogidos del formulario. Por ejemplo el de añadir productos recibirá:
```javascript
{
  name: ???,
  category: ???,
  units: ???,
  price: ???
}
```

Los de eliminar recibirán directamente la _id_ recogida del formulario.

Recuerda que lo que se lee de un input es siempre texto.

Lo que debe hacer cada método del controlador es:
- validar los datos recibidos (en nuestro caso NO es necesario ya que los valida el modelo)
- si los datos son válidos
  - llamar al método correspondiente de la clase 'Store' para que se almacene el cambio realizado
  - si se realiza la operación correctamente
    - llamar al método de la vista que refleje el cambio en la página
  - si se produce algún error
    - mostrar un mensaje de error en la página
- si no lo son
    - mostrar un mensaje de error en la página

#### index.js
Es el fichero principal y se encarga de:
- instanciar e inicializar un controlador
- poner los escuchadores para los 4 botones de enviar los formularios

Como aún no hemos visto los eventos tenéis el código del escuchador del formulario de añadir producto al que falta por hacer:
- leer los datos del formulario (sólo lee 2)
- llamar al método adecuado del constructor pasándole un objeto con los datos leídos

Deberéis hacer de igual modo las funciones escuchadoras para los otros 3 formularios.

### Tests
Si quieres pasar los tests de las clases 'Category', 'Product' y 'Store' ten en cuenta que ahora deben buscar las clases dentro de `src/model` (o donde las hayas colocado) en lugar de en `src`.

### Recuerda...
- Siempre que llames a una función que pueda generar un error debes capturar dicho error en algún sitio dentro de una sentencia `try...catch`. Ahora los errores deben llegar al controlador que dirá a la vista que los muestre como un nuevo mensaje en la página.
- seguiremos usando _webpack_ para evitar tener tantos ficheros enlazados en el HTML
- como no es un proyecto nuevo **NO** hay que inicializarlo (`npm init`) ni instalar las librerías (`npm install`)
- para pasar los test ejecuta `npm run test` 
- cuando quieras probarlo en el navegador ejecuta `npx webpack --mode=development`
