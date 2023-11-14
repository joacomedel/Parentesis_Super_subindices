const parrafo = document.getElementById('texto');
const textArea = document.getElementById('inputText');
console.log(parrafo);
console.log(textArea);
const procesarFormulario = () => {
    parrafo.innerHTML = formatSupSub(colorOpenChar(setBr(textArea.value), '(', ')'));
    save();
}
//Agrega spam con indice q recibe por parametro para ver q variable del root va a agarrar
const changeColor = (char, intColor) => {
    console.log("entra changeColor");
    const ret = '<spam style= "color:var(--color' + intColor + ')">' + char + '</spam>';
    console.log(ret);
    return ret;
}
// Recorre cada carácter del contenido
const formatSupSub = (string) => {
    let regularExpression = /\^\{(-?\d+)(,-?\d+)?\}/g;
    let result = string.replace(regularExpression, function (match, a, b) {
        let stTemp = "<sup>" + a + "</sup>" + (b !== undefined ? ("<sub>" + b.slice(1) + "</sub>") : "")
        return "<span class='combined'>" + stTemp + "</span>"
    });
    return result;
}
const setBr = (string) => {
    return string.replace(/\//g, '<br>');
}
const colorOpenChar = (text, charOpen, charClose) => {
    let indexColor = -1;
    let newText = "";
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        let colored;
        switch (c) {
            case charOpen:
                indexColor++;
                newText += changeColor(c, indexColor);
                break;
            case charClose:
                newText += changeColor(c, indexColor);
                indexColor--;
                break;
            default:
                newText += c;
                break;
        }
    }
    return newText;
}
const save = () => {
    localStorage.setItem('textoGuardado', textArea.value);
    localStorage.setItem('htmlGuardado', parrafo.innerHTML);
}
window.addEventListener('beforeunload', () => {
    save();
})
document.addEventListener('DOMContentLoaded', () => {
    console.log("asd");
    console.log(localStorage.getItem('textoGuardado'));
    textArea.value = localStorage.getItem('textoGuardado') || "";
    parrafo.innerHTML = localStorage.getItem('htmlGuardado') || "";
})


