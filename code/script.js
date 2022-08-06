const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const btnAgregar = document.querySelector('#btnAgregar')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id 
let LIST 

//fecha
const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday:'long', month:'short', day: 'numeric'})

function agregarTarea(tarea,id,realizado,eliminado){
    if(eliminado){return}
    const Realizado = realizado ?check :uncheck                //operador ternario
    const Line = realizado ?lineThrough :''
    const elemento =    `<li id='elemento'>
                            <i class="far ${Realizado}" data="realizado" id="${id}"></i>
                            <p class="text ${Line}">${tarea}</p>
                            <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                        </li>`
    lista.insertAdjacentHTML("beforeend",elemento)                //mucho mas facil de agregar html en la lista, que con appendchild como en la anterior proyecto
}

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)     //uso parentode y querryselector para agregar el lineThrough
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}

btnAgregar.addEventListener('click', ()=>{
    const tarea = input.value
    if (tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
    }
    localStorage.setItem('todo',JSON.stringify(LIST))
    input.value=''
    id++
})

document.addEventListener('keyup',function(event){
    if(event.key == 'Enter'){
        const tarea = input.value
        if (tarea){
            agregarTarea(tarea,id,false,false)
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
        }
        localStorage.setItem('todo',JSON.stringify(LIST))
        input.value=''
        id++
    }
})

lista.addEventListener('click',function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData ==='realizado'){
        tareaRealizada(element)
    }else if (elementData ==='eliminado'){
        tareaEliminada(element)
    }
    localStorage.setItem('todo',JSON.stringify(LIST))    
})

let data = localStorage.getItem('todo')
if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}

function cargarLista(DATA){
    DATA.forEach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}