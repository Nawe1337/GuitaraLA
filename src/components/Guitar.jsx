export const Guitar = ({guit,addToCart}) => {


// una forma para agregar objetos al carrito
// agregando cart como props

   /* const handleClick = (guit) => {
        setCart([...cart,guit])
    }
    */


  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${guit.image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{guit.name} </h3>
                    <p>{guit.description}</p>
                    <p className="fw-black text-primary fs-3">${guit.price}</p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={() => addToCart(guit)}
                    >Agregar al Carrito</button>
                </div>
            </div>
  )
}
