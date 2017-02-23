/**
 * Created by ZloiY on 22-Feb-17.
 * (((X&Y)&(!Z))|((X&(!Y))&Z))
 * ((((X&(!Y))&Z)|(((!X)&(!Y))&Z))|((X&(!Y))&(!Z)))
*/
function startParse(regExp) {
    let regExpStr =  regExp.toString();
    let allBrackets = regExpStr.match(/\(|\)/g);
    if (allBrackets.length%2==0) {
        console.log("Brackets number good");
        let disjunctionNum = regExpStr.match(/\)\|\(/g);
        if (disjunctionNum.length !=0) {
            console.log("Disjunction number is " + disjunctionNum.length);
            console.log(regExpStr);
            let regExpWoutRverseBrackets =regExpStr.replace(/\(![A-Z]\)/g, reverseSymbolReplace);
            console.log(regExpWoutRverseBrackets);
            let regExpWoutBinaryBrackets = regExpWoutRverseBrackets.replace(/\(([A-Z]|![A-Z])&([A-Z]|![A-Z])\)/g, binaryOperatorBracketsDel);
            console.log(regExpWoutBinaryBrackets);
            let almostComplete = findTheLastSkobenchik(regExpWoutBinaryBrackets);
            console.log(findTheFirstSkobenchik(almostComplete));
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

function binaryOperatorBracketsDel(match, p1, p2, p3) {
   newBinaryExpression=p1+"&"+p2;
   return newBinaryExpression;
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