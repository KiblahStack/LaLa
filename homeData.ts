export type Banner = {
  id: string;
  headingLead: string;
  headingAccent: string;
  headingTail: string;
  description: string;
  image: string;
};

export type Listing = {
  id: string;
  title: string;
  type: string;
  town: string;
  suburb: string;
  rent: number;
  deposit: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  status: 'Available' | 'Occupied';
  featured?: boolean;
  description: string;
  images: string[];
  landlordId: string;
  landlordName: string;
  landlordWhatsapp: string;
  postedAt: string;
};

export type RentalRequest = {
  id: string;
  propertyType: string;
  budget: number;
  town: string;
  area: string;
  moveDate: string;
  description: string;
  tenantName: string;
  tenantWhatsapp: string;
  featured?: boolean;
};

export type ConnectPackage = {
  id: string;
  name: string;
  price: number;
  requests: string;
  connections: number;
  validDays: number;
  perks: string[];
  popular?: boolean;
};

const IMG = {
  interior: "/a72c03fb-83a2-4437-bb30-f638accc4391.jpg",

  house: "/96431970-b1d4-4f05-8044-0f7744c025d2.jpg",

  kitchen: "/ee0a1848-774f-4593-8fb0-fe8e87cba571.jpg",

  flat: "/2e7e65af-d815-47a7-bd11-9dddfde3ea73.jpg",
  lounge: "/6b5b1eda-085c-4bc5-a237-c121c4f38d38.jpg"

};

export const banners: Banner[] = [
{
  id: 'b1',
  headingLead: 'Find your next',
  headingAccent: 'home',
  headingTail: 'in Namibia.',
  description:
  'The simple way to find rental accommodation or connect with tenants.',
  image: IMG.lounge
},
{
  id: 'b2',
  headingLead: 'List your place.',
  headingAccent: 'Free',
  headingTail: 'forever.',
  description:
  'Landlords advertise unlimited rentals at no cost and connect on WhatsApp.',
  image: IMG.flat
},
{
  id: 'b3',
  headingLead: 'Let landlords',
  headingAccent: 'find you',
  headingTail: 'first.',
  description:
  'Post what you are looking for and get matched with the right rental.',
  image: IMG.interior
}];


export const propertyTypes = [
'All Types',
'Apartment',
'House',
'Bachelor Flat',
'Townhouse',
'Room / Shared'];


export const towns = [
'All Areas',
'Windhoek',
'Swakopmund',
'Walvis Bay',
'Oshakati',
'Rundu'];


export const suburbsByTown: Record<string, string[]> = {
  Windhoek: [
  'Kleine Kuppe',
  'Olympia',
  'Eros',
  'Ave Maria',
  'Windhoek North',
  'Pioneers Park',
  'Khomasdal'],

  Swakopmund: ['Vineta', 'Kramersdorf', 'Ocean View'],
  'Walvis Bay': ['Meersig', 'Lagoon', 'Narraville'],
  Oshakati: ['Uupindi', 'Evululuko'],
  Rundu: ['Kaisosi', 'Sauyemwa']
};

export const priceOptions = [
'Any Price',
'Up to N$ 3,000',
'Up to N$ 5,000',
'Up to N$ 8,000',
'Up to N$ 12,000',
'N$ 12,000+'];


export const priceCeilings: Record<string, number> = {
  'Any Price': Infinity,
  'Up to N$ 3,000': 3000,
  'Up to N$ 5,000': 5000,
  'Up to N$ 8,000': 8000,
  'Up to N$ 12,000': 12000,
  'N$ 12,000+': Infinity
};

export const bedroomOptions = ['Any', '1', '2', '3', '4+'];
export const availabilityOptions = ['All', 'Available', 'Occupied'];

