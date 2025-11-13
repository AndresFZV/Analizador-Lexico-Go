// Configuración central de tokens y categorías
const TOKEN_CONFIG = {
    keywords: new Set([
        'break', 'case', 'chan', 'const', 'continue', 'default', 'defer', 'else',
        'fallthrough', 'for', 'func', 'go', 'goto', 'if', 'import', 'interface',
        'map', 'package', 'range', 'return', 'select', 'struct', 'switch', 'type', 'var'
    ]),

    dataTypes: new Set([
        'bool', 'byte', 'complex64', 'complex128', 'error', 'float32', 'float64',
        'int', 'int8', 'int16', 'int32', 'int64', 'rune', 'string', 'uint',
        'uint8', 'uint16', 'uint32', 'uint64', 'uintptr'
    ]),

    builtins: new Set([
        'append', 'cap', 'close', 'complex', 'copy', 'delete', 'imag', 'len',
        'make', 'new', 'panic', 'real', 'recover', 'print', 'println'
    ]),

    booleanLiterals: new Set(['true', 'false']),

    specialIdentifiers: new Set(['main', 'init', 'nil']),

    stdPackages: new Set(['fmt', 'math', 'os', 'io', 'time', 'strings', 'bufio', 'net', 'http', 'json', 'sync', 'context']),

    categories: [
        'NUMERO_ENTERO', 'NUMERO_DECIMAL', 'NUMERO_HEXADECIMAL', 'NUMERO_OCTAL',
        'IDENTIFICADOR', 'PALABRA_RESERVADA', 'TIPO_DATO', 'FUNCION_PREDEFINIDA',
        'IDENTIFICADOR_ESPECIAL', 'PAQUETE_ESTANDAR', 'LITERAL_BOOLEANO',
        'OP_ARITMETICO', 'OP_COMPARACION', 'OP_LOGICO', 'OP_ASIGNACION',
        'OP_INCREMENTO_DECREMENTO', 'OP_BITWISE', 'OP_PUNTERO', 'OP_CHANNEL',
        'PARENTESIS_ABRE', 'PARENTESIS_CIERRA', 'LLAVE_ABRE', 'LLAVE_CIERRA',
        'CORCHETE_ABRE', 'CORCHETE_CIERRA', 'TERMINAL', 'SEPARADOR', 'PUNTO',
        'DOS_PUNTOS', 'CADENA', 'CARACTER', 'COMENTARIO_LINEA', 'COMENTARIO_BLOQUE'
    ]
};
