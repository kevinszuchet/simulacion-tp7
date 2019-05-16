# Fit Food
## Simulación para determinar tiempo óptimo para un canal de venta

### Ejecución

Para correr la simulación es necesario contar con NodeJs.
Una vez instalado y estando parado en el directorio que contiene el archivo index.js, se puede hacer

`node index.js 1 3`

donde los parámetros representan la cantidad de cuentas y de horas a dedicar por día al canal de MercadoLibre, respectivamente.

### Descripción del problema

Se tratara de optimizar la cantidad de horas destinadas a las ventas realizadas por la plataforma MercadoLibre (entre 30 minutos y 2 horas por dia) y analizar la posibilidad de expandirse dentro del canal de venta (agregar más cuentas de MercadoLibre).

Aquellos pedidos que no lleguen a ser atendidos en el horario laborable no serán contabilizados en las ganancias.

Además, el máximo que se puede facturar por cuenta en MercadoLibre es de $90.000 por mes, por lo tanto las ventas que superen ese monto tampoco serán contabilizadas en las ganancias.

**Metodología**: *evento a evento*

**Datos**:
- Intervalo entre ventas (minutos): ***IV***
- Monto de una venta ($): ***MV***

**Variables de control**
- Cantidad de cuentas: ***CC***
- Cantidad de horas a trabajar por día: ***CHT***

**Variables de estado**
- Sumatoria de horas trabajadas en el día: ***SHTD***

**Resultados**
- Porcentaje de tiempo ocioso: ***PTO***
- Promedio de ganancia por hora: ***PGH***
- Porcentaje de ganancia en tiempo excedido: ***PGTE***
- Promedio de pedidos atendidos por día: ***PPAD***
- Porcentaje de ganancia pérdida por exceder facturación: ***PGPEF***
