

### CrimeLens - Crime Reporting and Community Verification Platform
```markdown
CrimeLens is a crime reporting platform where users can upload crime images or videos, receive AI-powered analysis, and allow the community to verify authenticity through votes and comments. The platform also includes a feature to detect fake crime images using deepfake detection algorithms.

```

### Features
-  User Authentication  (with email, phone OTP, JWT)
-  Crime Reporting  (image and video uploads)
-  AI-Powered Fake Image Detection  using Hugging Face or custom model
-  Community Verification  (upvote/downvote, comments with proof)
-  Image Processing  (compression, watermarking)
-  Admin Features  (ban users, review flagged content)
-  Profile Management  (bio, profile image)

---

##  Tech Stack 
-  Backend : Hono (TypeScript)
-  Image Processing : Sharp (for watermarking and image compression)
-  Image Hosting : Cloudinary
-  Authentication : JWT
-  Image Recognition : Hugging Face / Custom Model (Deepfake Detection)
-  File Upload Handling : Multer
-  Database : MongoDB (MongoDB Native Driver)

---

##  Setup and Installation 

### 1.  Clone the Repository 
   Clone this repository to your local machine using Git:
   ```bash
   git clone https://github.com/yourusername/crimelens.git
   cd crimelens
   ```

### 2.  Install Dependencies 
   Install the necessary dependencies:
   ```bash
   npm install
   ```

### 3.  Set Up Environment Variables 
   Create a `.env` file in the root of your project and add the following variables:

   ```text
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
   GOOGLE_API_KEY=your_google_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   HUGGING_FACE_API_KEY=your_hugging_face_api_key
   ```

### 4.  Run the Server 
   Start the server with the following command:
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000`.

---

##  API Endpoints 

### 1.  POST  `/register`
   Registers a new user.

    Request Body :
   ```json
   {
     "name": "John Doe",
     "email": "johndoe@example.com",
     "phone": "1234567890",
     "password": "password",
     "profile_image": "<base64-encoded-image>"
   }
   ```

    Response :
   ```json
   {
     "message": "User registered successfully. OTP has been sent to your email."
   }
   ```

### 2.  POST  `/login`
   Logs in a user and returns JWT tokens.

    Request Body :
   ```json
   {
     "email": "johndoe@example.com",
     "password": "password"
   }
   ```

    Response :
   ```json
   {
     "accessToken": "jwt-access-token",
     "refreshToken": "jwt-refresh-token"
   }
   ```

### 3.  POST  `/verify-email`
   Verifies the email with an OTP.

    Request Body :
   ```json
   {
     "email": "johndoe@example.com",
     "otp": "123456"
   }
   ```

    Response :
   ```json
   {
     "message": "Email verified successfully"
   }
   ```

### 4.  POST  `/upload`
   Uploads an image, compresses it, and adds a watermark.

    Request Body :
   -  multipart/form-data :
     - `image`: (file type).
     - Upload an image file.
     -  Optional : Add `compressionLevel` (values: `low`, `medium`, `high`).

    Response :
   ```json
   {
     "message": "Image uploaded, compressed, and watermarked successfully!",
     "originalSize": "250.00 KB",
     "compressedSize": "150.00 KB",
     "imageUrl": "output/compressed-watermarked-1625488370000.png"
   }
   ```

### 5.  POST  `/detect-deepfake`
   Detects fake images using a deepfake detection model (based on Hugging Face model or your custom model).

    Request Body :
   -  multipart/form-data :
     - `image`: (file type).
     - Upload an image to test.

    Response :
   ```json
   {
     "message": "Image analyzed",
     "label": "Fake",
     "confidenceScore": 0.75,
     "flagged": true
   }
   ```

---

##  Testing the API with Postman 
1.  Set up Postman :
   -  Method : `POST`
   -  URL : `http://localhost:3000/upload`
   -  Body : Choose  form-data .
     -  Key : `image` (file type).
     - Upload an image file.
     -  Optional : Add `compressionLevel` (values: `low`, `medium`, `high`).
   
2.  Test `detect-deepfake` endpoint :
   -  Method : `POST`
   -  URL : `http://localhost:3000/detect-deepfake`
   -  Body : Choose  form-data .
     -  Key : `image` (file type).
     - Upload an image to test.

---

##  Contributing 

We welcome contributions! If you'd like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

---

##  License 

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
