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

function dfdx(x){
    var resultadoDfdx 
    var funcaoEscolhida = parseInt(document.querySelector('#funcao-escolhida').value)


    // >>>>>>>>>>>>>> colocar a derivada da função aqui! <<<<<<<<<<<<
    if(funcaoEscolhida == 1){
        resultadoDfdx = parseFloat(2 * x)
        
    }
    else if(funcaoEscolhida == 2){
        resultadoDfdx = parseFloat(2 + (2 * Math.sin(2*x))) // fx --> 2x - cos 2x
    }   
    
   
    return resultadoDfdx
}

// eventListeners
document.querySelector('#btn-newton').addEventListener('click', e=>{
    newtonRaphson()
})

document.querySelector('#btn-limpar').addEventListener('click', e=>{
    Limpar()
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
        document.querySelector('#derivada-display').textContent = "F'(x) = 2x"

    }else if(parseInt(document.querySelector('#funcao-escolhida').value) == 2){
        document.querySelector('#funcao-display').textContent = 'F(x) = 2x - cos(2x)'
        document.querySelector('#derivada-display').textContent = "F'(x) = 2 + 2sen(2x)"
    }

})


// funcao limpar

function Limpar(){
    
    document.querySelector('#x0').value = ''
    document.querySelector('#e').value = ''
    document.querySelector('#r-estrela').value = ''
    document.querySelector('#interacoes').value = ''
    document.querySelector('#r').value = ''
    document.querySelector('#funcao-display').textContent = ''
    document.querySelector('#derivada-display').textContent = ''
    document.querySelector("#console").innerHTML = ``
}

// funcao Drp
function Drp(r,rEstrela){
    return Math.abs((r - rEstrela)/rEstrela)*100
}

// função de aproximação
function newtonRaphson(){
    document.querySelector("#console").innerHTML = ``
    document.querySelector("#console").innerHTML += `> Iniciando método... <br>`

    var x0, e, cont=0;

    //lendo os inputs da interface
    x0 = document.querySelector('#x0').value
    e = document.querySelector('#e').value

    while(Math.abs(f(x0))>e){

        // console
        document.querySelector("#console").innerHTML += `> Testando se f(${x0}) = ${Math.abs(f(x0).toFixed(8))} > ${e}: <span class='text-success'>verdade</span> <br>`
        document.querySelector("#console").innerHTML += `> Continuando para próxima interação... <br>`


        x0 = (x0 - (f(x0)/dfdx(x0)))
        
        // console
        document.querySelector("#console").innerHTML += `> Novo valor de x0: ${x0} <br>`
        

        cont += 1
    }

    // console
    document.querySelector("#console").innerHTML += `> Testando se f(${x0}) = ${Math.abs(f(x0).toFixed(8))} > ${e}: <span class='text-danger'>falso</span> <br>`
    document.querySelector("#console").innerHTML += `> Raiz encontrada: ${x0} <br>`

    if(document.querySelector('#referencia-checkbox').checked){
        var r = document.querySelector('#r').value
        document.querySelector('#drp').innerHTML = Drp(x0, r).toFixed(3)
        var coordsFr = [
            {x: r, y: f(r)},
        ]
    }else{
        document.querySelector('#drp').innerHTML = "<span class='text-danger'> Sem referência</span>"
    }

    document.querySelector('#r-estrela').innerHTML = x0
    document.querySelector('#interacoes').innerHTML = cont

    var coordsFx = [
        {x: x0, y: f(x0)},
    ]

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


}