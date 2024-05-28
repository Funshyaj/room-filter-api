# Room Filter Api

This is a submission for a take home test

- Hosted with render at [https://room-filter-api.onrender.com/api/](https://room-filter-api.onrender.com/api/)
- Local host at `http://localhost:4000/api/`

## Installation

```bash
$ npm install
```

## Run Locally

Clone the project

Install dependencies

```bash
  npm install
```

Create a `.env` file and add the your localhost postgress database name and password
`DATABASE: ''
LOCAL_PASSWORD: ''`

Start the server

```bash
  npm run start
```

or

Start the server in watch mode

```bash
  npm run start:dev
```

<!-- ## Run Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

``` -->

## API Reference

#### Get all rooms

```http
  GET /api/rooms
```

#### Paginate rooms

```http
  GET /api/rooms?page=1&limit=5
```

#### Sort rooms

```http
  GET /api/rooms?sort=[{feild:"feild-to-sort-by", order:"ASC or DESC"}]
```

#### filter rooms

```http
  GET /api/rooms?filter=[{"field":"userId","value":1,"operator":"equals"}]
```

### Get room by Id

```http
  GET /api/items/${id}
```

## Filter Utility module

#### How to use

Import filter utility in a service and call the needed functions on

- FilterUtil.paginate()
  This is a utility function that paginates results from a query, it takes three parameters and returns the paginated query builder

1. qb: SelectQueryBuilder
2. page: number
3. limit: number

- FilterUtil.sortBy()
  This is a utility function that sorts the given table in ascending or descending order, it takes three parameters and returns a sorted QueryBuilder

1. qb: SelectQueryBuilder
2. sort: Sort[],
3. tableName: string

- FilterUtil.filter()
  This is a utility function that filter the given table based on filter operators such as: 'gt (greater than)', 'lt (less than) and more. It takes three parameters and returns a filtered queryBulder

1. qb: SelectQueryBuilder<any>
2. filters: Filter[]
3. tableName: string

## License

Nest is [MIT licensed](LICENSE).
