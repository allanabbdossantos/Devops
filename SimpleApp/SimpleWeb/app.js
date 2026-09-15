document.getElementById('loadButton').addEventListener('click', async () => {
    const container = document.getElementById('forecastContainer');
    container.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch('http://localhost:5269/weatherforecast');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        container.innerHTML = '';
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'forecast-card';
            
            card.innerHTML = `
                <h3>Date: ${item.date}</h3>
                <p>Temperature: ${item.temperatureC}°C / ${item.temperatureF}°F</p>
                <p>Summary: ${item.summary}</p>
            `;
            
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        container.innerHTML = '<p style="color: red;">Failed to load forecast data. Make sure the API is running.</p>';
    }
});
