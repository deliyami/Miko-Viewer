import { CommonFSW } from "@src/types/share/common/common";

const createFSWQueryString = (query: CommonFSW): string => {
  const { filter, sort, start, end, with: aWith, per_page, page, search } = query;
  const url = new URLSearchParams();
  if (filter) {
    let filterString = "";
    for (const [area, value] of filter) {
      filterString += area + ":" + value;
    }
    url.set("filter", filterString);
  }
  if (sort) {
    url.set("sort", sort.join(","));
  }
  if (aWith) {
    url.set("with", aWith.join(","));
  }

  if (start && end) {
    url.set("start", start);
    url.set("end", end);
  }

  if (per_page) {
    url.set("per_page", per_page.toString());
  }

  if (page) {
    url.set("page", page.toString());
  }

  if (search) {
    url.set("search", search);
  }

  return url.toString() + "&";
};

//

export { createFSWQueryString };
