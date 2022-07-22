
// funções f(x)
function f(x){
    var fx, funcaoEscolhida = parseInt(document.querySelector('#funcao-escolhida').value)

    if(funcaoEscolhida == 1){
        fx = parseFloat(Math.pow(x,2) - 2)
    }
    else if(funcaoEscolhida == 2){
        fx = parseFloat((2*x) - Math.cos(2*x))
    }   
     // >>>>>>>>>>>>>> colocar função aqui! <<<<<<<<<<<<
    return fx
}


// event listeners -------------------------------------------------
    // acionando função de aproximar
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


    
    // a-> inicio do intervalo / b-> fim do intervalo / e-> precisão / int-> número de interações / r-> referencia 
    var a, b, x0, e, int = 0, r; 

    // lendo os valores da interface.
    a = parseFloat(document.querySelector('#intervalo-a').value)
    b = parseFloat(document.querySelector('#intervalo-b').value)
    e = parseFloat(document.querySelector('#precisao').value)


    // verificando se existem raízes no intervalo (teorema de bolzano).
    if((f(a)*f(b))<0){

        // console
        document.querySelector("#console").innerHTML += `> Verificando que ${f(a)} * ${f(b)} é < 0: <span class='text-success'>verdadeiro</span> <br>`

        // escondendo aviso de raízes não encontradas
        document.querySelector('#aviso').setAttribute('hidden', true) // escondendo aviso 

        // calculando o chute inicial.
        x0 = (a+b)/2; 

        // console
        document.querySelector("#console").innerHTML += `> Novo x0: ${x0} <br>`

        // verificando se f(x0) está maior que o erro desejado.
        while(Math.abs(f(x0))>e){

            //console
            document.querySelector("#console").innerHTML += `> Testando se f(${x0}) = ${Math.abs(f(x0).toFixed(8))} > ${e}: <span class='text-success'>verdade</span> <br>`

            // verificando se a raiz está entre a e x0 com o teorema de bolzano.
            if(f(a)*f(x0)<0){

                // console
                document.querySelector("#console").innerHTML += `> Verificando se ${f(a)} * ${f(x0)} é < 0: <span class='text-success'>verdadeiro</span> <br>`
                
                // caso esteja entre a e x0, b assume o valor de x0.
                b = x0 

                // console
                document.querySelector("#console").innerHTML += `> Novo intervalo: [${a};${b}]<br>`

            }else{
                // console
                document.querySelector("#console").innerHTML += `> Verificando se ${f(a)} * ${f(x0)} é < 0: <span class='text-danger'>falso</span> <br>`
               
                // caso contrário, o 'a' assume o valor de x0.
                a=x0 

                // console
                document.querySelector("#console").innerHTML += `> Novo intervalo: [${a};${b}]<br>`
            }


            // cálculo do novo x0, diminuindo o intervalo.
            x0 = (a+b)/2; 

            // console
            document.querySelector("#console").innerHTML += `> Novo x0: ${x0} <br>`

            // contando o número de interações feitas.
            int +=1; 
        }

        // console
        document.querySelector("#console").innerHTML += `> Testando se f(${x0}) = ${Math.abs(f(x0).toFixed(8))} > ${e}: <span class='text-danger'>falso</span> <br>`
        document.querySelector("#console").innerHTML += `> Raiz encontrada: ${x0} <br>`

        // calculando o drp se a referencia estiver marcada
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


        // mostrando os resultados na interface
        document.querySelector('#r-estrela').innerHTML= x0 
        document.querySelector('#interacoes').innerHTML = int 

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