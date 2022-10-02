# Bloc 1: Javascript
## Práctica 3.1 - POO
En este ejercicio vamos a trabajar con los productos de un almacén, para lo que crearemos las clases **Category**, **Product** y **Store**.

## Clase Category
La guardaremos en el fichero _category.class.js_. Tendrá las siguientes **propiedades**:
  - **id** (number)
  - **name**
  - **description**: opcional. Si no se pasa su descripción será 'No hay descripción'  
  
Esta clase no tiene ningún método.

## Clase Product
La guardaremos en el fichero _product.class.js_. Tendrá las siguientes **propiedades**:
  - **id** (number)
  - **name**
  - **category**: el nº de su categoría
  - **price**
  - **units**: argumento opcional (si no le pasamos este parámetro al constructor su número por defecto será 0)
  
Esta clase tendrá los siguientes **métodos**:
  ```javascript
  productImport(): Number
  ```  
  - devuelve el importe total del producto (su precio multiplicado por el nº de unidades)

  ```javascript
  xxxx(): String
  ``` 
  - (¿qué nombre le deberías dar a este método?): si se intenta **imprimir** el producto se mostrará su descripción, sus unidades entre paréntesis, su precio y el importe total (los € siempre con 2 decimales) como en el siguiente ejemplo:
  ```html
        TV Samsung MP45: 10 uds. x 235,95 €/u = 2359,50 €
  ```

## Clase Store
Es el almacén de productos (podríamos tener más de uno) que guardaremos en _store.class.js_. Tendrá las **propiedades**:
  -  **id**: código numérico que nos pasan al crear el almacén
  - **name**: nombre del almacén (texto)
  -  **products**: array de productos. No se le pasa al constructor sino que al crear un almacén se inicializa a un array vacío
  - **categories**: array de categorías. No se le pasa, se inicializa vacío
  
La clase tendrá los **métodos**:
  ```javascript
  getCategoryById(id: Integer): Category
  ```   
  - recibe una id y devuelve su categoría. Si no existe lanzará una excepción 

  ```javascript
  getCategoryByName(name: String): Category
  ```  
  - recibe un nombre y devuelve su categoría. Si no existe lanzará una excepción. No tendrá en cuenta la capitalización

```javascript
getProductById(id: Integer): Product
```
  - recibe como parámetro una id de producto y devuelve el producto del almacén que tiene dicha id (si no existe  lanzará una excepción)

```javascript
getProductsByCategory(id: Integer): Product[]
```
  - recibe como parámetro una id de categoría y devuelve un array con los productos del almacén que tienen dicha categoría

  ```javascript
  addCategory(nombre: String [, descripcion: String]): Category
  ```
  - recibe el nombre de la categoría y, opcionalmente, una descripción y devuelve el objeto _Category_ creado. Crea un objeto de clase _Category_ y lo añade al almacén (a _categories_). Como a la clase _Category_ hay que pasarle una _id_ haremos una función que la calcule buscando la máxima _id_ de las categorías que hay en el almacén (debéis usar un _reduce_) y sumándole 1. Este método genera un error si
    - no se le pasa un nombre
    - ya existe una categoría con ese nombre


  ```javascript
  addProduct(payload: Object): Product
  ```
  - **addProduct**: recibe como **único** parámetro **un objeto** con los datos del producto a añadir (propiedades _name_, _category_, _price_ y, opcionalmente, _units_) y devuelve el objeto _Product_ creado. Este método crea un nuevo producto (llamará al constructor de la clase _Product_) y lo añade al almacén. Como a la clase _Product_ hay que pasarle una _id_ haremos una función que la calcule buscando la máxima _id_ de los productos que hay en el almacén (debéis usar un _reduce_) y sumándole 1. Este método genera un error si
    - no se le pasa _name_
    - no se le pasa _category_ o no existe esa categoría
    - no se le pasa _price_ o no es un número positivo
    - se le pasa _units_ pero no es un número entero positivo

  ```javascript
  delCategory(id: Integer): Category
  ```
  - recibe como parámetro la id de una categoría y, si no tiene productos, la elimina del almacén y devuelve la categoría eliminada. Genera un error si no existe la categoría o si tiene productos

  ```javascript
  delProduct(id: Integer): Product
  ```
  - recibe como parámetro la id de un producto y, si no tiene unidades, lo elimina del almacén y devuelve el producto eliminado. Genera un error si no existe el producto o si sus unidades no están a 0

  ```javascript
  totalImport(): Number
  ```    
  - devuelve el valor total de los productos del almacén (su precio por sus uds). Para ello usa el método _productImport_ de cada producto
  ```javascript
  orderByUnits(): Product[]
  ```    
  - devuelve el array de productos ordenado por unidades de forma descendente
  ```javascript
  orderByName(): Product[]
  ```    
  - devuelve el array de productos ordenado por el nombre del producto
  ```javascript
  underStock(units: Integer): Product[]
  ```    
  - recibe un nº de unidades y devuelve un array con los productos que tengan menos de dichas unidades
  ```javascript
  xxxx(): String
  ```  
  - (¿qué nombre le deberías dar a este método?): si se intenta imprimir el almacén devuelve una cadena con la id del almacén, el nº de productos y su importe total con 2 decimales, y debajo una lista con los datos de cada producto como en el siguiente ejemplo:
