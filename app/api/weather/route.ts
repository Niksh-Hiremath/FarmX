// app/api/weather/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  
  if (!lat || !lon) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
  }
  
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  
  if (!API_KEY) {
    return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
  }
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      { next: { revalidate: 1800 } } // Cache for 30 minutes
    );
    
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}