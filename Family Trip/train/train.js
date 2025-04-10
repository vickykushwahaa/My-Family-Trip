// Sample train data
const trains = [
    {
        id: 1,
        name: "Rajdhani Express",
        from: "Delhi",
        to: "Mumbai",
        departure: "08:00",
        arrival: "20:00",
        duration: "12h 0m",
        classes: [
            { type: "first", price: 2500, available: true },
            { type: "second", price: 1800, available: true },
            { type: "sleeper", price: 1200, available: false }
        ]
    },
    {
        id: 2,
        name: "Shatabdi Express",
        from: "Bangalore",
        to: "Chennai",
        departure: "06:30",
        arrival: "11:00",
        duration: "4h 30m",
        classes: [
            { type: "first", price: 1500, available: true },
            { type: "second", price: 1000, available: true },
            { type: "sleeper", price: 800, available: true }
        ]
    },
    {
        id: 3,
        name: "Duronto Express",
        from: "Kolkata",
        to: "Delhi",
        departure: "15:45",
        arrival: "08:30",
        duration: "16h 45m",
        classes: [
            { type: "first", price: 2200, available: true },
            { type: "second", price: 1600, available: true },
            { type: "sleeper", price: 1100, available: true }
        ]
    },
    {
        id: 4,
        name: "Garib Rath",
        from: "Mumbai",
        to: "Goa",
        departure: "10:15",
        arrival: "18:30",
        duration: "8h 15m",
        classes: [
            { type: "first", price: 1800, available: false },
            { type: "second", price: 1200, available: true },
            { type: "sleeper", price: 700, available: true }
        ]
    },
    {
        id: 5,
        name: "Jan Shatabdi",
        from: "Hyderabad",
        to: "Bangalore",
        departure: "07:00",
        arrival: "13:30",
        duration: "6h 30m",
        classes: [
            { type: "first", price: 1600, available: true },
            { type: "second", price: 1100, available: true },
            { type: "sleeper", price: 600, available: false }
        ]
    }
];

// DOM Elements
const searchForm = document.getElementById('searchForm');
const resultsSection = document.getElementById('results');
const trainList = document.getElementById('trainList');
const bookingForm = document.getElementById('bookingForm');
const passengerForm = document.getElementById('passengerForm');
const confirmationSection = document.getElementById('confirmation');
const backToResultsBtn = document.getElementById('backToResults');
const backToHomeBtn = document.getElementById('backToHome');

// Selected train data
let selectedTrain = null;
let selectedClass = null;

// Event Listeners
searchForm.addEventListener('submit', handleSearch);
passengerForm.addEventListener('submit', handleBooking);
backToResultsBtn.addEventListener('click', () => {
    bookingForm.style.display = 'none';
    resultsSection.style.display = 'block';
});
backToHomeBtn.addEventListener('click', () => {
    confirmationSection.style.display = 'none';
    searchForm.reset();
    resultsSection.style.display = 'none';
    window.scrollTo(0, 0);
});

// Functions
function handleSearch(e) {
    e.preventDefault();
    
    const from = document.getElementById('from').value.toLowerCase();
    const to = document.getElementById('to').value.toLowerCase();
    const date = document.getElementById('date').value;
    const trainClass = document.getElementById('class').value;
    
    // Filter trains based on search criteria
    const filteredTrains = trains.filter(train => {
        const matchesRoute = train.from.toLowerCase().includes(from) && 
                           train.to.toLowerCase().includes(to);
        
        let matchesClass = true;
        if (trainClass !== 'all') {
            matchesClass = train.classes.some(cls => cls.type === trainClass && cls.available);
        }
        
        return matchesRoute && matchesClass;
    });
    
    displayResults(filteredTrains, trainClass);
}

function displayResults(trains, trainClass) {
    trainList.innerHTML = '';
    
    if (trains.length === 0) {
        trainList.innerHTML = '<p class="no-results">No trains found matching your criteria.</p>';
        resultsSection.style.display = 'block';
        return;
    }
    
    trains.forEach(train => {
        const trainCard = document.createElement('div');
        trainCard.className = 'train-card';
        
        // Find the first available class if specific class was selected
        let displayClass = null;
        if (trainClass === 'all') {
            displayClass = train.classes.find(cls => cls.available) || train.classes[0];
        } else {
            displayClass = train.classes.find(cls => cls.type === trainClass && cls.available) || 
                          train.classes.find(cls => cls.available) || train.classes[0];
        }
        
        trainCard.innerHTML = `
            <div class="train-info">
                <h4>${train.name}</h4>
                <p>${train.from} to ${train.to}</p>
            </div>
            <div class="train-time">
                <p>${train.departure} - ${train.arrival}</p>
                <p>${train.duration}</p>
            </div>
            <div class="train-price">
                <p>₹${displayClass.price}</p>
                <p>${displayClass.type} class</p>
                <button class="book-btn" data-train-id="${train.id}" data-class-type="${displayClass.type}">Book Now</button>
            </div>
        `;
        
        trainList.appendChild(trainCard);
    });
    
    // Add event listeners to book buttons
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const trainId = parseInt(e.target.getAttribute('data-train-id'));
            const classType = e.target.getAttribute('data-class-type');
            
            selectedTrain = trains.find(train => train.id === trainId);
            selectedClass = selectedTrain.classes.find(cls => cls.type === classType);
            
            displayBookingForm();
        });
    });
    
    resultsSection.style.display = 'block';
    window.scrollTo(0, resultsSection.offsetTop);
}

function displayBookingForm() {
    document.getElementById('selectedTrainName').textContent = selectedTrain.name;
    document.getElementById('selectedTrainTime').textContent = `Departure: ${selectedTrain.departure} | Arrival: ${selectedTrain.arrival}`;
    document.getElementById('selectedTrainDuration').textContent = `Duration: ${selectedTrain.duration}`;
    document.getElementById('selectedTrainClass').textContent = `Class: ${selectedClass.type}`;
    document.getElementById('selectedTrainPrice').textContent = `Price: ₹${selectedClass.price}`;
    
    resultsSection.style.display = 'none';
    bookingForm.style.display = 'block';
    window.scrollTo(0, bookingForm.offsetTop);
}

function handleBooking(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const berth = document.getElementById('berth').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const date = document.getElementById('date').value;
    
    // Generate random PNR number
    const pnr = 'PNR' + Math.floor(100000 + Math.random() * 900000);
    
    // Display confirmation
    document.getElementById('pnrNumber').textContent = pnr;
    document.getElementById('confTrainName').textContent = selectedTrain.name;
    document.getElementById('confTrainDate').textContent = new Date(date).toDateString();
    document.getElementById('confPassengerName').textContent = name;
    document.getElementById('confTotalAmount').textContent = `₹${selectedClass.price}`;
    
    bookingForm.style.display = 'none';
    confirmationSection.style.display = 'block';
    window.scrollTo(0, confirmationSection.offsetTop);
    
    // Reset forms
    searchForm.reset();
    passengerForm.reset();
}

// Set default date to tomorrow
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
document.getElementById('date').valueAsDate = tomorrow;