# Fit Food
## Simulación para determinar tiempo óptimo para un canal de venta

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

Para poder correr la simulacion llamar a la función `simular(CC, CHT)` pasandole por parametros las variables de control a tener en cuenta.