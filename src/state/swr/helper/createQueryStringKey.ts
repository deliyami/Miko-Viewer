import { CommonFSW } from '@src/types/share/common';

const isNull = (p: any) => {
  return !p && p !== 0;
};

const createFSWQueryString = (query: CommonFSW): string => {
  const { filter, sort, start, end, with: aWith, perPage, page, search } = query;
  const url = new URLSearchParams();
  if (filter) {
    const filterString = filter.reduce((prev, [area, value]) => {
      if (isNull(value)) return prev;
      let next = prev;
      if (prev !== '') next += ',';
      return next + area + ':' + value;
    }, '');
    url.set('filter', filterString);
  }
  if (sort) {
    url.set('sort', sort.join(','));
  }
  if (aWith) {
    url.set('with', aWith.join(','));
  }

  if (start && end) {
    url.set('start', start);
    url.set('end', end);
  }

  if (perPage) {
    url.set('per_page', perPage.toString());
  }

  if (page) {
    url.set('page', page.toString());
  }

  if (search) {
    url.set('search', search);
  }

  return url.toString() + '&';
};

//

export { createFSWQueryString };
