import { getTreeWithFileContents, type Page } from './pages';
import FlexSearch from 'flexsearch';
import { flattenPages } from './utils';

let pages: Page[];
let pagesIndex: FlexSearch.Index;

/**
 * Creates an index of page.
 *
 * @returns {void}
 */
export function createPagesIndex() {
  const tree = getTreeWithFileContents();
  const flattenedPages = flattenPages(tree);

  // create the pages index
  pagesIndex = new FlexSearch.Index({ tokenize: 'forward' });

  flattenedPages.forEach((page, i) => {
    // index the title and content together
    const item = `${page.name} ${page.description} ${page.component}`;
    // add the item to the index 👍️
    pagesIndex.add(i, item);
  });

  pages = flattenedPages;
}

export function searchPagesIndex(searchTerm: string): Page[] {
  // escape special regex characters
  const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // return matching page indexes 💪
  const results = pagesIndex.search(match);

  return (
    results
      // filter the pages based on the matched index
      .map((index: number) => pages[index as number])
      // you can do whatever you want at this point 👌
      .map(({ name, description, component, ...restProps }: Page) => {
        return {
          // replace match in title with a marker
          name: replaceTextWithMarker(name, match),
          // match words in page and replace matches with marker
          description: getMatches(description, match),
          component: getMatches(component, match),
          ...restProps
        };
      })
  );
}

function getMatches(text: string, searchTerm: string, limit: number = 1): string[] {
  if (!text) return [];
  // create dynamic regex 😎
  const regex = new RegExp(searchTerm, 'gi');
  // word indexes
  const indexes: number[] = [];
  // matches count
  let matches: number = 0;
  // current match in loop
  let match;

  while ((match = regex.exec(text)) !== null && matches < limit) {
    // push that shit
    indexes.push(match.index);
    // increment matches
    matches++;
  }

  // take the word index...
  return indexes.map((index) => {
    // go back 20 characters
    const start = index - 20;
    // go forward 80 characters
    const end = index + 50;
    // yoink the text
    const excerpt = text.slice(start, end).trim();
    if (!excerpt) return '';
    return `...${replaceTextWithMarker(excerpt, searchTerm)}...`;
  });
}

function replaceTextWithMarker(text: string, match: string): string {
  // create dynamic regex 😎
  const regex = new RegExp(match, 'gi');
  // preserves the text casing 🤙
  return text.replaceAll(regex, (match) => `<mark>${match}</mark>`);
}