export const listings: Listing[] = [
{
  id: 'p1',
  title: '2 Bedroom Apartment',
  type: 'Apartment',
  town: 'Windhoek',
  suburb: 'Kleine Kuppe',
  rent: 7500,
  deposit: 7500,
  bedrooms: 2,
  bathrooms: 1,
  parking: 1,
  status: 'Available',
  description:
  'Bright, modern two bedroom apartment in a secure complex in Kleine Kuppe. Open-plan lounge and kitchen, built-in cupboards, prepaid electricity and one covered parking bay. Walking distance to shops and schools. Water included in the rent.',
  images: [IMG.interior, IMG.kitchen, IMG.flat],
  landlordId: 'l1',
  landlordName: 'Maria Shipanga',
  landlordWhatsapp: '+264 81 234 5678',
  postedAt: '2 days ago'
},
{
  id: 'p2',
  title: '3 Bedroom House',
  type: 'House',
  town: 'Windhoek',
  suburb: 'Olympia',
  rent: 9000,
  deposit: 9000,
  bedrooms: 3,
  bathrooms: 2,
  parking: 2,
  status: 'Available',
  featured: true,
  description:
  'Spacious family home in Olympia with a private garden, double carport and separate domestic quarters. Two bathrooms, fitted kitchen with scullery, and a paved braai area. Pets negotiable.',
  images: [IMG.house, IMG.lounge, IMG.kitchen],
  landlordId: 'l2',
  landlordName: 'Johan Beukes',
  landlordWhatsapp: '+264 85 987 6543',
  postedAt: '4 days ago'
},
{
  id: 'p3',
  title: 'Bachelor Flat',
  type: 'Bachelor Flat',
  town: 'Windhoek',
  suburb: 'Eros',
  rent: 4000,
  deposit: 4000,
  bedrooms: 1,
  bathrooms: 1,
  parking: 1,
  status: 'Available',
  description:
  'Neat bachelor flat on a quiet Eros property with its own entrance. Kitchenette with cupboards, shower room, and secure off-street parking. Ideal for a single professional or student. Water and electricity prepaid.',
  images: [IMG.kitchen, IMG.interior],
  landlordId: 'l3',
  landlordName: 'Elize Kambanda',
  landlordWhatsapp: '+264 81 555 1122',
  postedAt: '1 week ago'
},
{
  id: 'p4',
  title: '2 Bedroom Flat',
  type: 'Apartment',
  town: 'Windhoek',
  suburb: 'Ave Maria',
  rent: 6500,
  deposit: 6500,
  bedrooms: 2,
  bathrooms: 1,
  parking: 1,
  status: 'Available',
  description:
  'Well-maintained flat in a small block of six units. Tiled throughout, burglar bars, and a shared laundry courtyard. Close to public transport routes into town.',
  images: [IMG.flat, IMG.interior],
  landlordId: 'l4',
  landlordName: 'Tangeni Amutenya',
  landlordWhatsapp: '+264 81 777 3344',
  postedAt: '1 week ago'
},
{
  id: 'p5',
  title: '3 Bedroom Townhouse',
  type: 'Townhouse',
  town: 'Swakopmund',
  suburb: 'Vineta',
  rent: 11000,
  deposit: 11000,
  bedrooms: 3,
  bathrooms: 2,
  parking: 2,
  status: 'Occupied',
  description:
  'Coastal townhouse two blocks from the beach in Vineta. Three bedrooms with sea-facing main bedroom, enclosed patio and double garage. Currently occupied — available from September.',
  images: [IMG.house, IMG.flat],
  landlordId: 'l5',
  landlordName: 'Petrus Louw',
  landlordWhatsapp: '+264 81 909 8877',
  postedAt: '2 weeks ago'
},
{
  id: 'p6',
  title: 'Room / Shared House',
  type: 'Room / Shared',
  town: 'Windhoek',
  suburb: 'Windhoek North',
  rent: 2500,
  deposit: 2500,
  bedrooms: 1,
  bathrooms: 1,
  parking: 1,
  status: 'Available',
  description:
  'Furnished room in a shared house in Windhoek North. Shared kitchen, bathroom and lounge with two other tenants. Wi-Fi and water included. Female tenants preferred.',
  images: [IMG.interior, IMG.kitchen],
  landlordId: 'l6',
  landlordName: 'Selma Nangolo',
  landlordWhatsapp: '+264 85 221 4455',
  postedAt: '3 days ago'
},
{
  id: 'p7',
  title: '4 Bedroom Family House',
  type: 'House',
  town: 'Windhoek',
  suburb: 'Pioneers Park',
  rent: 15500,
  deposit: 15500,
  bedrooms: 4,
  bathrooms: 3,
  parking: 2,
  status: 'Available',
  featured: true,
  description:
  'Large family home in Pioneers Park with swimming pool, borehole, and staff accommodation. Four bedrooms, three bathrooms, study and double garage. Long lease preferred.',
  images: [IMG.house, IMG.lounge, IMG.interior],
  landlordId: 'l7',
  landlordName: 'Anna-Marie Diergaardt',
  landlordWhatsapp: '+264 81 660 2299',
  postedAt: '5 days ago'
},
{
  id: 'p8',
  title: '1 Bedroom Apartment',
  type: 'Apartment',
  town: 'Walvis Bay',
  suburb: 'Meersig',
  rent: 5800,
  deposit: 5800,
  bedrooms: 1,
  bathrooms: 1,
  parking: 1,
  status: 'Available',
  description:
  'Modern one bedroom apartment in Meersig with lagoon views from the balcony. Secure complex with electric fence and remote gate. Fitted kitchen with oven and hob.',
  images: [IMG.flat, IMG.kitchen],
  landlordId: 'l8',
  landlordName: 'Ruben Hoveka',
  landlordWhatsapp: '+264 81 330 7766',
  postedAt: '6 days ago'
}];


