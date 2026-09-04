#!/usr/bin/env python3
# Genera src/data/elements.ts con los 118 elementos en español.
from pathlib import Path

# numero: (simbolo, nombre, masa, grupo, periodo, categoria, descripcion, donde, curiosidad)
E = {
1:("H","Hidrógeno","1.008",1,1,"no-metal","El elemento más abundante y ligero del universo; combustible de las estrellas.","Es el elemento más abundante del universo (~75% de la materia bárica). Forma parte de casi todas las moléculas de la vida.","El Sol convierte unos 600 millones de toneladas de hidrógeno en helio cada segundo."),
2:("He","Helio","4.0026",18,1,"gas-noble","Gas noble inerte, ultraligero, descubierto en el Sol antes que en la Tierra.","Presente en estrellas (producto de la fusión). En la Tierra es escaso: se acumula en yacimientos de gas natural.","Se descubrió en 1868 analizando la luz del Sol, de ahí su nombre (Helios)."),
3:("Li","Litio","6.94",1,2,"metal-alcalino","Metal alcalino muy ligero, blando y reactivo; corazón de las baterías modernas.","Se extrae de minerales como espodumena y de salmueras en salares andinos (Chile es uno de los mayores productores).","El Big Bang creó litio en sus primeros minutos; casi todo el litio existente es primordial."),
4:("Be","Berilio","9.0122",2,2,"metal-alcalinoterreo","Metal ligero, rígido y tóxico; excelente para componentes aeroespaciales.","Escaso en la corteza terrestre; se encuentra en el mineral berilo (esmeraldas y aguamarinas son berilio coloreado).","Las gemas esmeralda son berilio con rastros de cromo y vanadio."),
5:("B","Boro","10.81",13,2,"semimetal","Semimetal duro y refractario, esencial en vidrios resistentes al calor.","Se obtiene de evaporitas como el bórax en salares (Chile, Argentina, Turquía, EE.UU.). Presente en el universo por rayos cósmicos.","El vidrio borosilicato (tipo Pyrex) resiste choques térmicos gracias al boro."),
6:("C","Carbono","12.011",14,2,"no-metal","La base de la vida: forma millones de compuestos y se presenta como diamante y grafito.","Abundante en la corteza terrestre (carbón, calizas, hidrocarburos) y en todo el universo; se fabrica en estrellas moribundas.","El diamante y el grafito son carbono puro: solo cambia su estructura atómica."),
7:("N","Nitrógeno","14.007",15,2,"no-metal","Gas que compone el 78% del aire atmosférico; esencial para proteínas y ADN.","Principal componente de la atmósfera terrestre. En el universo es común en estrellas y nebulosas.","El aire líquido que se evapora primero es nitrógeno, a −196 °C."),
8:("O","Oxígeno","15.999",16,2,"no-metal","Elemento clave de la respiración y la combustión; el más abundante en la corteza terrestre.","~46% de la corteza terrestre (silicatos y óxidos) y 21% del aire. Creado por fusión estelar y fotosíntesis.","Sin vida vegetal, el oxígeno libre de la atmósfera desaparecería en pocos miles de años."),
9:("F","Flúor","18.998",17,2,"halogeno","El elemento más electronegativo y reactivo; base de los fluoruros.","En la Tierra en minerales como la fluorita. En el universo es raro porque es frágil ante rayos cósmicos.","Compuesto con uranio (UF6) se usó para enriquecer uranio en el proyecto Manhattan."),
10:("Ne","Neón","20.180",18,2,"gas-noble","Gas noble que brilla rojo-anaranjado en tubos de descarga.","Abundante en el universo (estrellas), escasísimo en la Tierra: se obtiene del aire licuado.","Los letreros de neón emiten su rojo clásico al ionizar el gas con electricidad."),
11:("Na","Sodio","22.990",1,3,"metal-alcalino","Metal alcalino blando que estalla al contacto con el agua; mitad de la sal común.","Muy abundante en la corteza (sal, feldespatos) y disuelto en el mar (cloruro de sodio).","Tu cuerpo contiene sodio para los impulsos nerviosos; el mar tiene toneladas de él."),
12:("Mg","Magnesio","24.305",2,3,"metal-alcalinoterreo","Metal ligero que arde con luz blanca cegadora; central a la clorofila.","Séptimo elemento más abundante de la corteza; en el mar y en minerales como la magnesita. Se fabrica en estrellas masivas.","La clorofila tiene un átomo de magnesio en el centro: sin él, no habría fotosíntesis."),
13:("Al","Aluminio","26.982",13,3,"metal-post-transicion","Metal ligero, maleable y reciclable; el más abundante de la corteza metálica.","8% de la corteza terrestre en forma de minerales como la bauxita. Formado en estrellas y supernovas.","Reciclar latas de aluminio gasta un 95% menos energía que producirlas desde cero."),
14:("Si","Silicio","28.085",14,3,"semimetal","Semiconductor base de la era digital; la corteza terrestre es silicatos.","Segundo más abundante en la corteza (arena, cuarzo, sílice). Octavo en el universo.","Cada chip de computadora es arena ultrarrefinada: silicio purificado al 99,9999999%."),
15:("P","Fósforo","30.974",15,3,"no-metal","Elemento esencial del ADN y el ATP; brillante y reactivo en su forma blanca.","En la Tierra en la apatita y el guano; para las células es indispensable. En el universo, creado en supernovas.","Sin fósforo no hay ADN: donde haya vida conocida, hay fósforo."),
16:("S","Azufre","32.06",16,3,"no-metal","Elemento amarillo de olor volcánico; base de ácidos y Vulcanoes.","Abundante en volcanes, yacimientos y minerales (sulfuros, yeso).","El azufre derretido de los volcanes forma ríos rojos incandescentes."),
17:("Cl","Cloro","35.45",17,3,"halogeno","Gas verde tóxico que desinfecta el agua potable de las ciudades.","En la Tierra como cloruro disuelto en el mar y en la sal de roca. Formado en supernovas.","Una gota de agua clorada salvó millones de vidas del cólera y tifus."),
18:("Ar","Argón","39.948",18,3,"gas-noble","Gas noble perezoso; llena bombillas y soldaduras.","Casi 1% del aire atmosférico; se obtiene por destilación del aire.","Su nombre viene del griego 'argós': perezoso, porque no reacciona con nada."),
19:("K","Potasio","39.098",1,4,"metal-alcalino","Metal alcalino vital para tus nervios y músculos; estalla con agua.","En minerales y cenizas, y disuelto en el mar; esencial para toda la vida.","De ahí su nombre científico kalium: 'potaza' (ceniza de plantas quemadas)."),
20:("Ca","Calcio","40.078",2,4,"metal-alcalinoterreo","Construye huesos, conchas y mármol; metal alcalinotérreo.","5% de la corteza en caliza, yeso y fluorita; presente en todo ser vivo.","Tus huesos y conchas marinas son básicamente el mismo material: carbonato de calcio."),
21:("Sc","Escandio","44.956",3,4,"metal-transicion","Metal raro y caro, usado en aleaciones ligeras para bicicletas y aviones.","Raro en la corteza (toriovielita y otros); se dispersa en muchos minerales.","Debe su nombre a Escandinavia, donde se descubrió en 1879."),
22:("Ti","Titanio","47.867",4,4,"metal-transicion","Metal fuerte como el acero pero mucho más ligero; resistente a la corrosión.","En minerales como rutilo e ilmenita (arena negra de playas); noveno elemento más abundante de la corteza.","El titanio es biocompatible: los implantes óseos se lo quedan de por vida."),
23:("V","Vanadio","50.942",5,4,"metal-transicion","Metal duro que fortalece aceros de herramientas; colorido en solución.","Diseminado en minerales; se obtiene de la magnetita. Descubierto en México en 1801.","Sus compuestos cambian de color según su estado: azul, verde, violeta o amarillo."),
24:("Cr","Cromo","51.996",6,4,"metal-transicion","Metal brillante que cromó ruedas y protege al acero inoxidable.","En la cromita; 10º elemento más abundante de la corteza.","El rubí es corindón con cromo: de ahí su rojo fluorescente."),
25:("Mn","Manganeso","54.938",7,4,"metal-transicion","Metal gris esencial para aceros y pilas; tu cuerpo lo necesita en trazas.","En la pirolusita y nódulos del fondo marino. Los nódulos crecen 1 mm cada millón de años.","El manganeso dio los primeros pigmentos de cueva: negro de MnO2."),
26:("Fe","Hierro","55.845",8,4,"metal-transicion","Metal que forjó la civilización; núcleo de la Tierra y final de las estrellas.","4% de la corteza; masivo en el núcleo planetario. Es el elemento más común del universo tras H, He y C.","Toda la vida necesita hierro: está en tu hemoglobina transportando oxígeno."),
27:("Co","Cobalto","58.933",9,4,"metal-transicion","Metal duro de imanes y baterías; dio el azul de Vitruvio.","En minerales sulfurados junto a níquel; extraído mayormente en Congo.","El azul del vitral de las catedrales góticas es vidrio con cobalto."),
28:("Ni","Níquel","58.693",10,4,"metal-transicion","Metal resistente a la corrosión; aliado del acero inoxidable.","En minerales sulfurados y en meteoritos de hierro-níquel; se cree que gran parte llegó con meteoritos.","El meteorito de hierro que cavó el cráter de Barringer es casi puro hierro-níquel."),
29:("Cu","Cobre","63.546",11,4,"metal-transicion","Primer metal de la humanidad; conduce electricidad y calor de maravilla.","En la calcopirita y nativo en vetas; también en el fondo marino. Chile es el mayor productor del mundo.","El cobre es naturalmente antimicrobiano: las manijas de cobre se auto-desinfectan."),
30:("Zn","Zinc","65.38",12,4,"metal-transicion","Metal que protege al acero galvanizado y alea el latón.","En la esfalerita; 24º elemento más abundante de la corteza.","El zinc oxida antes que el acero: se sacrifica para protegerlo en galvanizado."),
31:("Ga","Galio","69.723",13,4,"metal-post-transicion","Metal que se derrite en tu mano (29.8 °C); base de LEDS y chips.","Muy raro: en bauxita y zincblenda como trazas. Predicho por Mendeléyev antes de hallarse.","Su descubrimiento confirmó las predicciones de la tabla periódica: Mendeléyev lo había anticipado."),
32:("Ge","Germanio","72.630",14,4,"semimetal","Semiconductor de los primeros transistores; hoy en óptica infrarroja.","Escaso; en argirodita y carbón como trazas.","El primer transistor de 1947 usó germanio, no silicio."),
33:("As","Arsénico","74.922",15,4,"semimetal","Metaloide tóxico, célebre veneno de la historia; semiconductor.","En arsenopirita y como trazas; común en aguas de acuíferos de Asia y América.","El arsénico 'el veneno de los reyes' porque en la corte europea silenció a muchos."),
34:("Se","Selenio","78.971",16,4,"no-metal","No-metal fotoconductor; vital en trazas y tóxico en exceso.","En sulfuros junto a azufre; se recupera de refinerías de cobre (Chil... especialmente del cobre refinado).","Debe su nombre a Selene, la Luna, hermano del Telurio (de tellus, la Tierra)."),
35:("Br","Bromo","79.904",17,4,"halogeno","Único no-metal líquido a temperatura ambiente; rojo volátil y tóxico.","En salmueras y agua de mar como bromuro; también en lagos salados.","Su olor acre le dio el nombre: 'bromos' significa hedor en griego."),
36:("Kr","Kriptón","83.798",18,4,"gas-noble","Gas noble usado en flashes de alta velocidad y luces.","Trazas en el aire (~1 ppm); se obtiene por destilación del aire.","De 1960 a 1983 el metro se definió con una longitud de onda del kriptón-86."),
37:("Rb","Rubidio","85.468",1,5,"metal-alcalino","Metal alcalino ultrarreactivo; marca la hora en relojes atómicos.","Diseminado en lepidolita; 23º elemento más abundante de la corteza.","Relojes atómicos de rubidio están en satélites GPS: sin ellos no navegas."),
38:("Sr","Estroncio","87.62",2,5,"metal-alcalinoterreo","Metal que pinta de rojo los fuegos artificiales.","En la celestina y estroncianita; 15º más abundante de la corteza.","Los fuegos artificiales rojos de Año Nuevo son química de estroncio."),
39:("Y","Itrio","88.906",3,5,"metal-transicion","Metal de tierras raras para LEDS blancos y superconductores.","En xenotima y monacita; nunca se encuentra libre.","El fósforo rojo de pantallas LED/TV es óxido de itrio-europio."),
40:("Zr","Zirconio","91.224",4,5,"metal-transicion","Metal resistente a la corrosión: reactores nucleares y cerámicas.","En el zircón (circón), uno de los minerales más antiguos de la Tierra.","Cristales de zircón de 4.400 millones de años son los materiales más antiguos datados."),
41:("Nb","Niobio","92.906",5,5,"metal-transicion","Metal superconductor de imanes MRI y colisionadores.","En la columbita; 80% se extrae en Brasil.","Los imanes del LHC usan niobio-titanio: sin él no habría colisionador."),
42:("Mo","Molibdeno","95.95",6,5,"metal-transicion","Metal refractario que endurece aceros y alimenta enzimas humanas.","En la molibdenita; 25º más abundante de la corteza.","Una enzima tuya usa molibdeno para procesar el azufre de los alimentos."),
43:("Tc","Tecnecio","98",7,5,"metal-transicion","El primer elemento sintético; radiactivo, para imágenes médicas.","No existe naturalmente en la Tierra (trazas en mineral de uranio); se produce en reactores. En el universo lo generan estrellas evolucionadas.","Su nombre significa 'artificial': el primer elemento creado por humanos (1937)."),
44:("Ru","Rutenio","101.07",8,5,"metal-transicion","Metal del grupo del platino; endurece contactos eléctricos.","Escaso; en minerales de platino y níquel.","Fue descubierto en Rusia: de ahí su nombre (Ruthenia)."),
45:("Rh","Rodio","102.91",9,5,"metal-transicion","Metal más caro del mundo; catalizador de autos.","En minerales de platino y níquel; extremadamente raro.","Un lingote de rodio vale varias veces más que uno de oro."),
46:("Pd","Paladio","106.42",10,5,"metal-transicion","Metal del grupo del platino; catalizadores y almacenamiento de hidrógeno.","En minerales de níquel y platino.","El paladio absorbe 900 veces su volumen en hidrógeno, como una esponja."),
47:("Ag","Plata","107.87",11,5,"metal-transicion","Metal que mejor conduce electricidad; reflejó espejos y monedas.","En argentita y plata nativa; también en minerales de plomo. Chile y Perú son grandes productores.","La palabra 'plata' en el símbolo Ag viene del latín argentum."),
48:("Cd","Cadmio","112.41",12,5,"metal-transicion","Metal tóxico de pigmentos amarillos y viejas baterías Ni-Cd.","En zincblenda como trazas; se obtiene refinando zinc.","Los cuadros amarillos de Van Gogh usan cadmio: hoy hay réplicas sin tóxicos."),
49:("In","Indio","114.82",13,5,"metal-post-transicion","Metal blando que forma el óxido conductor de tu pantalla táctil.","Escaso; en zincblenda como trazas.","Sin indio-tin oxide (ITO), tu celular no tendría pantalla táctil."),
50:("Sn","Estaño","118.71",14,5,"metal-post-transicion","Metal del bronce (con cobre); protege latas de conserva.","En la casiterita; 49º más abundante de la corteza.","Los imperios de la Edad del Bronce dependían del estaño: rutas comerciales milenarias."),
51:("Sb","Antimonio","121.76",15,5,"semimetal","Semimetal de aleaciones y retardantes de llama.","En la estibina. Conocido desde el antiguo Egipto (cosmético kohl).","Las antiguas egipcias pintaban sus ojos con sulfuro de antimonio."),
52:("Te","Telurio","127.60",16,5,"semimetal","Semimetal raro de paneles solares y aleaciones.","Ultraescaso en la corteza; en calaverita junto al oro.","Se encuentra en el espacio interestelar: moléculas de telurio en nebulosas."),
53:("I","Yodo","126.90",17,5,"halogeno","Halógeno violeta, esencial para la tiroides.","En salmueras y algas marinas; se añade a la sal yodada.","Sal yodada eliminó el bocio y el cretinismo endémico en el mundo."),
54:("Xe","Xenón","131.29",18,5,"gas-noble","Gas noble de lámparas potentes y motores iónicos espaciales.","Trazas en el aire (~0,09 ppm); obtenido del aire licuado.","La sonda Dawn navegó el cinturón de asteroides con un motor de xenón."),
55:("Cs","Cesio","132.91",1,6,"metal-alcalino","El metal más reactivo; define el segundo en relojes atómicos.","En polucita; extremadamente escaso. Formado en supernovas.","1 segundo = 9.192.631.770 vibraciones del átomo de cesio-133."),
56:("Ba","Bario","137.33",2,6,"metal-alcalinoterreo","Metal pesado de contrastes radiográficos y fuegos verdes.","En barita y witherita; 14º más abundante de la corteza.","Antes de una radiografía digestiva te tomas 'papilla' de sulfato de bario."),
57:("La","Lantano","138.91",3,6,"lantenido","Primera tierra rara; lentes, baterías y catalizadores.","En monacita y bastnasita; más común que el plomo.","Las lentes de cámaras usan óxido de lantano para corregir aberraciones."),
58:("Ce","Cerio","140.12",3,6,"lantenido","Tierra rara más abundante; pulidoras y piedras de mechero.","En monacita y bastnasita; 25º elemento más abundante.","Las piedras de mechero flamean con chispas de cerio-hierro."),
59:("Pr","Praseodimio","140.91",3,6,"lantenido","Tierra rara de imanes y vidrios amarillentos de soldador.","En monacita y bastnasita.","El verde-amarillo del vidrio de soldador filtra el destello de soldadura."),
60:("Nd","Neodimio","144.24",3,6,"lantenido","Tierra rara que hace los imanes permanentes más potentes.","En monacita y bastnasita; muy común en tierras raras.","Los imanes de neodimio son tan fuertes que pueden lesionar dedos al juntarse."),
61:("Pm","Prometio","145",3,6,"lantenido","Único lantánido radiactivo puro; iluminación y baterías nucleares.","No existe naturalmente en la Tierra; generado en reactores y estrellas (detectado en estrellas de Andrómeda).","Su nombre viene de Prometeo, quien robó el fuego de los dioses."),
62:("Sm","Samario","150.4",3,6,"lantenido","Tierra rara de imanes resistentes al calor (cobalto-samario).","En monacita y bastnasita.","Los imanes de samario funcionan a 300 °C donde el neodimio se rinde."),
63:("Eu","Europio","151.96",3,6,"lantenido","Tierra rara fosforescente: rojo de pantallas y anti-falsificación en billetes.","En monacita y bastnasita.","El euro y el dólar usan europio fosforescente como marca de seguridad."),
64:("Gd","Gadolinio","157.25",3,6,"lantenido","Tierra rara paramagnética; contraste de resonancias magnéticas.","En monacita y bastnasita.","El contraste de una resonancia magnética (MRI) lleva gadolinio."),
65:("Tb","Terbio","158.93",3,6,"lantenido","Tierra rara verde-fosforescente y aleaciones sonoras (Terfenol-D).","En monacita y bastnasita.","El verde de los fósforos de pantalla viejos es óxido de terbio."),
66:("Dy","Disprosio","162.50",3,6,"lantenido","Tierra rara que mantiene imanes calientes funcionando en motores eléctricos.","En xenotima y monacita.","Un auto eléctrico puede llevar un cuarto de kilo de disprosio en sus imanes."),
67:("Ho","Holmio","164.93",3,6,"lantenido","Tierra rara de láseres médicos y campos magnéticos récord.","En monacita y xenotima.","De todos los elementos, el holmio tiene el mayor momento magnético."),
68:("Er","Erbio","167.26",3,6,"lantenido","Tierra rara de fibras ópticas y láseres dermatológicos.","En xenotima y monacita.","El amplificador EDFA con erbio hace posible el internet intercontinental."),
69:("Tm","Tulio","168.93",3,6,"lantenido","Tierra rara más escasa de uso comercial; rayos X portátiles.","En xenotima y monacita.","El tulio es tan raro que su producción anual se mide en kilos."),
70:("Yb","Iterbio","173.05",3,6,"lantenido","Tierra rara de relojes atómicos de precisión óptica.","En xenotima y monacita.","Los relojes de iterbio pierden menos de un segundo en la edad del universo."),
71:("Lu","Lutecio","174.97",3,6,"lantenido","Tierra rara de detectores PET y catalizadores.","En xenotima y monacita.","Debe su nombre a Lutetia, el nombre romano de París."),
72:("Hf","Hafnio","178.49",4,6,"metal-transicion","Metal refractario de barras de control nuclear y chips finFET.","En zircón como trazas (separarlo del zirconio es caro).","Los procesadores modernos llevan óxido de hafnio en sus transistores."),
73:("Ta","Tantalio","180.95",5,6,"metal-transicion","Metal biocompatible de condensadores de celulares y implantes.","En tantalita y columbita (minerales 'coltán').","Tu celular tiene unos 30 condensadores de tantalio; el coltán es controversial."),
74:("W","Wolframio","183.84",6,6,"metal-transicion","Metal con el punto de fusión más alto (3422 °C): filamentos y herramientas.","En la scheelita y wolframita.","El filamento de las ampolletas incandescentes era wolframio casi puro."),
75:("Re","Renio","186.21",7,6,"metal-transicion","Metal rarísimo de turbinas de avión y catalizadores.","Trazas en molibdenita; uno de los más escasos.","Las turbinas de los aviones soportan temperaturas infernales gracias al renio."),
76:("Os","Osmio","190.23",8,6,"metal-transicion","El elemento natural más denso (22.6 g/cm³).","Ultraescaso; en minerales de platino y níquel.","Un ladrillo de osmio pesaría más de 50 kilos."),
77:("Ir","Iridio","192.22",9,6,"metal-transicion","Metal más resistente a la corrosión; marcador de meteoritos.","Ultraescaso; la capa de iridio del límite K-Pg delató el asteroide que mató a los dinosaurios.","La fina capa de iridio global de hace 66 millones de años es la huella del asteroide dinosauricida."),
78:("Pt","Platino","195.08",10,6,"metal-transicion","Metal noble, denso y catalizador universal; joyería y autos.","En minerales de níquel-cobre y placeres; el 70% se extrae en Sudáfrica.","El catalizador de tu auto es panal de platino, paladio y rodio."),
79:("Au","Oro","196.97",11,6,"metal-transicion","Metal noble y maleable; moneda, joyería y electrónica.","En vetas hidrotermales y placeres; se forma en colisiones de estrellas de neutrones.","Todo el oro de la Tierra llegó de colisiones de estrellas de neutrones."),
80:("Hg","Mercurio","200.59",12,6,"metal-transicion","Único metal líquido a temperatura ambiente; tóxico y fascinante.","En el cinabrio. El mercurio líquido de antiguos termómetros es elemental.","El mercurio es tan denso que un yunque flotaría en él."),
81:("Tl","Talio","204.38",13,6,"metal-post-transicion","Metal ultratóxico apodado 'veneno del envenenador'.","En trazas de minerales sulfurados.","Es tan tóxico que se restringió su venta: detective y veneno en crimen real."),
82:("Pb","Plomo","207.2",14,6,"metal-post-transicion","Metal denso y blando; tuberías, baterías y protección radiológica.","En la galena; el 38º elemento más abundante.","El símbolo Pb viene del latín plumbum: de ahí 'plomero'."),
83:("Bi","Bismuto","208.98",15,6,"metal-post-transicion","Metal de cristales iridiscentes en escalera; estómago (subsalicilato).","En bismutinita; el metal más diamagnético.","Sus cristales tienen una espiral de colores por capa de óxido."),
84:("Po","Polonio","209",16,6,"metal-post-transicion","Elemento ultrarradiactivo, descubierto por Marie Curie.","Trazas en mineral de uranio; altamente tóxico. En el universo, producto de decadencia.","Marie Curie lo nombró en honor a Polonia, su tierra natal."),
85:("At","Astato","210",17,6,"halogeno","Halógeno más raro de la Tierra: existen menos de 30 gramos en el planeta.","Se genera naturalmente por decadencia de uranio-torio en cantidades traza; se produce artificialmente.","Es el elemento natural más escaso de la corteza terrestre."),
86:("Rn","Radón","222",18,6,"gas-noble","Gas noble radiactivo que se filtra desde el suelo a los sótanos.","Producto de decadencia del uranio del subsuelo; se acumula en espacios cerrados.","El radón es la segunda causa de cáncer pulmonar tras el tabaco."),
87:("Fr","Francio","223",1,7,"metal-alcalino","El metal más inestable: su isótopo más duradero vive 22 minutos.","Trazas minúsculas en minerales de uranio; se estudia sintéticamente.","En todo el planeta hay menos de 30 gramos de francio en un instante dado."),
88:("Ra","Radio","226",2,7,"metal-alcalinoterreo","Metal radiactivo brillante; pinturas luminosas de relojes antiguos.","Decae del uranio en minerales; hoy se produce en reactores.","Las pintoras de relojes del siglo XX lamían pinceles con radio: tragedia histórica."),
89:("Ac","Actinio","227",3,7,"actinido","Actínido radiactivo fuente de neutrones; da nombre a la familia.","Trazas en minerales de uranio; se produce en reactores.","Glow-in-the-dark verde de actinio inspiró pinturas luminosas del siglo XX."),
90:("Th","Torio","232.04",3,7,"actinido","Actínido radiactivo propuesto como combustible nuclear alternativo.","En la torita y monacita: la India y Brasil tienen grandes reservas.","Un reactor de torio no puede fundirse como los de uranio: física a favor."),
91:("Pa","Protactinio","231.04",3,7,"actinido","Actínido escaso y carísimo; investigación científica.","Trazas en pechblenda; separarlo es dificilísimo.","Su nombre significa 'padre del actinio': decae hacia él."),
92:("U","Uranio","238.03",3,7,"actinido","Actínido fisíl: alimenta reactores nucleares y bombas.","En pechblenda y carnotita; Australia y Kazajistán tienen las mayores reservas.","Un pellet de uranio del tamaño de un dedo da tanta energía como una tonelada de carbón."),
93:("Np","Neptunio","237",3,7,"actinido","Primer transuránico sintético; radiactivo de vida larga.","Sintético: se produce en reactores; trazas minúsculas en la naturaleza.","Su nombre sigue a Urano-Neptuno en la secuencia planetaria."),
94:("Pu","Plutonio","244",3,7,"actinido","Actínido de armas y generadores espaciales (Voyager).","Sintético en reactores; trazas naturales ínfimas.","La sonda Voyager funciona con un generador de plutonio-238 desde 1977."),
95:("Am","Americio","243",3,7,"actinido","Actínido de detectores de humo domésticos.","Sintético; se produce en reactores.","Tu detector de humo tiene una pizca de americio-241: es completamente seguro."),
96:("Cm","Curio","247",3,7,"actinido","Actínido de sondas espaciales y espectrómetros marcianos.","Sintético; nombrado en honor a Marie y Pierre Curie.","El rovers de Marte analizaron rocas con espectrómetros de curio."),
97:("Bk","Berkelio","247",3,7,"actinido","Actínido sintético raro; blanco para crear elementos superpesados.","Sintético; solo en cantidades de microgramos.","Se fabricó en Berkeley: de ahí su nombre."),
98:("Cf","Californio","251",3,7,"actinido","Actínido que arranca reactores nucleares y detecta oro.","Sintético; uno de los elementos más caros: millones por gramo.","El californio es tan caro que se cotiza por microgramos."),
99:("Es","Einstenio","252",3,7,"actinido","Actínido de la era de la bomba H; pura investigación.","Sintético: hallado en restos de la primera prueba termonuclear.","Fue descubierto en los escombros de la bomba H 'Ivy Mike'."),
100:("Fm","Fermio","257",3,7,"actinido","Actínido sintético de vida cortísima.","Sintético; también hallado en los restos de Ivy Mike.","Llamado así por Enrico Fermi, arquitecto del primer reactor nuclear."),
101:("Md","Mendelevio","258",3,7,"actinido","Actínido que honra al padre de la tabla periódica.","Sintético; producido átomo por átomo en aceleradores.","Mendeléyev predijo elementos vacíos: este metal lleva su nombre."),
102:("No","Nobelio","259",3,7,"actinido","Actínido sintético de química escurridiza.","Sintético; su estudio es complicado por su corta vida.","Su descubrimiento fue disputado por tres países durante décadas."),
103:("Lr","Lawrencio","266",3,7,"actinido","Último actínido; cierra la fila de los sintéticos clásicos.","Sintético; solo en aceleradores.","Nombrado por Ernest Lawrence, inventor del ciclotrón."),
104:("Rf","Rutherfordio","267",4,7,"metal-transicion","Primer transactínido; química de segundo de vida.","Sintético: fusionar átomos pesados en aceleradores.","Honra a Ernest Rutherford, padre del modelo nuclear del átomo."),
105:("Db","Dubnio","268",5,7,"metal-transicion","Transactínido disputado entre EE.UU. y la URSS.","Sintético; se desintegra en segundos.","Su nombre 'Dubnio' honra a Dubna, el laboratorio ruso que co-descubrió."),
106:("Sg","Seaborgio","269",6,7,"metal-transicion","Transactínido nombrado en vida de su descubridor.","Sintético; átomos contados por década.","Glenn Seaborg vio un elemento con su nombre en la tabla: caso único."),
107:("Bh","Bohrio","270",7,7,"metal-transicion","Transactínido de vida ultracorta.","Sintético; confirmado en Darmstadt, Alemania.","Su nombre honra a Niels Bohr, del modelo atómico de capas."),
108:("Hs","Hassio","269",8,7,"metal-transicion","Transactínido con química de osmio estudiada en átomos individuales.","Sintético; producido en GSI, Alemania.","Se han estudiado sus compuestos químicos ¡con solo unos pocos átomos!"),
109:("Mt","Meitnerio","278",9,7,"metal-desconocido","Transactínido ultrapesado; pura física de investigación.","Sintético; átomos que viven fracciones de segundo.","Honra a Lise Meitner, codescubridora de la fisión nuclear."),
110:("Ds","Darmstatio","281",10,7,"metal-desconocido","Transactínido sintético de vida corta.","Sintético; creado en Darmstadt, Alemania.","Su símbolo Ds marca el laboratorio alemán GSI."),
111:("Rg","Roentgenio","282",11,7,"metal-desconocido","Transactínido hipotéticamente dorado.","Sintético; átomos fugaces.","Se especula que sería un metal noble parecido al oro."),
112:("Cn","Copernicio","285",12,7,"metal-desconocido","Transactínido quizás volátil como gas noble.","Sintético; pocos átomos detectados.","Nombrado por Copérnico, que movió la Tierra del centro del universo."),
113:("Nh","Nihonio","286",13,7,"metal-desconocido","Primer elemento descubierto en Asia (Japón).","Sintético; creado en RIKEN, Japón.","'Nihon' significa Japón: primer elemento de nombre asiático."),
114:("Fl","Flerovio","289",14,7,"metal-desconocido","Transactínido quizás semimetal gaseoso.","Sintético; laboratorio Flerov, Rusia.","Podría comportarse como un gas noble pese a ser 'metal'."),
115:("Mc","Moscovio","290",15,7,"metal-desconocido","Transactínido sintético ruso-estadounidense.","Sintético; producido en Dubna.","Nombrado por el óblast de Moscú, no por la ciudad."),
116:("Lv","Livermorio","293",16,7,"metal-desconocido","Transactínido de vida ultracorta.","Sintético; laboratorio Lawrence Livermore, EE.UU.","El nombre honra el laboratorio Livermore, California."),
117:("Ts","Teneso","294",17,7,"halogeno","El halógeno sintético más nuevo.","Sintético; colisionando calcio y berkelio.","Nombrado por Tennessee, sede del laboratorio Oak Ridge."),
118:("Og","Oganessón","294",18,7,"gas-noble","El elemento más pesado conocido; quizás sólido, no gas.","Sintético; creado en Dubna, Rusia.","Es el único elemento nombrado por una persona viva: Yuri Oganessian."),
}

