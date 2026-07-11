-- Insertar los hitos históricos desde los datos actuales del código
-- Ejecutar en SQL Editor de Supabase

INSERT INTO historia (año, titulo, desc) VALUES
('1939', 'Fundación y Primeros Pasos', 'El Presbítero Ignacio María Yepes Yepes, junto al querido médico local Israel Londoño, funda un colegio con recursos propios en la casa cural bajo el nombre de ''San Nicolás de Tolentino''. En sus inicios peregrinó por múltiples locales del municipio, incluyendo la plazoleta de Santa Bárbara (antiguo local de ''El Neucido'') y la plaza principal.'),

('1948', 'Nace la Escuela de Varones', 'El 20 de enero inicia labores la Escuela Urbana de Varones bajo la dirección de Gabriel Valencia. En 1959, mediante la ordenanza 021, se autoriza su funcionamiento mixto bajo el nombre de ''Escuela Urbana Integrada Remedios'', siendo impulsada en infraestructura por el destacado director Jairo Cadavid.'),

('1959', 'Legalización y Raíces Femeninas', 'Se oficializa la ''Escuela de Niñas del Municipio de Remedios'' mediante la Ordenanza Nº 21. Paralelamente, la Escuela Santa Teresita (cuyas escrituras datan de 1911 y 1897 en terrenos cedidos para niñas) es asumida y dirigida por la congregación de las Hermanas Teresitas del Niño Jesús.'),

('1963', 'La Gran Disputa y División', 'El plantel resurge en el palacio municipal como ''Colegio de Francisco Martínez de Ospina''. Sin embargo, una fuerte disputa personal entre el alcalde de turno y el párroco Pbro. Ovidio Castro divide el colegio en dos facciones: una permanece en el palacio y la otra se traslada a la Casa Cural bajo la figura de ''Colegio Parroquial''.'),

('1966', 'Llegada al Alto de las Tapias', 'La representación política y social unifica las fuerzas de la comunidad. Mediante el Acuerdo Nº 11 del Concejo Municipal, se ordena la edificación definitiva del plantel en el icónico Alto de las Tapias. Allí abre sus puertas con el nombre de ''Liceo Ignacio Yepes Yepes'', rindiendo tributo eterno a su fundador.'),

('1976', 'Primera Promoción de Bachilleres', 'Tras intensas visitas de inspección nacional que avalaron los estudios de primero a sexto de bachillerato, el 20 de noviembre de 1976 la institución otorga sus primeros títulos de bachiller, bajo la rectoría del señor Hugo de Jesús Castaño Hernández.'),

('2003', 'Fusión Definitiva: Nace la I.E.', 'El 6 de febrero de 2003 se firma la histórica Resolución Departamental Nº 0815. Las escuelas urbanas integradas (Santa Teresita y Remedios) se unifican de forma definitiva con el Liceo, consolidando la estructura actual de la Institución Educativa Ignacio Yepes Yepes.')
ON CONFLICT DO NOTHING;
