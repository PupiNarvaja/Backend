const Product = ({ prod }) => {
    return (
        <div className="m-10">
            <div className="w-64 h-80 mb-4 flex items-center overflow-hidden">
                <img src={prod.img}/>
            </div>
            <p className="text-center archivo">{prod.title}</p>
            <p className="text-center archivo">${prod.price}</p>
        </div>
    )
}

export default Product