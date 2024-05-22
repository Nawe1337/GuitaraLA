import { useState, useEffect } from "react"
import { Header } from "./Header"
import { Guitar } from "./Guitar"
import { db } from "../data/db"


export const Guitarra = () => {

const carritoInicial = () => {

const localStorageCart =   localStorage.getItem("cart")
return localStorageCart ? JSON.parse(localStorageCart) : []
}

const [data] = useState(db);
const [cart,setCart] = useState(carritoInicial);

const maxItem = 5;

// useEfect para localStore y que los datos no se pierdan los datos.
useEffect(()=> {localStorage.setItem("cart",JSON.stringify(cart))},[cart])

const addToCart = (item)=>{
  //findIndex retorna -1 si el elemento no existe
  //retorna la posicion del objeto en el array si ya existe
const itemExist = cart.findIndex((guitar) => guitar.id === item.id)

if (itemExist >= 0) {
  if (cart[itemExist].quantity >= maxItem ) return
  //hacemos el codigo inmutable con updateCart
  const updateCart = [...cart];
  updateCart[itemExist].quantity++;
  setCart(updateCart);
}
else{
console.log("agregando");
item.quantity = 1;
  setCart([...cart,item])
}

}

// filtra todos los objetos que no tienen ese id y lo seteamos en setCart
const removeFromCart = (id) =>{
setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
}

// vaciando mi carritos de compra
const removeTodo = ()=>{
setCart([])
}

//Incrementamos la cantidad
const incrementar = (id) =>{
  const increment = cart.map(item =>{
if (item.id === id && item.quantity < maxItem){
  return{
...item,
quantity: item.quantity+1
  }
}
return item
})
setCart(increment)
}


//Decrementamos la cantidad 
const decrementar = (id) =>{
  const decrement = cart.map(item =>{
if (item.id === id && item.quantity>= 2 ){
  
  return{
...item,
quantity: item.quantity-1
  }
}
return item
})
setCart(decrement)
}


return (
<>
<Header cart ={cart}
removeFromCart={removeFromCart}
removeTodo= {removeTodo}
incrementar={incrementar}
decrementar={decrementar}/>

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {/* el guit dentro de map se utiliza para acceder a los datos
          que se encuentran dentro de data*/}
          {data.map((guit)=> {
            return(
        <Guitar 
      key={guit.id}
      guit={guit} 
      setCart={setCart}
      addToCart={addToCart}/>
       )
          })}
          
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>


</>
  )
}
