// Sample Hotel Data
const hotels = [
    {
        id: 1,
        name: "Grand Plaza Hotel",
        location: "New York, USA",
        price: 199,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        amenities: ["Free WiFi", "Pool", "Spa", "Restaurant"]
    },
    {
        id: 2,
        name: "Sunset Resort",
        location: "Miami, USA",
        price: 249,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        amenities: ["Beach Access", "Free Breakfast", "Gym", "Bar"]
    },
    {
        id: 3,
        name: "Mountain View Lodge",
        location: "Denver, USA",
        price: 179,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        amenities: ["Free WiFi", "Ski Access", "Hot Tub", "Restaurant"]
    },
    {
        id: 4,
        name: "Urban Loft Suites",
        location: "Chicago, USA",
        price: 159,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        amenities: ["Free WiFi", "Gym", "Coffee Bar", "Workspace"]
    }
];

// DOM Elements
const searchForm = document.getElementById('searchForm');
const hotelGrid = document.getElementById('hotelGrid');
const bookingForm = document.getElementById('bookingForm');
const guestForm = document.getElementById('guestForm');
const confirmationSection = document.getElementById('confirmation');
const backToHomeBtn = document.getElementById('backToHome');

// Selected Hotel Data
let selectedHotel = null;
let checkInDate = null;
let checkOutDate = null;

// Load Hotels on Page Load
document.addEventListener('DOMContentLoaded', () => {
    displayHotels(hotels);
});

// Search Form Submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const destination = document.getElementById('destination').value.toLowerCase();
    checkInDate = document.getElementById('check-in').value;
    checkOutDate = document.getElementById('check-out').value;
    const guests = document.getElementById('guests').value;

    // Filter hotels (simplified for demo)
    const filteredHotels = hotels.filter(hotel => 
        hotel.location.toLowerCase().includes(destination)
    );

    displayHotels(filteredHotels);
});

// Display Hotels
function displayHotels(hotels) {
    hotelGrid.innerHTML = '';
    
    if (hotels.length === 0) {
        hotelGrid.innerHTML = '<p class="no-results">No hotels found matching your criteria.</p>';
        return;
    }

    hotels.forEach(hotel => {
        const hotelCard = document.createElement('div');
        hotelCard.className = 'hotel-card';
        hotelCard.innerHTML = `
            <div class="hotel-img">
                <img src="${hotel.image}" alt="${hotel.name}">
            </div>
            <div class="hotel-info">
                <h3>${hotel.name}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${hotel.location}</p>
                <p><i class="fas fa-star"></i> ${hotel.rating}/5</p>
                <div class="hotel-price">
                    <p>$${hotel.price}/night</p>
                    <a href="#" class="book-now" data-id="${hotel.id}">Book Now</a>
                </div>
            </div>
        `;
        hotelGrid.appendChild(hotelCard);
    });

    // Add event listeners to "Book Now" buttons
    document.querySelectorAll('.book-now').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const hotelId = parseInt(e.target.getAttribute('data-id'));
            selectedHotel = hotels.find(hotel => hotel.id === hotelId);
            showBookingForm();
        });
    });
}

// Show Booking Form
function showBookingForm() {
    document.getElementById('selectedHotelName').textContent = selectedHotel.name;
    document.getElementById('selectedHotelLocation').textContent = selectedHotel.location;
    document.getElementById('selectedHotelDates').textContent = ${checkInDate} to ${checkOutDate};
    document.getElementById('selectedHotelPrice').textContent = $${selectedHotel.price}/night;

    document.getElementById('hotels').style.display = 'none';
    bookingForm.style.display = 'block';
    window.scrollTo({ top: bookingForm.offsetTop, behavior: 'smooth' });
}

// Guest Form Submission
guestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const specialRequests = document.getElementById('specialRequests').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    // Generate random booking ID
    const bookingId = 'H' + Math.floor(100000 + Math.random() * 900000);

    // Display confirmation
    document.getElementById('bookingId').textContent = bookingId;
    document.getElementById('confHotelName').textContent = selectedHotel.name;
    document.getElementById('confHotelDates').textContent = ${checkInDate} to ${checkOutDate};
    document.getElementById('confGuestName').textContent = fullName;
    document.getElementById('confTotalPrice').textContent = $${selectedHotel.price};

    bookingForm.style.display = 'none';
    confirmationSection.style.display = 'block';
    window.scrollTo({ top: confirmationSection.offsetTop, behavior: 'smooth' });
});

// Back to Home Button
backToHomeBtn.addEventListener('click', () => {
    confirmationSection.style.display = 'none';
    document.getElementById('hotels').style.display = 'block';
    searchForm.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Set default dates (today + tomorrow)
const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().split('T')[0];

document.getElementById('check-in').value = today;
document.getElementById('check-out').value = tomorrowStr;