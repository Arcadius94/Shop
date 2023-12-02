import { useState } from "react";
import { ProductList } from "../../components/ProductList/ProductList";
import style from "./Products.module.scss";
import { useProductsContext } from "../../context/ProductsProvider";

export const Products = () => {
  const { maxProductPrice, productsCategories } = useProductsContext();
  const [sort, setSort] = useState<"asc" | "desc" | "">("");
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>([]);
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(maxProductPrice);

  const minPriceHandler = (minPriceFromInput: number) => {
    setMinPriceFilter(minPriceFromInput);
    if (minPriceFromInput >= maxPriceFilter) {
      setMaxPriceFilter(minPriceFromInput);
    }
  };
  const maxPriceHandler = (maxPriceFromInput: number) => {
    setMaxPriceFilter(maxPriceFromInput);
    if (maxPriceFromInput <= minPriceFilter) {
      setMinPriceFilter(maxPriceFromInput);
    }
  };

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
          <div className={style.sliderDiv}>
            <label htmlFor="a">{minPriceFilter}</label>
            <input
              name="a"
              max={maxProductPrice}
              onChange={(e) => minPriceHandler(+e.target.value)}
              type="range"
              value={minPriceFilter}
            />
            <input
              name="b"
              max={maxProductPrice}
              className="b"
              onChange={(e) => maxPriceHandler(+e.target.value)}
              type="range"
              value={maxPriceFilter}
            />
            <label className={style.labelb} htmlFor="b">
              {maxPriceFilter}
            </label>
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
          minPrice={minPriceFilter}
          maxPrice={maxPriceFilter}
          sort={sort}
          subCats={selectedSubCats}
        />
      </div>
    </div>
  );
};
