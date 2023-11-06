import { useState } from "react";

import { ProductList } from "../../components/ProductList/ProductList";

import "./Products.scss";
import { useProductsContext } from "../../context/ProductsProvider";

interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  promotion?: boolean;
  discount?: number;
}

export const Products = () => {
  const [maxPrice, setMaxPrice] = useState<any>(1000);
  const [sort, setSort] = useState("");
  const [selectedSubCats, setSelectedSubCats] = useState<any>([]);

  const { products } = useProductsContext();

  const getUniqueCategories = (products: ProductType[]) => {
    const uniqueCategories: string[] = [];

    products.forEach((item) => {
      if (uniqueCategories.indexOf(item.category) === -1) {
        uniqueCategories.push(item.category);
      }
    });

    return uniqueCategories;
  };

  const uniqueCategories = getUniqueCategories(products!);
  const handleChange = (e: any) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item: any) => item !== value)
    );
  };

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {uniqueCategories?.map((category: string) => (
            <div className="inputCategory" key={category}>
              <input
                type="checkbox"
                id={category}
                value={category}
                onChange={handleChange}
              />
              <label>{category}</label>
            </div>
          ))}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              value={maxPrice}
              max={1000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <ProductList
          maxPrice={maxPrice}
          sort={sort}
          subCats={selectedSubCats}
        />
      </div>
    </div>
  );
};

// import { useProductsContext } from "../../context/ProductsProvider";
// import { Link } from "react-router-dom";

// export const Products = () => {
//   const { products } = useProductsContext();
//   return (
//     <div>
//       <h1>Lista Produktów</h1>
//       <ul>
//         {products!.map((product) => (
//           <li key={product.id}>
//             <Link to={`/product/${product.id}`}>{product.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
