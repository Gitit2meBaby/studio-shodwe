
export function Products({
  products
}) {
  return <div>
    <h1>Fake E-Commerce Website</h1>
    {products.map(product => <div key={product.id}>
      <p>{product.category}</p>
      <h3 key={product.id}>{product.title}</h3>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>)}
  </div>;
}
