// auth.js

// Your web app's Firebase configuration
// **IMPORTANT:** Get this EXACT snippet from your Firebase Project Settings > Your Apps > Select your web app > Firebase SDK snippet (Config)
const firebaseConfig = {
    apiKey: "<YOUR_API_KEY>", // Replace with your API Key
    authDomain: "homebound-scholars-university.firebaseapp.com", // This looks familiar! 😉
    projectId: "homebound-scholars-university",
    storageBucket: "<YOUR_STORAGE_BUCKET>", // Replace with your Storage Bucket
    messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>", // Replace with your Messaging Sender ID
    appId: "<YOUR_APP_ID>", // Replace with your App ID
    // measurementId: "<YOUR_MEASUREMENT_ID>" // Uncomment if you're using Analytics
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Get a reference to the Auth service
const auth = firebase.auth();

// --- FirebaseUI Configuration and Initialization ---

// Configure FirebaseUI.
const uiConfig = {
    // signInSuccessUrl: '/dashboard.html', // Optional: URL to redirect to after successful sign-in. Replace with your desired page.
    signInOptions: [
        // List the authentication providers you want to offer.
        // Since you have Google enabled, let's include it!
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,

        // Example: Add Email/Password if you enable it in Firebase Auth
        firebase.auth.EmailAuthProvider.PROVIDER_ID,

        // Example: Add Phone Number if you enable it
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,

        // Add other providers like Facebook, GitHub etc. as you enable them.
    ],
    // Optional: Terms of service and privacy policy URLs
    // tosUrl: '<your-tos-url>', // Replace with your ToS URL
    // privacyPolicyUrl: '<your-privacy-policy-url>' // Replace with your privacy policy URL
};

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Start the FirebaseUI Auth process in the #auth-container element.
// We only start it if no user is currently logged in.
auth.onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in. Show signed-in view.
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('user-info').style.display = 'block';
        document.getElementById('user-display-name').textContent = user.displayName || 'User'; // Use display name if available
        document.getElementById('user-email').textContent = user.email;

        // Set up sign-out button
        document.getElementById('sign-out-button').addEventListener('click', function() {
            auth.signOut().then(function() {
                // Sign-out successful. Page will reload due to onAuthStateChanged listener below.
            }).catch(function(error) {
                // An error happened.
                console.error("Sign out error", error);
                alert("Error signing out: " + error.message);
            });
        });


        // Optional: Redirect to a different page after login
        // if (window.location.pathname !== '/dashboard.html') { // Avoid infinite redirects
        //     window.location.assign('/dashboard.html');
        // }


    } else {
        // User is signed out. Show auth container.
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('user-info').style.display = 'none';

        // If FirebaseUI is not already started, start it.
        // This prevents starting it multiple times if the auth state changes repeatedly.
        if (ui.is signInPending()) {
             // UI is already being displayed.
             console.log("FirebaseUI is already rendering.");
        } else {
            console.log("Starting FirebaseUI.");
            ui.start('#auth-container', uiConfig);
        }

    }
}, function(error) {
    // Handle errors during authentication state change observation
    console.error("Authentication state change error", error);
    alert("Authentication error: " + error.message);
});

