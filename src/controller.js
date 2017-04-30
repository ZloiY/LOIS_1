/**
 * (((X&Y)&(!Z))|((X&(!Y))&Z))
 * ((((X&(!Y))&Z)|(((!X)&(!Y))&Z))|((X&(!Y))&(!Z)))
 * (((X&(Y&(Z&W)))|(X&(Y&(Z&(!W)))))|(X&(Y&((!Z)&W))))
 * (((X&(Y&(Z&W)))|((X&Y)&(Z&W)))|(X&(Y&((!Z)&W))))
 * (((X&(Y&(Z&W)))|((X&Y&(Z&(!W)))))|(X&(Y&((!Z)&W))))
 * (((X&(Y&(Z&W)))|(X&(Y&(Z&(!W)))))|((X&((!Y)&(Z&W)))|(X&(Y&((!Z)&W)))))
*/

/**
 * Функция входа.
 */
function startParse(someExpression) {
    let startExpression = someExpression.toString();
    //Проверяем на наличие скобок
    if (startExpression.match(/\(|\)/g) == null) {
        console.log("Отсутсвуют скобки");
        return "Отсутствуют скобки";
    }
    let allBrackets = startExpression.match(/\(|\)/g);
    //Проверяем на наличие лишних символов
    if (startExpression.match(/(?!([A-Z]|&|\||\(|\)|!))./g)) {
        console.log("Неправильные символы");
        return "Неправильные символы";
    }
    //Проверяем на чётность количества скобок
    if (allBrackets.length % 2 == 0) {
        //Проверяем на наличие дизъюнкции
        if (startExpression.match(/\)\|\(/g)) {
            console.log(startExpression);
            //Ищем унарные операции
            let expression = startExpression.replace(/\(![A-Z]\)/g, "1");
            console.log(startExpression);
            //Ищем бинарные операции
            let finalExpression = disjunctiveReplace(conjunctionReplace(expression));
            if (finalExpression == "1") {
               return conjunctionCount(startExpression);
            } else {
                console.log("Неправильное выражение");
                return "Неправильное выражение";
            }
        }
        else {
            console.log("Дизъюнкций не было найдено");
            return "Дизъюнкций не было найдено";
        }
    }
    else {
        console.log("Нечётное количество скобок");
        return "Нечётное количество скобок";
    }
}

/**
 * Заменяем коньюнкцию на 1
 * @param expression формула выражения
 * @returns {*} корректную формулу
 */
function conjunctionReplace(expression) {
    console.log(expression);
    if (expression.match(/\(([A-Z]|1)(&[A-Z]|&1)+\)/g)) {
        return conjunctionReplace.call(this,expression.replace(/\(([A-Z]|1)(&[A-Z]|&1)+\)/g, "1"));
    }else return expression;
}

/**
 * Заменяем дизъюнкцию на 1
 * @param expression формула выражения
 * @returns {*} корректную фоормулу
 */
function disjunctiveReplace(expression) {
    console.log(expression);
    if (expression.match(/(\(1\|1\))+/g)){
        return disjunctiveReplace.call(this, expression.replace(/(\(1\|1\))+/g,"1"));
    }else return expression;
}

/**
 * Проверяем на корректность коньюнкции
 * @param expression формула для проверки
 * @returns {string} результат
 */
function conjunctionCount(expression){
    let conjunctionOperationsArray = expression.split("|");
    console.log(conjunctionOperationsArray);
    let repeatingArray = [];
    for(let i=0; i<conjunctionOperationsArray.length; i++){
        if (i==0)
            repeatingArray = conjunctionOperationsArray[i].match(/([A-Z]|(![A-Z]))+/g);
        else {
            let equals = 0;
            for (let j = 0; j < repeatingArray.length; j++) {
                if (repeatingArray[j] == conjunctionOperationsArray[i].match(/([A-Z]|(![A-Z]))+/g)[j])
                    equals++;
                else equals--;
            }
            if (equals == repeatingArray.length) {
                return "Выражение не верно"
            }
        }
    }
    return "Выражение верно";
}