CATEGORIAS = [
    ("metal-alcalino", "Metal alcalino", "#f87171"),
    ("metal-alcalinoterreo", "Metal alcalinotérreo", "#fb923c"),
    ("metal-transicion", "Metal de transición", "#facc15"),
    ("metal-post-transicion",Metal_lot := "Metal post-transición", "#4ade80"),
    ("semimetal", "Semimetal", "#2dd4bf"),
    ("no-metal", "No metal", "#22d3ee"),
    ("halogeno", "Halógeno", "#60a5fa"),
    ("gas-noble", "Gas noble", "#a78bfa"),
    ("lantenido", "Lantánido", "#f472b6"),
    ("actinido", "Actínido", "#e879f9"),
    ("metal-desconocido", "Propiedades desconocidas", "#94a3b8"),
]

def esc(s): return s.replace("\\", "\\\\").replace("'", "\\'").replace('"', '\\"')

lines = []
lines.append("/** Datos de los 118 elementos — español. Generado, no editar a mano. */")
lines.append("export type CategoriaId =")
for i,(cid,_,_) in enumerate(CATEGORIAS):
    lines.append(f"  | '{cid}'")
lines.append(";")
lines.append("")
lines.append("export interface Categoria { id: CategoriaId; nombre: string; color: string; }")
lines.append("")
lines.append("export const CATEGORIAS: Categoria[] = [")
for cid,nombre,color in CATEGORIAS:
    lines.append(f"  {{ id: '{cid}', nombre: '{nombre}', color: '{color}' }},")