export const featuredListings: Listing[] = listings.slice(0, 5);

export const rentalRequests: RentalRequest[] = [
{
  id: 'r1',
  propertyType: 'Bachelor / Flat',
  budget: 4000,
  town: 'Windhoek',
  area: 'Any Area',
  moveDate: '01 Jun 2025',
  description:
  'Single working professional looking for a neat bachelor flat anywhere in Windhoek. Quiet, non-smoker, no pets. Can move in immediately and pay deposit upfront.',
  tenantName: 'Lukas M.',
  tenantWhatsapp: '+264 81 402 1188'
},
{
  id: 'r2',
  propertyType: '2 Bedroom Apartment',
  budget: 8000,
  town: 'Windhoek',
  area: 'Kleine Kuppe',
  moveDate: '15 Jun 2025',
  description:
  'Young family of three looking for a two bedroom apartment in a secure complex in Kleine Kuppe or Olympia. Need at least one covered parking bay.',
  tenantName: 'Nangula & Frans',
  tenantWhatsapp: '+264 85 110 4422',
  featured: true
},
{
  id: 'r3',
  propertyType: '3 Bedroom House',
  budget: 12000,
  town: 'Windhoek',
  area: 'Olympia / Eros',
  moveDate: '01 Jul 2025',
  description:
  'Relocating from Swakopmund and looking for a three bedroom house with a garden for our two children. Prefer Olympia, Eros or Klein Windhoek.',
  tenantName: 'The Kavaris',
  tenantWhatsapp: '+264 81 774 9900'
},
{
  id: 'r4',
  propertyType: 'Room / Shared',
  budget: 2500,
  town: 'Windhoek',
  area: 'Windhoek North',
  moveDate: '10 Jun 2025',
  description:
  'Second year student looking for a room in a shared house close to campus. Wi-Fi essential. Happy to share kitchen and bathroom.',
  tenantName: 'Chantel S.',
  tenantWhatsapp: '+264 81 226 3311'
},
{
  id: 'r5',
  propertyType: '2 Bedroom Flat',
  budget: 6500,
  town: 'Walvis Bay',
  area: 'Meersig',
  moveDate: '20 Jun 2025',
  description:
  'Couple working at the harbour looking for a two bedroom flat in Meersig or Lagoon. Both employed, references available.',
  tenantName: 'Dion & Aletta',
  tenantWhatsapp: '+264 85 668 2200'
}];


export const connectPackages: ConnectPackage[] = [
{
  id: 'starter',
  name: 'Starter',
  price: 49,
  requests: '1 rental request',
  connections: 30,
  validDays: 30,
  perks: ['1 rental request', '30 unique landlord connections', 'Valid 30 days']
},
{
  id: 'premium',
  name: 'Premium',
  price: 99,
  requests: '3 rental requests',
  connections: 100,
  validDays: 30,
  popular: true,
  perks: [
  '3 rental requests',
  '100 unique landlord connections',
  'Featured request',
  'Valid 30 days']

},
{
  id: 'ultimate',
  name: 'Ultimate',
  price: 199,
  requests: 'Unlimited rental requests',
  connections: 300,
  validDays: 30,
  perks: [
  'Unlimited rental requests',
  '300 unique landlord connections',
  'Priority placement',
  'Featured badge',
  'Valid 30 days']

}];


export const paymentMethods = [
'PayToday',
'PayPulse',
'DPO Pay',
'Bank Windhoek',
'FNB',
'Standard Bank'];


export const navLinks = [
{ label: 'Find Accommodation', to: '/find' },
{ label: 'Looking for Accommodation', to: '/requests' },
{ label: 'Advertise', to: '/listing/new' },
{ label: 'How It Works', to: '/#how-it-works' },
{ label: 'Pricing', to: '/pricing' }];