```html
Almacén 1 => 2 productos: 2174,75 €
- TV Samsung MP45: 10 uds. x 235,95 €/u = 2359,50 €
- USB Kingston 16 GB: 100 uds. x 19,95 €/u = 1995,00 €
```


Recuerda que siempre que llames a una función que pueda generar un error debes hacer dicha llamada dentro de una sentencia `try...catch`. Lo que hace _index.js_ si captura un error es mostrarlo por consola con el comando `console.error`.

## Organizar el código: webpack
Lo correcto es no tener todo el código en un único fichero javascript sino cada cosa en su fichero correspondiente. Así que dentro de la carpeta **src/** crearemos los ficheros:
- **product.class.js**: la clase _Product_ con sus propiedades y métodos
- **store.class.js**: la clase _Store_ con sus propiedades y métodos
- **index.js**: el programa principal que crea el almacén, lo modifica (añade, elimina y modifica productos) y muestra por consola su contenido

En el _index.html_ habría que enlazar los 3 ficheros en el orden correcto (productos, almacén y index para que desde _index.js_ se pueda llamar a métodos de _Store_ y desde _store.js_ a métodos de _Product_). Como esto ya empieza a ser incómodo vamos a hacer uso de **_webpack_** para que empaquete todos nuestros ficheros javascript en un único fichero que se llamará _./dist/main.js_ y que será el único que enlazaremos en el _index.html_. Consulta [cómo usar webpack](../12-tests.html#usando-webpack) para hacerlo. 

Fijaos que en el código que os paso para que la clase _Store_ pueda usar los métodos de _Product_ debe importar el fichero con dicha clase mediante una instrucción _require_ (`const Product = require('./Product.class'). Pero para que la clase sea exportable debemos añadir en su fichero la instrucción `module.exports = Product`. Por tanto, para poder usar código de un fichero en otro debemos hacer:
- añadir al final del fichero con el código a usar una sentencia **`module.exports`**, por ejemplo en _product.class.js_ ponemos `module.exports = Product`. Esto hace accesible la clase a cualquier fichero que importe _product.class.js_. Es lo mismo que hacíamos en los ficheros _functions.js_ de los ejercicios anteriores para que los tests pudieran acceder a sus funciones
- añadir al principio del fichero que lo quiere usar una sentencia **`require()`** para importar el fichero, por ejemplo en _store.class.js_ el añadimos al principio `const Product = require('./product.class')`. Esto crea una variable _Product_ que es la clase exportada en el otro fichero

Lo mismo tendréis que hacer para que_store.js_ pueda usar la clase _Category_ y para que _index.js_ pueda llamar a métodos de _Store_ (exportar la clase en _store.class_ e importar ese fichero en _index_).

Ahora, para empaquetar todos esos ficheros con _webpack_ lo que habría que hacer (**NO lo hagas** porque ya tienes credo el _package.json_) es:
- `npm init`: inicializamos nuestro proyecto, lo que creará el fichero **package.json**. Recuerda escribir **jest** cuando nos pregunte por los tests
- `npm i -D webpack webpack-cli`: instalamos _webpack_ como dependencia de desarrollo (en la versión de producción no estará)

En este ejercicio ya tienes el _package.json_ creado y configurado por lo que ya tienes lo anterior hecho.

Lo siguiente es hacer que se instalen las dependencias (`npm install`). Una vez hecho:
- para pasar los test ejecuta **`npm run test`**
- cuando quieras probarlo en el navegador ejecuta **`npx webpack --mode=development`**: esto crea el fichero **dist/main.js** (que es el que está enlazado en el _index.html_). En él webpack empaqueta el código de todos nuestros ficheros javascript. Deberás ejecutarlo cada vez que hagas cambios en tu código y quieras probarlos en el navegador. Si no quieres tener que ejecutar esto cada vez que modificas un fichero puedes lanzarlo con la opción _--watch_ que deja la consola abierta y ejecuta el comando automáticamente cuando guardamos cualquiera de los ficheros del proyecto:
  ```bash
  npx webpack --mode=development --watch
  ```

### Qué hace _webpack_
Es un _module bundler_, es decir, un empaquetador de código. Toma el fichero que le indiquemos como fichero principal (por defecto el _./src/index.js_), lo junta con todas sus dependencias (sus _require_ y los de sus dependencias) y los transpila a un único fichero (per defecto _./dist/main.js_) que es el que se enlaza en el _index.html_. Además minimiza y optimiza dicho código al generarlo.

Cuando usamos _webpack_ le tenemos que indicar que tipo de código de salida queremos:
- **_development_**: webpack permite "seguir" la ejecución del código desde la consola ya que "mapea" el código generado al original de forma que en la consola vemos como si se ejecutara nuestro código (los distintos ficheros) en vez del código generado por _webpack_ que es el que realmente se está ejecutando
- **_production_**: minimiza y optimiza el código para producción y ya no es posible desde la consola acceder al código original. Es lo que haremos para generar el código que subiremos al servidor de producción (NUNCA subimos el código de desarrollo).

## Probar el código
En la carpeta _test_ ya tienes hechos varios test que puedes pasar para comprobar tu código. Recuerda que simplemente debes hacer:
```javascript
npm run test
```

Para probar que funciona en el navegador tienes en el fichero _index.js_ el código necesario para:
- crear un almacén
- añadir una categoría y los siguientes 4 productos:
  - 'TV Samsung MP45', 345.95 €, 3 uds. 
  - 'Ábaco de madera', 245.95 €
  - 'impresora Epson LX-455', 45.95 €
  - 'USB Kingston 16GB', 5.95 €, 45 uds.
- eliminar el USB
- mostrar por consola el almacén ordenado por existencias
- mostrar por consola los productos del almacén con menos de 10 unidades

Al abrir la página en el navegador la consola deberá mostrar lo siguiente:

```
LISTADO DEL ALMACÉN por existencias
- Ábaco de madera: 45 uds. x 245.95 €/u = 11067.75 €
- TV Samsung MP45: 3 uds. x 345.95 €/u = 1037.85 €
- impresora Epson LX-455: 0 uds. x 45.95 €/u = 0.00 €
LISTADO DEL ALMACÉN por nombre
- Ábaco de madera: 45 uds. x 245.95 €/u = 11067.75 €
- impresora Epson LX-455: 0 uds. x 45.95 €/u = 0.00 €
- TV Samsung MP45: 3 uds. x 345.95 €/u = 1037.85 €
LISTADO DE PRODUCTOS CON POCAS EXISTENCIAS
- impresora Epson LX-455: 0 uds. x 45.95 €/u = 0.00 €
- TV Samsung MP45: 3 uds. x 345.95 €/u = 1037.85 €
```

**NOTA**: cuando acabes tu práctica mira el código que genera webpack (dist/main.js). Ahora vuelve a generarlo pero esta vez para producción (`--mode=production`) y fíjate de nuevo en el código del fichero. 
