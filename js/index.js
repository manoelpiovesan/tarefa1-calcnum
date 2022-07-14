function f(x){
    var resultado = parseFloat((Math.pow(x,2) - 2))
    return resultado
}



document.querySelector('#btn-limpar').addEventListener('click', e=>{
    Limpar();
})
document.querySelector('#btn-bissecao').addEventListener('click', e=>{
    Bissecao();
})

// exemplo
// x^2 - 2
// a=1, b=2 // precisao(e) = 0.01

function Limpar(){
    document.querySelector('#intervalo-a').value = ''
    document.querySelector('#intervalo-b').value = ''
    document.querySelector('#precisao').value = ''
    document.querySelector('#r-estrela').value = ''
    document.querySelector('#interacoes').value = ''
}


function Bissecao(){
   
    var a, b, x0, e, int;
    // intervalo
    a = parseFloat(document.querySelector('#intervalo-a').value)
    // b = document.querySelector('#intervalo-b').value;
    // // precisao
    // e = document.querySelector('#precisao').value;

    
    b = parseFloat(document.querySelector('#intervalo-b').value)
    e = parseFloat(document.querySelector('#precisao').value)

    int = 0;

    if((f(a)*f(b))<0){
        console.log('Existem raizes neste intervalo.')

        x0 = (a+b)/2;

        while(Math.abs(f(x0))>e){
            if(f(a)*f(x0)<0){
                b = x0
            }else{
                a=x0
            }
            x0 = (a+b)/2;

            int +=1;
        }

        // mostrando os resultados
        console.log('a raiz é: '+x0);
        document.querySelector('#r-estrela').innerHTML= x0
        console.log('foram necessárias '+int+' interações para chegar à raiz.');
        document.querySelector('#interacoes').innerHTML = int


        var coords = [
            {x: x0, y: f(x0)},
        ]

        // montando o grafico
        var myChart = new Chart("myChart", {
            type: "scatter",
            data: {
                labels: ['x0', 'x1', 'x2', 'x3', 'x4'],
                datasets: [{
                    pointRadius: 4,
                    label: 'Dados',
                    pointBackgroundColor: 'red',
                    data: coords
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
        console.log('Não há raizes neste intervalo.')
    }

    

}