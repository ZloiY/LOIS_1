/**
 * Created by ZloiY on 22-Feb-17.
 * (((X&Y)&(!Z))|((X&(!Y))&Z))
 * ((((X&(!Y))&Z)|(((!X)&(!Y))&Z))|((X&(!Y))&(!Z)))
 * (((X&(Y&(Z&W)))|(X&(Y&(Z&(!W)))))|(X&(Y&((!Z)&W))))
 * (((X&(Y&(Z&W)))|(X&(Y&(Z&(!W)))))|(X&(Y&((!Z)&W))))
*/

/**
 * Функция входа.
 */
function startParse(regExp) {
    let regExpStr =  regExp.toString();
    //Проверяем на наличие скобок
    if (regExpStr.match(/\(|\)/g)==null) {
        console.log("No brackets");
        return -1;
    }
    let allBrackets = regExpStr.match(/\(|\)/g);
    //Проверяем на наличие лишних символов
    if (regExpStr.match(/(?!([A-Z]|&|\||\(|\)|!))./g)){
        console.log("Wrong characters");
        return -1;
    }
    //Проверяем на чётность количества скобок
    if (allBrackets.length%2==0) {
        console.log("Brackets number good");
        //Проверяем на наличие дизъюнкции
        if (regExpStr.match(/\)\|\(/g)) {
            console.log(regExpStr);
            let regExpWoutRverseBrackets =regExpStr.replace(/\(![A-Z]\)/g, reverseSymbolReplace);
            console.log(regExpWoutRverseBrackets);
            let regExpWoutBinaryBrackets = deleteBracketsInBrackets(regExpWoutRverseBrackets);
            console.log(regExpWoutBinaryBrackets);
            let almostComplete = delLastBracket(regExpWoutBinaryBrackets);
            let controlReg = delFirstBracket(almostComplete);
            console.log(controlReg);
            console.log(controlReg.match(/\((!?[A-Z])(.+!?[A-Z])+\)\|?/g).join(""));
            if (controlReg.match(/\((!?[A-Z])(.+!?[A-Z])+\)\|?/g).join("") == controlReg){
                console.log("Expression is alright")
            }else{
                console.log("Wrong expression");
                return -1;
            }
        }
        else {
            console.log("No disjunction were found");
            return -1;
        }
    }
    else{ console.log("Brackets number bad");
    return -1;}
}
//Снимаем скобки c операторов с унарной операцией
function reverseSymbolReplace(match, p1, p2, p3) {
    newSymbol=match[1]+match[2];
    return newSymbol;
}
//Удаляем оставшиеся скобки справа
function delLastBracket(regExp) {
    if (regExp.match(/!?[A-Z]\)\)/g)!=null)
      return delLastBracket.call(this,regExp.replace(/!?[A-Z]\)\)/g, delRightBrackets));
    else return regExp;
}
//Удаляем скобки
function delRightBrackets(match, p1, p2) {
    let backToNormal = "";
    for(i=0;i<match.length-1;i++)
    backToNormal += match[i];
    return backToNormal;
}
// Удаляем оставшиеся скобки слева
function delFirstBracket(regExp) {
    if (regExp.match(/(\(!?[A-Z]\)|)?\(\(!?[A-Z]/g)!=null)
        return delFirstBracket.call(this,regExp.replace(/(\(!?[A-Z]\)|)?\(\(!?[A-Z]/g, delLeftBrackets));
    else return regExp;
}
//Удаляем скобки справа
function delLeftBrackets(match, p1, p2) {
    let backToNormal="";
    for(i=1;i<match.length;i++)
        backToNormal+=match[i];
    return backToNormal;
}
//Снимаем скобки с бинарных операторов
function deleteBracketsInBrackets(regExp) {
    if (!regExp.match(/\(([A-Z]|![A-Z])(&[A-Z]|&![A-Z])+\)\|/g)) {
        return deleteBracketsInBrackets.call(this,regExp.replace(/\(([A-Z]|![A-Z])(&[A-Z]|&![A-Z])+\)/g, binaryOperatorBracketsDel));
    }else return regExp;
}
//Снимаем скобки с бинарных операторов
function binaryOperatorBracketsDel(match, p1, p2, p3) {
    newBinaryExpression="";
    for(i=1;i<match.length-1;i++)
        newBinaryExpression+=match[i];
    return newBinaryExpression;
}