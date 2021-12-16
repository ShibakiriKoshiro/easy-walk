// /liteにすると検索機能のみインポート可能
import algoliasearch from 'algoliasearch/lite';
const client = algoliasearch('0KPGNQ6DNQ', '9fa2b2d5d3ab13b7e9bd2bffc74190e2');

export const articleIndex = client.initIndex('articles');
// export const articleIndexAsc = client.initIndex('');
