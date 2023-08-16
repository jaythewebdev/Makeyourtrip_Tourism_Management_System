import React, { useState, useEffect } from 'react';
import { Select, Button, Radio, Input, Card} from 'antd';
// import DatePicker from 'react-bootstrap-date-picker';
// import 'react-bootstrap-date-picker/dist/react-bootstrap-date-picker.css';



const { Option } = Select;

const priceRangeOptions = [
  { label: 'Below $100', value: [0, 1000] },
  { label: 'Above $100', value: [100, 1000] },
  { label: 'Above $1000', value: [1000, 5000] },
  { label: 'Above $5000', value: [5000,10000] },

  // ... other price range options
];


const tourDetails=[
    {
      "tourId": 1,
      "travelAgentId": 101,
      "tourName": "Exploring Ancient Ruins",
      "tourDescription": "Discover ancient civilizations through their ruins.",
      "tourtype": "Historical",
      "departureDate": "2023-09-15T10:00:00.000Z",
      "returnDate": "2023-09-25T18:00:00.000Z",
      "durationInDays": 11,
      "tourPrice": 1200,
      "maxCapacity": 20,
      "bookedCapacity": 8,
      "availability": "Available",
      "imageUrl": "https://example.com/images/tour1.jpg",
      "accomodationStatus": "Included",
      "cancellationPolicy": "Free cancellation up to 7 days before departure.",
      "bookingRestriction": 2,
      "healthAndSafety": "Enhanced safety measures in place.",
      "pickupPoints": [
        {
          "pickupPointId": 1,
          "tourId": 1,
          "location": "Hotel A",
          "pickupTime": "2023-09-15T09:00:00.000Z"
        }
      ],
      "itineraries": [
        {
          "itineraryId": 1,
          "tourId": 1,
          "dayNumber": 1,
          "date": "2023-09-15T00:00:00.000Z",
          "destinationId": 1,
          "dailySchedules": [
            {
              "scheduleId": 1,
              "itineraryId": 1,
              "timing": "09:00 AM",
              "activity": "Visit Ancient Temple",
              "place": "Temple A"
            }
          ]
        }
      ],
      "tourDestination": [
        {
          "id": 1,
          "tourId": 1,
          "destinationId": 1,
          "destinationimage": "https://example.com/images/destination1.jpg",
          "destinationActivity": "Historical Sites"
        },
        {
            "id": 4,
            "tourId": 1,
            "destinationId": 1,
            "destinationimage": "https://example.com/images/destination1.jpg",
            "destinationActivity": "Historical Sites"
          },
          {
            "id": 1,
            "tourId": 1,
            "destinationId": 1,
            "destinationimage": "https://example.com/images/destination1.jpg",
            "destinationActivity": "Historical Sites"
          }
      ],
      "tourInclusion": [
        {
          "id": 1,
          "tourId": 1,
          "inclusionId": 101
        }
      ],
      "tourExclusion": [
        {
          "id": 1,
          "tourId": 1,
          "exclusionId": 101
        }
      ]
    },
    {
      "tourId": 2,
      "travelAgentId": 102,
      "tourName": "Relaxing Beach Getaway",
      "tourDescription": "Unwind on pristine sandy beaches and enjoy the sea breeze.",
      "tourtype": "Beach",
      "departureDate": "2023-07-20T11:00:00.000Z",
      "returnDate": "2023-07-28T17:00:00.000Z",
      "durationInDays": 9,
      "tourPrice": 1500,
      "maxCapacity": 15,
      "bookedCapacity": 12,
      "availability": "Limited",
      "imageUrl": "https://example.com/images/tour2.jpg",
      "accomodationStatus": "Included",
      "cancellationPolicy": "Free cancellation up to 14 days before departure.",
      "bookingRestriction": 1,
      "healthAndSafety": "Enhanced safety protocols for a worry-free vacation.",
      "pickupPoints": [
        {
          "pickupPointId": 2,
          "tourId": 2,
          "location": "Resort Lobby",
          "pickupTime": "2023-07-20T10:30:00.000Z"
        }
      ],
      "itineraries": [
        {
          "itineraryId": 2,
          "tourId": 2,
          "dayNumber": 1,
          "date": "2023-07-20T00:00:00.000Z",
          "destinationId": 4,
          "dailySchedules": [
            {
              "scheduleId": 2,
              "itineraryId": 2,
              "timing": "11:00 AM",
              "activity": "Check-in at Resort",
              "place": "Beach Resort"
            }
          ]
        }
      ],
      "tourDestination": [
        {
          "id": 2,
          "tourId": 2,
          "destinationId": 4,
          "destinationimage": "https://example.com/images/destination2.jpg",
          "destinationActivity": "Beach Activities"
        }
      ],
      "tourInclusion": [
        {
          "id": 2,
          "tourId": 2,
          "inclusionId": 201
        }
      ],
      "tourExclusion": [
        {
          "id": 2,
          "tourId": 2,
          "exclusionId": 201
        }
      ]
    },
    {
      "tourId": 3,
      "travelAgentId": 103,
      "tourName": "Jungle Safari Adventure",
      "tourDescription": "Embark on a thrilling safari and encounter exotic wildlife.",
      "tourtype": "Adventure",
      "departureDate": "2023-08-10T09:00:00.000Z",
      "returnDate": "2023-08-18T16:00:00.000Z",
      "durationInDays": 9,
      "tourPrice": 1800,
      "maxCapacity": 25,
      "bookedCapacity": 18,
      "availability": "Available",
      "imageUrl": "https://example.com/images/tour3.jpg",
      "accomodationStatus": "Included",
      "cancellationPolicy": "Free cancellation up to 10 days before departure.",
      "bookingRestriction": 2,
      "healthAndSafety": "Safety measures for an unforgettable wildlife experience.",
      "pickupPoints": [
        {
          "pickupPointId": 3,
          "tourId": 3,
          "location": "Airport",
          "pickupTime": "2023-08-10T08:30:00.000Z"
        }
      ],
      "itineraries": [
        {
          "itineraryId": 3,
          "tourId": 3,
          "dayNumber": 1,
          "date": "2023-08-10T00:00:00.000Z",
          "destinationId": 4,
          "dailySchedules": [
            {
              "scheduleId": 3,
              "itineraryId": 3,
              "timing": "09:00 AM",
              "activity": "Arrival and Check-in",
              "place": "Lodge"
            }
          ]
        }
      ],
      "tourDestination": [
        {
          "id": 3,
          "tourId": 3,
          "destinationId": 4,
          "destinationimage": "https://example.com/images/destination3.jpg",
          "destinationActivity": "Wildlife Safari"
        }
      ],
      "tourInclusion": [
        {
          "id": 3,
          "tourId": 3,
          "inclusionId": 301
        }
      ],
      "tourExclusion": [
        {
          "id": 3,
          "tourId": 3,
          "exclusionId": 301
        }
      ]
    },
    {
      "tourId": 4,
      "travelAgentId": 104,
      "tourName": "Cultural Heritage Tour",
      "tourDescription": "Immerse yourself in the rich cultural heritage of the region.",
      "tourtype": "Cultural",
      "departureDate": "2023-10-05T12:00:00.000Z",
      "returnDate": "2023-10-12T14:00:00.000Z",
      "durationInDays": 8,
      "tourPrice": 900,
      "maxCapacity": 15,
      "bookedCapacity": 10,
      "availability": "Limited",
      "imageUrl": "https://example.com/images/tour4.jpg",
      "accomodationStatus": "Included",
      "cancellationPolicy": "Free cancellation up to 7 days before departure.",
      "bookingRestriction": 2,
      "healthAndSafety": "Cultural experience with safety as a priority.",
      "pickupPoints": [
        {
          "pickupPointId": 4,
          "tourId": 4,
          "location": "Hotel Lobby",
          "pickupTime": "2023-10-05T11:30:00.000Z"
        }
      ],
      "itineraries": [
        {
          "itineraryId": 4,
          "tourId": 4,
          "dayNumber": 1,
          "date": "2023-10-05T00:00:00.000Z",
          "destinationId": 7,
          "dailySchedules": [
            {
              "scheduleId": 4,
              "itineraryId": 4,
              "timing": "12:00 PM",
              "activity": "Check-in and Welcome",
              "place": "Heritage Hotel"
            }
          ]
        }
      ],
      "tourDestination": [
        {
          "id": 4,
          "tourId": 4,
          "destinationId": 7,
          "destinationimage": "https://example.com/images/destination4.jpg",
          "destinationActivity": "Cultural Sites"
        }
      ],
      "tourInclusion": [
        {
          "id": 4,
          "tourId": 4,
          "inclusionId": 401
        }
      ],
      "tourExclusion": [
        {
          "id": 4,
          "tourId": 4,
          "exclusionId": 401
        }
      ]
    },
    {
      "tourId": 5,
      "travelAgentId": 105,
      "tourName": "Mountain Expedition",
      "tourDescription": "Conquer majestic peaks and experience the thrill of mountaineering.",
      "tourtype": "Adventure",
      "departureDate": "2023-11-18T08:00:00.000Z",
      "returnDate": "2023-11-27T16:00:00.000Z",
      "durationInDays": 10,
      "tourPrice": 2200,
      "maxCapacity": 12,
      "bookedCapacity": 6,
      "availability": "Available",
      "imageUrl": "https://example.com/images/tour5.jpg",
      "accomodationStatus": "Included",
      "cancellationPolicy": "Free cancellation up to 14 days before departure.",
      "bookingRestriction": 1,
      "healthAndSafety": "Safety measures for a challenging and rewarding adventure.",
      "pickupPoints": [
        {
          "pickupPointId": 5,
          "tourId": 5,
          "location": "Base Camp",
          "pickupTime": "2023-11-18T07:30:00.000Z"
        }
      ],
      "itineraries": [
        {
          "itineraryId": 5,
          "tourId": 5,
          "dayNumber": 1,
          "date": "2023-11-18T00:00:00.000Z",
          "destinationId": 7,
          "dailySchedules": [
            {
              "scheduleId": 5,
              "itineraryId": 5,
              "timing": "08:00 AM",
              "activity": "Registration and Equipment Check",
              "place": "Base Camp"
            }
          ]
        }
      ],
      "tourDestination": [
        {
          "id": 5,
          "tourId": 5,
          "destinationId": 7,
          "destinationimage": "https://example.com/images/destination5.jpg",
          "destinationActivity": "Mountaineering"
        }
      ],
      "tourInclusion": [
        {
          "id": 5,
          "tourId": 5,
          "inclusionId": 501
        }
      ],
      "tourExclusion": [
        {
          "id": 5,
          "tourId": 5,
          "exclusionId": 501
        }
      ]
    }
  ];
  

  const destinations=[
    {
      "destinationId": 1,
      "destinationCityName": "Kolkata",
      "country": "India",
      "tourDestinations": null
    },
    {
      "destinationId": 4,
      "destinationCityName": "Houston",
      "country": "USA",
      "tourDestinations": null
    },
    {
      "destinationId": 7,
      "destinationCityName": "Los Vegas",
      "country": "USA",
      "tourDestinations": null
    },
    {
      "destinationId": 9,
      "destinationCityName": "string",
      "country": "string",
      "tourDestinations": null
    }
  ];

