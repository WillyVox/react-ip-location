// services/iplocation.ts (Corrected)

const findIPAddress = async () => {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    return ipData.ip; // e.g., "116.255.54.11"
}

const ipLocation = async (ipAddress?: string) => {
    const checkedIP = ipAddress || await findIPAddress(); 
    
    const geoResponse = await fetch(`http://ip-api.com/json/${checkedIP}`);
    const geoData = await geoResponse.json();

    if (geoData.status === 'success') {
        return {
            ip: checkedIP,
            country: geoData.countryCode 
        };
    } else {
        console.error("Geolocation failed.");
        return null;
    }
}

// All functions are correctly exported here:
export const getIPLocation = async () => ipLocation();
export const checkIPLocation = async (ipAddress: string) => ipLocation(ipAddress);
export const getIPAddress = async () => findIPAddress();