lines.append("];")
lines.append("")
lines.append("export interface Elemento {")
lines.append("  z: number; simbolo: string; nombre: string; masa: string;")
lines.append("  grupo: number | null; periodo: number; categoria: CategoriaId;")
lines.append("  descripcion: string; donde: string; curiosidad: string;")
lines.append("}")
lines.append("")
lines.append("export const ELEMENTOS: Elemento[] = [")
for z,(sim,nombre,masa,grupo,periodo,cat,desc,donde,cur) in E.items():
    g = str(grupo) if grupo else "null"
    lines.append(f"  {{ z: {z}, simbolo: '{esc(sim)}', nombre: '{esc(nombre)}', masa: '{esc(masa)}', grupo: {g}, periodo: {periodo}, categoria: '{cat}', descripcion: '{esc(desc)}', donde: '{esc(donde)}', curiosidad: '{esc(cur)}' }},")
lines.append("];")
lines.append("")
lines.append("export function categoriaDe(id: CategoriaId): Categoria | undefined {")
lines.append("  return CATEGORIAS.find((c) => c.id === id);")
lines.append("}")

Path("/tmp/periodic-table-webgpu/src/data/elements.ts").parent.mkdir(parents=True, exist_ok=True)
Path("/tmp/periodic-table-webgpu/src/data/elements.ts").write_text("\n".join(lines) + "\n", encoding="utf-8")
print("OK", len(E), "elementos")
