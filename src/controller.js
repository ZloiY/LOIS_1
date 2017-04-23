/**
 * (((X&Y)&(!Z))|((X&(!Y))&Z))
 * ((((X&(!Y))&Z)|(((!X)&(!Y))&Z))|((X&(!Y))&(!Z)))
 * (((X&(Y&(Z&W)))|(X&(Y&(Z&(!W)))))|(X&(Y&((!Z)&W))))
 * (((X&(Y&(Z&W)))|(X&(Y&(Z&(!W)))))|(X&(Y&((!Z)&W))))
 * (((X&(Y&(Z&W)))|((X&Y)&(Z&W)))|(X&(Y&((!Z)&W))))
 * (((X&(Y&(Z&W)))|((X&Y&(Z&(!W)))))|(X&(Y&((!Z)&W))))
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
        console.log("Brackets number good");
        //Проверяем на наличие дизъюнкции
        if (startExpression.match(/\)\|\(/g)) {
            console.log(startExpression);
            //Ищем унарные операции
            let expression = startExpression.replace(/\(![A-Z]\)/g, "1");
            //Ищем бинарные операции
            let finalExpression = disjunctiveReplace(conjunctionReplace(expression));
            if (finalExpression == "1") {
               pcnfTree(startExpression);
            } else {
                console.log("Неправильное выражение")
                return "Неправильное выражение";
            }
        }
        else {
            console.log("Дизъюнкций не было найдено");
            return "Дизъюнкций не было найдено";
        }
    }
    else {
        console.log("Brackets number bad");
        return "Brackets number bad";
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
 * Проверяем на корректность коньюнкцию
 * @param expression формула для проверки
 * @returns {string} результат
 */
function pcnfTree(expression){
    let disjunctiveOperationsNum = expression.split("|").length;
    let modExpression = expression.substr(disjunctiveOperationsNum, expression.length);
    console.log(modExpression);
    let conjunctionOperationsArray = modExpression.split("|");
    for(i=0; i<conjunctionOperationsArray.length; i++){
        if (conjunctionOperationsArray[0].match(/(\(([A-Z]|(\(![A-Z]\)))(&[A-Z]|(\(&![A-Z]\)))\))+/g).length > 1) {
            console.log("Выражение не верно");
            return "Выражение не верно";
        }
    }
    return "Выражение верно"
}