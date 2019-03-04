import { useState } from "react";
import { parseQuery } from "tuteria-shared/lib/shared/utils";

export const useSalesHook = location => {
  let { search } = location;
  let { from = "", to = "", q = "", status = "" } = parseQuery(search);
  let [dateFilter, setDateFilter] = useState({ from, to });
  let [searchParam, setSearchParam] = useState(q);
  let [filter, setFilter] = useState(status);
  let [selection, setSelection] = useState("");
  let [loading, setLoading] = useState(false);

  const serverSearch = () => {};
  return {
    state: { dateFilter, searchParam, filter, selection, loading },
    actions: {
      setDateFilter,
      setSearchParam,
      setFilter,
      setSelection,
      serverSearch
    }
  };
};