function ProductList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  console.log(startDate,endDate);
  useEffect(() => {
    // Simulating fetching categories from an API
    fetchCategoriesFromAPI()
      .then((categories) => setCategories(categories))
      .catch((error) => console.error('Error fetching categories:', error));

    // Simulating fetching all products from an API
    setFilteredProducts(tourDetails);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [selectedCategories, selectedPriceRanges, sortType, sortOrder]);

  const fetchCategoriesFromAPI = async () => {
    // Replace with your API call to fetch categories
    return ['Adventure', 'Historical', 'Beach', 'Cultural'];
  };

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected);
  };

  const handlePriceRangeChange = (selected) => {
    setSelectedPriceRanges(selected);
  };
  const applyFiltersAndSort = () => {
    let filteredProducts = tourDetails;
    if (searchButtonClicked && (searchTerm || startDate || endDate)) {
    const destinationQuery = searchTerm.toLowerCase();

    const filteredTours = tourDetails.filter(tour => {
      const tourDate = new Date(tour.departureDate);
      if (startDate && endDate) {
        const searchStartDate = new Date(startDate);
        const searchEndDate = new Date(endDate);
        if (tourDate < searchStartDate || tourDate > searchEndDate) {
          return false;
        }
      }

      if (destinationQuery) {
        const destinationObj = destinations.find(
          dest =>
            dest.destinationCityName.toLowerCase().includes(destinationQuery) ||
            dest.country.toLowerCase().includes(destinationQuery)
        );
        if (!destinationObj || tour.tourDestination.every(td => td.destinationId !== destinationObj.destinationId)) {
          return false;
        }
      }

      return true;
    });
    console.log(filteredTours)
    filteredProducts=filteredTours;
      }
    filteredProducts = filteredProducts.filter((product) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.tourtype);
      
      return matchesCategory;
    });
  
    if (selectedPriceRanges.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        return selectedPriceRanges.some(range =>
          product.tourPrice >= range[0] && product.tourPrice <= range[1]
        );
      });
    }
  
    if (sortType) {
      filteredProducts.sort((a, b) => {
        if (sortType === 'price') {
          return sortOrder === 'asc' ? a.tourPrice - b.tourPrice : b.tourPrice - a.tourPrice;
        } else if (sortType === 'days') {
          return sortOrder === 'asc' ? a.durationInDays - b.durationInDays : b.durationInDays - a.durationInDays;
        }
        return 0;
      });
    }
  
    setFilteredProducts(filteredProducts);
  };
  

