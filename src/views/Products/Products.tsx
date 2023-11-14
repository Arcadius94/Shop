import { useState } from "react";
import { ProductList } from "../../components/ProductList/ProductList";
import style from "./Products.module.scss";
import { useProductsContext } from "../../context/ProductsProvider";
import { ProductType } from "../../context/ProductsProviderTypes";

export const Products = () => {
  const [sort, setSort] = useState<"asc" | "desc" | "">("");
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>([]);
  const { maxProductPrice, productsCategories } = useProductsContext();
  const [maxPriceFilter, setMaxPriceFilter] = useState(maxProductPrice);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  return (
    <div className={style.products}>
      <div className={style.left}>
        <div className={style.filterItem}>
          <h2>Product Categories</h2>
          {productsCategories?.map((category: string) => (
            <div className={style.inputCategory} key={category}>
              <label>
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  onChange={handleChange}
                />
                {category}
              </label>
            </div>
          ))}
        </div>
        <div className={style.filterItem}>
          <h2>Filter by price</h2>
          <div className={style.inputItem}>
            <span>0</span>
            <input
              type="range"
              min={0}
              value={maxPriceFilter}
              max={maxProductPrice}
              onChange={(e) => setMaxPriceFilter(+e.target.value)}
            />
            <span>{maxPriceFilter}</span>
          </div>
        </div>
        <div className={style.filterItem}>
          <h2>Sort by</h2>
          <div className={style.inputItem}>
            <label>
              <input
                type="radio"
                name="price"
                onChange={() => setSort("asc")}
              />
              Price (Lowest first)
            </label>
          </div>
          <div className={style.inputItem}>
            <label>
              <input
                type="radio"
                name="price"
                onChange={() => setSort("desc")}
              />
              Price (Highest first)
            </label>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <ProductList
          maxPrice={maxPriceFilter}
          sort={sort}
          subCats={selectedSubCats}
        />
      </div>
    </div>
  );
};
