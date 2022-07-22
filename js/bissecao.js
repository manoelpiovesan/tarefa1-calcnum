
// função principal! f(x)
function f(x){
    var resultado
    var funcaoEscolhida = parseInt(document.querySelector('#funcao-escolhida').value)


    if(funcaoEscolhida == 1){
        resultado = parseFloat(Math.pow(x,2) - 2)
    }
    else if(funcaoEscolhida == 2){
        resultado = parseFloat((2*x) - Math.cos(2*x))
    }   
     // >>>>>>>>>>>>>> colocar função aqui! <<<<<<<<<<<<
    return resultado
}
// evet listeners
document.querySelector('#btn-limpar').addEventListener('click', e=>{
    Limpar();
})
document.querySelector('#btn-bissecao').addEventListener('click', e=>{
    Bissecao();
})

// ativando caixa de input de referencia
document.querySelector('#referencia-checkbox').addEventListener('change', e=>{
    
    if(document.querySelector('#referencia-checkbox').checked){
        document.querySelector('#referencia-div').removeAttribute('hidden')
    }else{
        document.querySelector('#referencia-div').setAttribute('hidden', true)
    }
})

// mudando a função selecionada no display
document.querySelector('#funcao-escolhida').addEventListener('change', e=>{

    if(parseInt(document.querySelector('#funcao-escolhida').value) == 1){
        document.querySelector('#funcao-display').textContent = 'F(x) = x² - 2'
        

    }else if(parseInt(document.querySelector('#funcao-escolhida').value) == 2){
        document.querySelector('#funcao-display').textContent = 'F(x) = 2x - cos(2x)'
        
    }

})


// função DRP
function Drp(r,rEstrela){
    return Math.abs((r - rEstrela)/rEstrela)*100
}

// função de limpar os campos da interface
function Limpar(){

    document.querySelector('#intervalo-a').value = ''
    document.querySelector('#intervalo-b').value = ''
    document.querySelector('#precisao').value = ''
    document.querySelector('#r-estrela').value = ''
    document.querySelector('#interacoes').value = ''
    document.querySelector('#r').value = ''
    document.querySelector('#aviso').setAttribute('hidden', true) // escondendo aviso 
    document.querySelector('#funcao-display').textContent = ''
    document.querySelector("#console").innerHTML = ``

}

// função de calcular a aproximação
function Bissecao(){

    //console inicio
    document.querySelector("#console").innerHTML = ``
    document.querySelector("#console").innerHTML += `> Iniciando método... <br>`


    

    var a, b, x0, e, int = 0, r; // a-> inicio do intervalo / b-> fim do intervalo / e-> precisão / int-> número de interações / r-> referencia / fr -> f(r)

    // lendo os valores inputados na interface.
    a = parseFloat(document.querySelector('#intervalo-a').value)
    b = parseFloat(document.querySelector('#intervalo-b').value)
    e = parseFloat(document.querySelector('#precisao').value)

    
    


    // verificando que existem raízes no intervalo (teorema de bolzano).
    if((f(a)*f(b))<0){

        document.querySelector("#console").innerHTML += `> Verificando que ${f(a)} * ${f(b)} é < 0: <span class='text-success'>verdadeiro</span> <br>`

        document.querySelector('#aviso').setAttribute('hidden', true) // escondendo aviso 


        console.log('Existem raizes neste intervalo.') 

        x0 = (a+b)/2; // calculando o chute inicial.
        document.querySelector("#console").innerHTML += `> Novo x0: ${x0} <br>`
        // verificando se f(x0) está maior que o erro desejado.
        while(Math.abs(f(x0))>e){

            document.querySelector("#console").innerHTML += `> Testando se f(${x0}) = ${Math.abs(f(x0).toFixed(8))} > ${e}: <span class='text-success'>verdade</span> <br>`

            // verificando se a raiz está entre a e x0 com o teorema de bolzano.
            if(f(a)*f(x0)<0){

                document.querySelector("#console").innerHTML += `> Verificando se ${f(a)} * ${f(x0)} é < 0: <span class='text-success'>verdadeiro</span> <br>`
                
                b = x0 // caso esteja entre a e x0, b assume o valor de x0.

                document.querySelector("#console").innerHTML += `> Novo intervalo: [${a};${b}]<br>`

            }else{
                document.querySelector("#console").innerHTML += `> Verificando se ${f(a)} * ${f(x0)} é < 0: <span class='text-danger'>falso</span> <br>`
                a=x0 // caso contrário, o 'a' assume o valor de x0.
                document.querySelector("#console").innerHTML += `> Novo intervalo: [${a};${b}]<br>`
            }


            
            x0 = (a+b)/2; // cálculo do novo x0, diminuindo o intervalo.
            document.querySelector("#console").innerHTML += `> Novo x0: ${x0} <br>`

            int +=1; // contando o número de interações feitas.
        }

        document.querySelector("#console").innerHTML += `> Testando se f(${x0}) = ${Math.abs(f(x0).toFixed(8))} > ${e}: <span class='text-danger'>falso</span> <br>`
        document.querySelector("#console").innerHTML += `> Raiz encontrada: ${x0} <br>`

        // calculando o drp se a referencia estiver marcada estiver marcado
        if(document.querySelector("#referencia-checkbox").checked){
            r = parseFloat(document.querySelector('#r').value)
            document.querySelector('#drp').innerHTML = Drp(r, x0).toFixed(3) 

            // coordenadas da referência
            var coordsFr = [
                {x: r, y: f(r)},
            ]

        }else{

            document.querySelector('#drp').innerHTML = "<span class='text-danger'> Sem referência</span>"
        }


        // mostrando os resultados
        console.log('a raiz é: '+x0); // mostrando no terminal
        document.querySelector('#r-estrela').innerHTML= x0 // mostrando na interface
        console.log('foram necessárias '+int+' interações para chegar à raiz.'); // mostrando no terminal
        document.querySelector('#interacoes').innerHTML = int // mostrando na interface



        // passando as coordenadas dos pontos para plotar no gráfico.
        var coordsFx = [
            {x: x0, y: f(x0)},
        ]
        



        // montando o grafico com Chart.js
        var myChart = new Chart("myChart", {
            type: "scatter",
            data: {
                datasets: [{
                    pointRadius: 4,
                    label: 'Dados',
                    pointBackgroundColor: '#dc3545',
                    data: coordsFx
                },{
                    pointRadius: 6,
                    label: 'Referência',
                    pointBackgroundColor: 'blue',
                    data: coordsFr
                }
    
            ]
            },
            options: {
                legend: {
                    display: false
                }
            }
          });
    

    }else{

        console.log('Não há raízes neste intervalo.') // avisando que não há raízes no intervalo.
        document.querySelector('#aviso').removeAttribute('hidden') // aviso na interface
    
    }

    

}