/**
 * Created by ZloiY on 22-Feb-17.
 * (((X&Y)&(!Z))|((X&(!Y))&Z))
 * ((((X&(!Y))&Z)|(((!X)&(!Y))&Z))|((X&(!Y))&(!Z)))
 * (((X&(Y&(Z&W)))|(X&(Y&(Z&(!W)))))|(X&(Y&((!Z)&W))))
 * (((x&(Y&(Z&W)))|(X&(Y&(z&(!W)))))|(X&(Y&((!Z)&w))))
*/
function startParse(regExp) {
    let regExpStr =  regExp.toString();
    if (regExpStr.match(/\(|\)/g)==null) {
        console.log("No brakets");
        return -1;
    }
    if (regExp.match(/[a-z]/g)){
        console.log("Small letters");
        return -1;
    }
    let allBrackets = regExpStr.match(/\(|\)/g);
    if (allBrackets.length%2==0) {
        console.log("Brackets number good");
        if (regExpStr.match(/\)\|\(/g)) {
            console.log(regExpStr);
            let regExpWoutRverseBrackets =regExpStr.replace(/\(![A-Z]\)/g, reverseSymbolReplace);
            console.log(regExpWoutRverseBrackets);
            let regExpWoutBinaryBrackets = deleteSkobenchikiInSkobenchiki(regExpWoutRverseBrackets);
            console.log(regExpWoutBinaryBrackets);
            let almostComplete = findTheLastSkobenchik(regExpWoutBinaryBrackets);
            let controlReg = findTheFirstSkobenchik(almostComplete);
            console.log(controlReg);
            console.log(controlReg.match(/(!?[A-Z])(.+!?[A-Z])+\)\|?/g));
            if (controlReg.match(/\((!?[A-Z])(.+!?[A-Z])+\)\|?/g) == controlReg){
                if (controlReg.match(/(!?[A-Z])((->|\|)!?[A-Z])+/g)) {
                    console.log("Wrong binary operation in brackets");
                    return -1;
                }else console.log("Expression is alright")
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

function reverseSymbolReplace(match, p1, p2, p3) {
    newSymbol=match[1]+match[2];
    return newSymbol;
}

function findTheLastSkobenchik(regExp) {
    if (regExp.match(/[A-Z]\)\)/g)!=null)
      return findTheLastSkobenchik.call(this,regExp.replace(/[A-Z]\)\)/g, lastReplaceProtocol));
    else return regExp;
}

function lastReplaceProtocol(match, p1, p2) {
    let backToNormal = "";
    for(i=0;i<match.length-1;i++)
    backToNormal += match[i];
    return backToNormal;
}

function findTheFirstSkobenchik(regExp) {
    if (regExp.match(/\(\([A-Z]/g)!=null)
        return findTheFirstSkobenchik.call(this,regExp.replace(/\(\([A-Z]/g, firstReplaceProtocol));
    else return regExp;
}

function firstReplaceProtocol(match, p1, p2) {
    let backToNormal="";
    for(i=1;i<match.length;i++)
        backToNormal+=match[i];
    return backToNormal;
}

function deleteSkobenchikiInSkobenchiki(regExp) {
    if (!regExp.match(/\(([A-Z]|![A-Z])(&[A-Z]|&![A-Z])+\)\|/g)) {
        return deleteSkobenchikiInSkobenchiki.call(this,regExp.replace(/\(([A-Z]|![A-Z])(&[A-Z]|&![A-Z])+\)/g, binaryOperatorBracketsDel));
    }else return regExp;
}

function binaryOperatorBracketsDel(match, p1, p2, p3) {
    newBinaryExpression="";
    for(i=1;i<match.length-1;i++)
        newBinaryExpression+=match[i];
    return newBinaryExpression;
}