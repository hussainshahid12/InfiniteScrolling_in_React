import React, { useEffect, useState } from "react";

const Tic = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const get = async (p) => {
    if (!hasMore) return; //
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=8&skip=${page}`
      );
      const result = await response.json();
      console.log(result)
      if (result.products.length > 0) {
        setData((prevData) => [...prevData, ...result.products]);
      } else {
        setHasMore(false); 
      }
    } catch (err) {
      console.log("Error fetching data:", err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    console.log('page')
    get(page); 
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      hasMore &&
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 8);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []); 

  return (
    <div className="container mt-5">
      <div className="row">
        {data.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100 d-flex flex-column">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="card-img-top img-fluid"
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.title}</h5>
                <p>Price: {product.price}</p>
                <p>ID: {product.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="text-center">
          <div
            className="spinner-border text-danger"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!hasMore && <h5 className="text-center">All products are loaded!</h5>}
    </div>
  );
};

export default Tic;
