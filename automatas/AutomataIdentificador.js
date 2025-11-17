import { Automata } from './Automata.js';

/**
 * Autómata para reconocer identificadores y palabras reservadas de GO.
 * Expresión regular: [a-zA-Z_][a-zA-Z0-9_]*
 * Límite: máximo 15 caracteres
 * 
 * Estados:
 * - q0 (inicial): Esperando letra o guion bajo
 * - q1 (aceptación): Reconociendo caracteres válidos
 * 
 * Palabras reservadas de GO:
 * break, case, const, continue, default, func, if, else, 
 * for, return, var, package, import, struct
 * 
 * @class AutomataIdentificador
 * @extends Automata
 */
export class AutomataIdentificador extends Automata {
    constructor() {
        super('IDENTIFICADOR');
        
        // Palabras reservadas de GO (al menos 8 como especifica el proyecto)
        this.palabrasReservadas = new Set([
            'break', 'case', 'const', 'continue', 'default', 
            'func', 'if', 'else', 'for', 'return', 'var', 
            'package', 'import', 'struct', 'interface', 'type',
            'go', 'defer', 'map', 'chan', 'range', 'select'
        ]);
        
        this.longitudMaxima = 15; // Límite de caracteres para identificadores
    }

    /**
     * Verifica si un carácter es válido para inicio de identificador
     * @private
     * @param {string} caracter - Carácter a verificar
     * @returns {boolean}
     */
    esCaracterInicioValido(caracter) {
        return this.esLetra(caracter) || caracter === '_';
    }

    /**
     * Verifica si un carácter es válido para continuar identificador
     * @private
     * @param {string} caracter - Carácter a verificar
     * @returns {boolean}
     */
    esCaracterIdentificadorValido(caracter) {
        return this.esAlfanumerico(caracter) || caracter === '_';
    }

    /**
     * Verifica si una cadena es una palabra reservada
     * @private
     * @param {string} palabra - Palabra a verificar
     * @returns {boolean}
     */
    esPalabraReservada(palabra) {
        return this.palabrasReservadas.has(palabra.toLowerCase());
    }

    /**
     * Reconoce identificadores y palabras reservadas en la entrada
     * @param {string} entrada - Cadena de entrada
     * @param {number} posicionInicial - Posición inicial
     * @returns {{exito: boolean, lexema: string, longitud: number, categoria?: string, error?: string}}
     */
    reconocer(entrada, posicionInicial) {
        let pos = posicionInicial;
        let lexema = '';
        let estado = 0;

        // Estado 0: Esperando primer carácter válido
        if (this.esFinDeEntrada(entrada, pos)) {
            return this.crearResultadoFallido();
        }

        const primerCaracter = this.caracterEn(entrada, pos);
        
        if (!this.esCaracterInicioValido(primerCaracter)) {
            return this.crearResultadoFallido();
        }

        // Estado 1: Reconociendo identificador
        estado = 1;
        lexema += primerCaracter;
        pos++;

        // Continuar mientras haya caracteres válidos
        while (!this.esFinDeEntrada(entrada, pos)) {
            const caracterActual = this.caracterEn(entrada, pos);
            
            if (this.esCaracterIdentificadorValido(caracterActual)) {
                lexema += caracterActual;
                pos++;
                
                // Verificar límite de longitud
                if (lexema.length > this.longitudMaxima) {
                    return {
                        exito: true,
                        lexema: lexema,
                        longitud: lexema.length,
                        categoria: 'ERROR',
                        error: `Identificador muy largo (máximo ${this.longitudMaxima} caracteres)`
                    };
                }
            } else {
                break;
            }
        }

        // Determinar si es palabra reservada o identificador
        const categoria = this.esPalabraReservada(lexema) ? 'PALABRA_RESERVADA' : 'IDENTIFICADOR';

        return {
            exito: true,
            lexema: lexema,
            longitud: lexema.length,
            categoria: categoria
        };
    }
}