import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig = {
    apiKey: "AIzaSyCwvWCQHHsOWbP2Ctq93qwkSCbTpvYVNDA",
    authDomain: "virtual-tourist-guide-4a880.firebaseapp.com",
    projectId: "virtual-tourist-guide-4a880",
    storageBucket: "virtual-tourist-guide-4a880.appspot.com",
    messagingSenderId: "104962981493",
    appId: "1:104962981493:web:f7a9e2d68c315d0245823c",
    measurementId: "G-BF7L151H13"
  };

  // Initialize Firebase

  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);

}
