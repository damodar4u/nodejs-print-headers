const express = require('express');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
const app = express();

app.get('/', (req, res) => {
    const headers = req.headers; // Get all request headers

    // Attempt to decode the JWT from the header if present
    let decodedIdToken = null;
    let decodedAccessToken = null;

    // Check for the presence of ID Token and Access Token headers
    if (headers['x-ms-token-aad-id-token']) {
        try {
            // Decode the ID Token without verification
            decodedIdToken = jwt.decode(headers['x-ms-token-aad-id-token'], { complete: true });
        } catch (err) {
            console.error("Error decoding ID token:", err.message);
        }
    }

    if (headers['x-ms-token-aad-access-token']) {
        try {
            // Decode the Access Token without verification
            decodedAccessToken = jwt.decode(headers['x-ms-token-aad-access-token'], { complete: true });
        } catch (err) {
            console.error("Error decoding Access token:", err.message);
        }
    }

    console.log('Headers:', headers); // Print headers to console
    console.log('Decoded ID Token:', JSON.stringify(decodedIdToken, null, 2));
    console.log('Decoded Access Token:', JSON.stringify(decodedAccessToken, null, 2));

    // Respond with the headers and decoded tokens as JSON
    res.json({
        message: "Authentication headers and decoded tokens (if available) are printed below",
        headers: headers,
        decodedIdToken: decodedIdToken,
        decodedAccessToken: decodedAccessToken
    });
});

// Use the PORT environment variable provided by Azure, defaulting to 8080 if not set
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
