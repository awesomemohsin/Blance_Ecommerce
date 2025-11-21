npm create vite@latest
npm i
npm run dev

firebase
sslcommerz https://developer.sslcommerz.com/doc/v4/
img upload https://postimages.org/

# Run server
cd server & npm i
node index.js

Smart Search
AI-powered search in navbar with magic wand toggle
Natural language understanding (e.g., "comfortable running shoes")
Semantic matching beyond exact keywords
Dark mode support with smooth transitions
Product Intelligence
AI Recommendations on product pages - personalized suggestions based on current product and user behavior
Sentiment Analysis of reviews - automatic analysis showing positive/negative/neutral percentages with key themes
Product Enhancement Tool - AI can rewrite product descriptions for better engagement


### 1. Size Prediction Algorithm
- Created a BMI-based sizing algorithm that calculates recommended clothing sizes
- Implemented adjustments for different body types (average, athletic, plus-size)
- Added customization based on fit preference (loose, regular, tight)
- Included comfort priority adjustments (comfort-focused, balanced, fit-focused)
- Added product-specific sizing recommendations based on product title keywords
### 2. User-Friendly Interface
- Designed an intuitive form with clear input fields for height and weight
- Added dropdown selectors for body type, fit preference, and comfort priority
- Created a clean results display showing the recommended size
- Included detailed explanations of how the size was calculated
- Added a "Try Again" button for easy recalculation
### 3. Integration with Product Pages
- Integrated the FitPredictor component into the ProductInfo page
- Added conditional rendering to only show for clothing-related categories
- Positioned the component between AI Recommendations and AI Sentiment Analysis
- Ensured the component receives product data for context-aware recommendations

Product Schema Updates
Added a sizes array field to the product schema in both AddProductPage and UpdateProductPage
Set default sizes to ["S", "M", "L", "XL"] for new products
Created an availableSizes constant with common clothing size options
Admin Product Management
Added size selection UI to the AddProductPage form with toggle buttons for each size
Implemented the same size selection UI in UpdateProductPage
Created a handleSizeToggle function to manage size selection in both pages
Updated the product data fetching in UpdateProductPage to include sizes
Product Display
Enhanced ProductInfo page to show available sizes for products
Added a size selection UI with toggle buttons before the Add to Cart button
Implemented validation to require size selection before adding to cart
Added selected size information to cart items
Product Filtering
Added size filtering to the AllProduct page
Created a dedicated "Sizes" filter section in the sidebar
Implemented URL parameter synchronization for size filters
Added extraction of unique sizes from products for the filter options
Cart Integration
Updated the cart functionality to handle size information
Modified the addToCart reducer to consider size when checking for existing items
Ensured cart items with the same product but different sizes are treated as separate items