const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    // setSearchTerm('');
    setStartDate('');
    setEndDate('');
    // setSearchButtonClicked(false);
    setSortType('');
    setSortOrder('asc');
    setFilteredProducts(tourDetails);
  };

  const handleSearch = () => {
    setSearchButtonClicked(true);
    applyFiltersAndSort();
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Search tour packages"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '200px', marginRight: '16px' }}
        />
              <label>Start Date:</label>
      {/* <DatePicker
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{ marginRight: '16px' }}
      />
      <label>End Date:</label>
      <DatePicker
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={{ marginRight: '16px' }}
      /> */}
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ marginRight: '16px' }}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ marginRight: '16px' }}
        />
        <Button type="primary" onClick={handleSearch} style={{ marginRight: '8px' }}>
          Search
        </Button>
                <Select
          mode="multiple"
          placeholder="Select categories"
          onChange={handleCategoryChange}
          value={selectedCategories} // Set value prop to reset selected categories
          style={{ width: '200px', marginRight: '16px' }}
        >
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
         <div style={{ marginBottom: '16px' }}>
          <span>Price Range:</span>
          <Radio.Group
            value={selectedPriceRanges[0]} // Only support single selection with radio buttons
            onChange={(e) => handlePriceRangeChange([e.target.value])}
            style={{ marginLeft: '8px' }}
          >
            {priceRangeOptions.map(option => (
              <Radio.Button key={option.label} value={option.value}>
                {option.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <Button onClick={resetFilters}>Reset Filters</Button>
        <div style={{ marginTop: '8px' }}>
          <span>Sort by:</span>
          <Radio.Group
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            style={{ marginLeft: '8px' }}
          >
            <Radio.Button value="price">Price</Radio.Button>
            <Radio.Button value="days">Days</Radio.Button>
          </Radio.Group>
          <Radio.Group
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ marginLeft: '8px' }}
          >
            <Radio.Button value="asc">Ascending</Radio.Button>
            <Radio.Button value="desc">Descending</Radio.Button>
          </Radio.Group>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredProducts.map((product) => (
          <Card
            key={product.tourId}
            title={product.tourName}
            style={{ width: 300, margin: '16px' }}
          >
            <p>Category: {product.tourtype}</p>
            <p>Price: ${product.tourPrice}</p>
            <p>Days: {product.durationInDays}</p>
            <p>Days: {product.departureDate}</p>
            <p>Days: {product.returnDate}</p>

          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
