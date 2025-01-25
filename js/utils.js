export function generateUniqueId(prefix = '') {
    // Get the current timestamp
    const timestamp = Date.now();
    
    // Generate a random number and convert it to a base-36 string
    const randomPart = Math.random().toString(36).substring(2, 10);

    // Combine the prefix, timestamp, and random part
    return `${prefix}${timestamp}${randomPart}`;
}
