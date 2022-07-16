function f(x){
    var resultado = parseFloat(Math.pow(x,2) - 2) // >>>>>>>>>>>>>> colocar função aqui! <<<<<<<<<<<<
    return resultado
}

function dfdx(x){
    var resultadoDfdx = parseFloat(2 * x) // >>>>>>>>>>>>>> colocar a derivada da função aqui! <<<<<<<<<<<<
    return resultadoDfdx
}

// eventListeners
document.querySelector('#btn-newton').addEventListener('click', e=>{
    newtonRaphson()
})

document.querySelector('#referencia-checkbox').addEventListener('change', e=>{
    
    if(document.querySelector('#referencia-checkbox').checked){
        document.querySelector('#referencia-div').removeAttribute('hidden')
    }else{
        document.querySelector('#referencia-div').setAttribute('hidden', true)
    }
})
// funcao limpar

function Limpar(){
    document.querySelector('#x0').value = ''
    document.querySelector('#e').value = ''
    document.querySelector('#r-estrela').value = ''
    document.querySelector('#interacoes').value = ''
    document.querySelector('#r').value = ''
}

// funcao Drp
function Drp(r,rEstrela){
    return Math.abs((r - rEstrela)/rEstrela)*100
}

// função de aproximação
function newtonRaphson(){
    
    var x0, e, cont=0;

    //lendo os inputs da interface
    x0 = document.querySelector('#x0').value
    e = document.querySelector('#e').value

    while(Math.abs(f(x0))>e){

        x0 = (x0 - (f(x0)/dfdx(x0)))
        
        cont += 1
    }

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