import React, { useState, useEffect } from "react";
import axios from "axios";
import SaleTable from "../components/SaleTable";
import Wrapper from "../components/Wrapper";

export default () => {
  const [sales, setSales] = useState();

  useEffect(() => {
    if (!sales) {
      getSales();
    }
  });

  const getSales = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/sales/?page=1");
      setSales(data);
    } catch (e) {
      console.log(e);
    }
  };

  return sales ? (
    <Wrapper>
      <SaleTable
        setSales={setSales}
        counts={sales.count}
        results={sales.results}
      />
      {console.log(sales)}
    </Wrapper>
  ) : null;
};
