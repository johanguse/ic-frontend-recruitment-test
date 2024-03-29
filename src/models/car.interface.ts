export interface BidsObject {
  amount: number; // Integer representing bid amount
  dealership: string; // String representing dealer that made the offer
  createdAt: string; // ISODate representing the date of the request
  channel: string; // Either ‘Web’ or ‘Mobile’
}
export interface CarType {
  id: string; // Unique identifier of the car.,
  make: string; // Make of the car
  model: string; // Model of the car
  year: number; // Year of the car
  version: string; // Version of the car
  km: number; // Car kilometers
  remaing_time: number; // Number of remaining milliseconds remaining in the auction.
  image_url: string; // Car Image url
  bids?: BidsObject; //: An array of the current bids in the car
}
