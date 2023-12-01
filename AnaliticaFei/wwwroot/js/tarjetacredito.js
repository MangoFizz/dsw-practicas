var $cc = {}

// Función par validar el número de tarjeta
$cc.validate = function (e) {
    // Si el input esta vacío se reinician los identificadores a sus clases default
    if (e.target.value == '') {
        document.querySelector('.card-type').setAttribute('class', 'card-type');
        e.target.nextElementSibling.className = 'card-valid';
        return
    }

    // Se obtiene el valor del input y se quitan todos los caracteres que no sean números
    var number = String(e.target.value);
    var cleanNumber = '';
    for (var i = 0; i < number.length; i++) {
        if (/^[0-9]+$/.test(number.charAt(i))) {
            cleanNumber += number.charAt(i);
        }
    }

    // Solo se formatea el número si la tecla no es backspace
    if (e.key != 'Backspace') {
        // Formatea el valor para incluir espacios en la posición 3, 7 y 11
        var formatNumber = '';
        for (var i = 0; i < cleanNumber.length; i++) {
            if (i == 3 || i == 7 || i == 11) {
                formatNumber = formatNumber + cleanNumber.charAt(i) + ' '
            } else {
                formatNumber += cleanNumber.charAt(i)
            }
        }
        e.target.value = formatNumber;
    }

    // Se ejecuta el algoritmo de Luhn algorithm sobre el numero solo si tiene la longitud mínima de tipo de tarjeta menor
    if (cleanNumber.length >= 12) {
        var isLuhn = luhn(cleanNumber);
    }

    // Si el número pasa el algoritmo de Luhn se agrega la clase 'active'
    if (isLuhn == true) {
        e.target.nextElementSibling.className = 'card-valide acive'
    } else {
        e.target.nextElementSibling.className = 'card-valide'
    }

    // Tipos de tarjeta soportados. Aquí agrega otros tipos o modifica los regex para mejorar la precisión
    var card_types = [
        {
            name: 'amex',
            pattern: /^3[47]/,
            valid_length: [15]
        }, {
            name: 'diners_club_carte_blanche',
            pattern: /^30[0-5]/,
            valid_length: [14]
        }, {
            name: 'diners_club_international',
            pattern: /^36/,
            valid_length: [14]
        }, {
            name: 'jcb',
            pattern: /^35(2[89]|[3-8][0-9])/,
            valid_length: [16]
        }, {
            name: 'laser',
            pattern: /^(6304|670[69]|6771)/,
            valid_length: [16, 17, 18, 19]
        }, {
            name: 'visa_electron',
            pattern: /^(4026|417500|4508|4844|491(3|7))/,
            valid_length: [16]
        }, {
            name: 'visa',
            pattern: /^4[0-9]/,
            valid_length: [16]
        }, {
            name: 'mastercard',
            pattern: /^5[1-5]/,
            valid_length: [16]
        }, {
            name: 'maestro',
            pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
            valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
        }, {
            name: 'discover',
            pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
            valid_length: [16]
        }
    ];

    // Pruebas el numero contra cada tipo de tarjeta
    for (var i = 0; i < card_types.length; i++) {
        if (number.match(card_types[i].pattern)) {
            // Si se encuentra una coincidencia, se agrega el tipo de tarjeta como clase para mostrar la imagen
            document.querySelector('.card-type').setAttribute('class', 'card-type ' + card_types[i].name);
            break;
        }
    }
}

// Algoritmo de Luhn para validar números de tarjeta de crédito
function luhn(number) {
    var numberArray = number.split('').reverse();
    for (var i = 0; i < numberArray.length; i++) {
        if (i % 2 != 0) {
            numberArray[i] = numberArray[i] * 2;
            if (numberArray[i] > 9) {
                numberArray[i] = parseInt(String(numberArray[i]).charAt(0)) + parseInt(String(numberArray[i]).charAt(1));
            }
        }
    }
    var sum = 0;
    for (var i = 1; i < numberArray.length; i++) {
        sum += parseInt(numberArray[i]);
    }
    sum = sum * 9 % 10;
    if (numberArray[0] == sum) {
        return true;
    }
    else {
        return false;
    }
}

// Función para validar la fecha de expiración
$cc.expiry = function (e) {
    if (e.key != 'Backspace') {
        var number = String(this.value);

        // Se quitan todos los caracteres que no sean números
        var cleanNumber = '';
        for (var i = 0; i < number.length; i++) {
            if (i == 1 && number.charAt(i) == '/') {
                cleanNumber = 0 + number.charAt(0);
            }
            if (/^[0-9]+$/.test(number.charAt(i))) {
                cleanNumber += number.charAt(i);
            }
        }

        var formattedMonth = ''
        for (var i = 0; i < cleanNumber.length; i++) {
            if (/^[0-9]+$/.test(cleanNumber.charAt(i))) {
                if (i == 0 && cleanNumber.charAt(i) > 1) {
                    formattedMonth += 0;
                    formattedMonth += cleanNumber.charAt(i);
                    formattedMonth += '/';
                }
                else if (i == 1) {
                    formattedMonth += cleanNumber.charAt(i);
                    formattedMonth += '/'
                }
                else if (i == 2 && cleanNumber.charAt(i) < 2) {
                    formattedMonth += '20' + cleanNumber.charAt(i);
                } else {
                    formattedMonth += cleanNumber.charAt(i);
                }
            }
        }
        this.value = formattedMonth;
    }
}


