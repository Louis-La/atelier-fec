import React, { useState, createContext} from 'react';

export const ProductStateContext = createContext();

export const ProductMainStateProvider = (props) => {
  const productId = useState(props.productId);

  return (

    <ProductStateContext.Provider
      value={{ productId }}>
      {props.children}
    </ProductStateContext.Provider>
  );
};