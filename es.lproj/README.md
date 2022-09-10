## Localisation ##

**RTFM** Esto fue traducido usando Google Translate (y la extensión Nova "Translate in Place"). Si hay alguna traducción que necesite mejorar, por favor envíemela para aplicar. ¡Gracias!

--

**RTFM** le ahorrará unas preciosas pulsaciones de teclas y clics cada vez que necesite leer la documentación de una función o palabra clave de sintaxis. Resalte una palabra clave de idioma en el editor y RTFM dirigirá la búsqueda de su navegador a su recurso de referencia favorito para ese término.

El sitio web al que se dirige está determinado por la sintaxis actual del documento (en la esquina inferior derecha de la ventana del editor) y su recurso preferido para esa sintaxis (especificado en las preferencias). Si no se selecciona ningún texto cuando se activa RTFM (por menú o tecla de acceso rápido asignada), se le pedirá que ingrese una cadena de búsqueda.

![Manual Search Entry](https://ext.runcode.run/rtfm/readme/RTFM_manual_entry.png)

RTFM incluye configuraciones para cada sintaxis reconocida por Nova, por lo que incluso si está trabajando en texto sin formato, aún puede realizar una búsqueda web general en cualquier cadena o configurar una URL personalizada para buscar la API de cualquier cosa en la que esté trabajando. o documentando.

Por último, si está (por ejemplo) trabajando en SQL en un archivo PHP, puede cambiar temporalmente la sintaxis del documento a SQL para que pueda dirigir sus consultas RTFM a los recursos SQL en lugar de PHP.

*NOTA:* Esta extensión es solo un atajo para realizar las búsquedas que puede hacer en estos sitios o mediante motores de búsqueda. Si los resultados de búsqueda no son mejores cuando realiza la misma búsqueda en el sitio mismo, esta extensión no puede mejorar esos resultados. No todos los sitios están bien diseñados para ser buscados.

Aquí hay una [demostración de video 30s](https://ext.runcode.run/rtfm/readme/RTFM_how_to.mp4)
si tu prefieres.

![Cómo usar RTFM en 3 pasos](https://ext.runcode.run/rtfm/readme/RTFM_how_to.png)

## Uso

RTFM puede ser utilizado por:
- haciendo clic con el botón derecho en un término y eligiendo el comando RTFM del menú emergente, O
- seleccionando una palabra y luego eligiendo el elemento del menú **Editor → RTFM** (¡o asígnele una tecla de acceso rápido!) O
- activar **RTFM** sin texto seleccionado para que se le solicite una palabra clave para buscar.

### Configuración

Para configurar las preferencias globales, abra **Extensiones → Biblioteca de extensiones...** y luego seleccione la pestaña **Preferencias** de RTFM.

### Preferencias

Para cada sintaxis, puede especificar a qué recurso en línea le gustaría enviar sus búsquedas. Las búsquedas que se realizan &quot;... a través de la redirección de Duck Duck Go&quot; utilizan la opción &quot;Me siento Ducky&quot; para redirigir automáticamente la búsqueda al primer resultado de búsqueda. Esta es *generalmente* la página que estás buscando, pero puede seleccionar la página incorrecta.

#### Recursos de idiomas personalizados

También puede agregar hasta 3 URL personalizadas en el área &quot;Recursos de idioma personalizados&quot;. Esto puede ser extremadamente útil si necesita apuntar a una API de biblioteca en particular. por ejemplo, la configuración de Javascript incluye ajustes preestablecidos dirigidos a las API de jQuery, HighCharts y Nova.

Las direcciones URL deben comenzar con http o https y deben incluir el token %@ en la ubicación donde debe aparecer la cadena de búsqueda. Las direcciones URL también pueden incluir el token %$ en el que desea especificar la sintaxis actual del documento (útil si se dirige a un sitio web como Mozilla.org, donde admiten muchas sintaxis).

Si la URL que ingresa funciona en su navegador (excepto para reemplazar los tokens %@ e %$), debería funcionar en RTFM.

Precisamente cómo crear una URL de búsqueda personalizada para un sitio web está fuera del alcance de este manual, por lo que necesitará RTFM sobre eso en otro lugar. :-) Pero si desea dirigirse a un sitio web específico a través de un motor de búsqueda como Duck Duck Go, la URL generalmente se ve como el texto del marcador de posición:

    https://duckduckgo.com/?q=\\+site:EJEMPLO.COM+%$+%@

ISi incluye %$ en la plantilla de URL, se reemplazará con la sintaxis del documento actual. El token %@ se reemplazará con lo que seleccione en su editor para buscar (o ingrese a través del cuadro de diálogo).

**NOTA:** Los siguientes nombres de sintaxis no se incluirán en la URL de búsqueda incluso si la plantilla de URL incluye el token %$:
   'text','diff','json','ini','markdown','shell'
Los nombres de sintaxis son demasiado genéricos para ser significativos (o posiblemente engañosos) en la mayoría de las búsquedas..

Si está utilizando Duck Duck Go y desea activar su "I'm Feeling Ducky"
(redirigir-al-primer-resultado) función de redirección, inicie la consulta con una barra invertida \ . Para Google debe incluir '&btnI' después del término de búsqueda.

#### ¿Por qué estás usando estos ajustes preestablecidos en particular?

compensaciones. Algunos sitios web (php.net) funcionan mejor cuando se buscan directamente, otros funcionan mejor cuando se busca a través de un motor de búsqueda (HTML5Doctor) y algunos no parecen admitir la búsqueda en absoluto (Vue).

He tratado de proporcionar un conjunto decente de sitios de referencia sin sobrecargar el menú con opciones para cada sintaxis. (SQL tiene la mayor cantidad, por supuesto, ya que SQL no es solo un idioma).

Las búsquedas "I'm Feeling Ducky" a través de Duck Duck Go son generalmente excelentes y es una forma extremadamente rápida de llegar directamente a la página que necesita. Y a veces los motores de búsqueda revelan mejor contenido que el sitio mismo.

p.ej, HTML5Doctor le mostrará una definición simple para \<figure\> si busca ese término directamente en su sitio, pero al usar Duck Duck Go obtendrá un artículo más extenso sobre *por qué* y *cuándo* debe usar \<figure\>.

Otros (p.ej., Perl) parecen tener peores resultados con DDG, por lo que si bien es una opción, no es la opción predeterminada. Y algunas sintaxis son en gran parte simbólicas (p.ej., Markdown) y parecía que si alguien necesitaba recursos para esto, sería por el contenido que está escribiendo, no por la sintaxis del contenido.

No estoy familiarizado con todos los idiomas, por lo que los ajustes preestablecidos elegidos pueden no ser los ideales. Si encuentra algo mejor, puede crear y asignar sus propias URL personalizadas a cualquier sintaxis, o enviármela y si funciona mejor que lo que está en RTFM ahora, ¡probablemente lo incluiré! (Solo hay 3 URL personalizadas porque espero que sea suficiente para la mayoría de las personas y no quería saturar los menús).
