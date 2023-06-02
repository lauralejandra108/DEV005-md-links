Librería para búsqueda de archivos Markdown y análisis de enlaces

Esta librería proporciona una funcionalidad para buscar archivos Markdown (.md) en un directorio específico y analizar los enlaces dentro de esos archivos. Es útil para aquellos que deseen realizar análisis o extracción de datos en archivos Markdown, especialmente en relación con los enlaces contenidos en ellos.

Características principales
Búsqueda de archivos Markdown: La librería permite buscar archivos Markdown dentro de un directorio especificado. Puede proporcionar un directorio raíz y, opcionalmente, especificar patrones de nombres de archivo para filtrar los archivos Markdown encontrados.

Análisis de enlaces: Una vez que se encuentran los archivos Markdown, la librería analiza cada archivo en busca de enlaces. Extrae los enlaces encontrados y proporciona información relevante, como la URL de destino, el texto de anclaje y la ubicación del archivo Markdown en el que se encontró el enlace.

Si pasamos la opción --validate, el módulo debe hacer una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.

Si pasamos la opción --stats el output (salida) será un texto con estadísticas básicas sobre los links.




También podemos combinar --stats y --validate para obtener estadísticas que necesiten de los resultados de la validación.


