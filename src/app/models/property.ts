export interface Property {
    id: number;
    name: string;
    location: string;
    price: number;
    history?: number[];  // Historical price data
    news?: string[];     // News articles
  }
  /*
forkjoin
{
property:      {
    "id": 1,
    "name": "Ocean View Condo",
    "location": "Miami Beach, FL",
    "price": 350000
  },
history: [3535,46,67477],
news: [" dfdsffs","dfsdfsfsdf"]
}
---> Pipee-> {property,history,new} -> {
  id: 1,
  name: "....",
  location: "-----------------------------",
  price: "-------------------------------",
  history: [....................],
  news: [.......................................]
}*/