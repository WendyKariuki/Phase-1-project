// fetch blog post and reviews
document.addEventListener("DOMContentLoaded", function() {
fetch("http://localhost:3000/posts/")
.then(response => response.json())

.then((data)=>{

  displayPosts(data);
console.log(data);
})
.catch(error => { console.error("Error fetching destinations:", error);
});
// function to display  blog posts
function displayPosts(posts)
{
  const cardsContainer = document.getElementById("cardsContainer");

  for(const post of posts){
    cardsContainer.innerHTML += `
    <div class="block mx-auto w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <img src="${post.img}" class="w-full" alt="loading..." />
        <div class="flex justify-between my-3">
          <i onclick="deletePost(${post.id})" class="fa fa-trash text-3xl" aria-hidden="true"></i>
          <i onclick="editPost(${post.id})" class="fa fa-pencil-square-o text-3xl" aria-hidden="true"></i>
        </div>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${post.title}</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">${post.description}</p>
        <button type=" " class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Review</button>
    </div>
    
    `
  }
}


// function to edit posts
function editPost(id) {
    fetch(`http://localhost:3000/posts/${id}`)
        .then((data) => data.json())
        .then((post) => {
            const update_container = document.getElementById("cardsContainer");

            update_container.innerHTML = `
                <h4 class="text-center">Update Post</h4>
                <div class="max-w-md mx-auto">
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text" value="${post.title}" id="title_update" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="text"  value="${post.img}" id="image_update" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image Link</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <textarea type="text" id="description_update" rows="3" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required >
                            ${post.description}
                        </textarea>
                        <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <textarea type="text" id="reviews_update" rows="3" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required >
                            ${post.reviews}
                        </textarea>
                        <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reviews</label>
                    </div>
                    <button onClick="update_post(${id})" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            `;
        })
        .catch(error => console.error('Error Editing Blog:', error));
}
})

// function to delete Blog post
function deletePost(id)
{
  fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE"
  })
  .then((response)=> response.json() )
  .then((data)=>{

    displayPosts(data);

  })
}

// Function to add a new blog post
function addBlogPost() {
    const addForm = document.getElementById("addForm");
    addForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get elements by id 
        const title = document.getElementById("title").value;
        const imageLink = document.getElementById("image-link").value;
        const description = document.getElementById("description").value;
        const reviews = document.getElementById("reviews").value;

        const postData = {
            title: title,
            image: imageLink,
            description: description,
            reviews: reviews
        };

        // Send POST request to add new blog post
        fetch("http://localhost:3000/posts/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            // Alert user on success
            alert("Blog post added successfully");
            // clear the form fields after successful submission
            addForm.reset();
        })
        // catch error if any occurs while adding the blog post
        .catch(error => {
            console.error("Error adding blog post:", error);
            // Alert user on error
            alert("Error adding blog post. Please try again.");
        });
    });
}

// Call the function to add a new blog post
addBlogPost();

// function to update Blog posts
function update_post(id)
{
 const title = document.getElementById("title_update").value
 const image = document.getElementById("image-link_update").value
 const description = document.getElementById("description_update").value
 const reviews = document.getElementById("reviews_update").value;

 fetch(`http://localhost:3000/posts/${id}`, {
   method: "PATCH",
   headers:{"Content-Type": "application/json"},
   body: JSON.stringify({title: title, img: image, description: description})
 } )
 .then((response)=> response.json() )
 .then((response)=>{

   alert("Post updated successfully")
 })
}

// function to delete Blog post
function deletePost(id)
{
  fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE"
  })
  .then((response)=> response.json() )
  .then((data)=>{

    displayPosts(data);

  })
}

// Function to display reviews in the browser
function displayReviews(reviewsData) {
    const reviewsContainer = document.getElementById("reviewsContainer");

    // Clear existing reviews before appending new ones
    reviewsContainer.innerHTML = "";

    // Check if reviewsData is an array and not empty
    if (Array.isArray(reviewsData) && reviewsData.length > 0) {
        // Iterate over each review in the data
        reviewsData.forEach(review => {
            // Create a new <div> element for each review
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("border", "border-gray-200", "rounded-lg", "p-4", "mb-4");

            // Create <p> elements for review content
            const reviewContent = document.createElement("p");
            reviewContent.textContent = review;

            // Append review content to review element
            reviewElement.appendChild(reviewContent);

            // Append review element to reviews container
            reviewsContainer.appendChild(reviewElement);
        });
    } else {
        // If no reviews are available, display a message
        reviewsContainer.textContent = "No reviews available.";
    }
}

// Fetch reviews data from the server
function fetchReviews() {
    fetch("http://localhost:3000/posts/")
    .then(response => response.json())
    .then(data => {
        // Extract reviews data from the fetched data
        const reviewsData = data.map(post => post.reviews).flat();
        
        // Call the function to display reviews in the browser
        displayReviews(reviewsData);
    })
    .catch(error => {
        console.error("Error fetching reviews:", error);
        // Display an error message if fetching fails
        const reviewsContainer = document.getElementById("reviewsContainer");
        reviewsContainer.textContent = "Failed to fetch reviews. Please try again later.";
    });
}

// Call the function to fetch and display reviews
fetchReviews();

// Function to add a review
function addReview() {
    const reviewInput = document.getElementById("reviewInput").value;

    // Check if the review input is not empty
    if (reviewInput.trim() !== "") {
        // Create an object containing the review data
        const reviewData = {
            review: reviewInput
        };

        // Send a POST request to add the review
        fetch("http://localhost:3000/updatePost/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewData)
        })
        .then(response => {
            // Check if the response is successful (status code 200)
            if (response.ok) {
                // Clear the review input field
                document.getElementById("reviewInput").value = "";

                // Display a success message
                alert("Review added successfully!");
            } else {
                // If the response is not successful, throw an error
                throw new Error("Failed to add review");
            }
        })
        .catch(error => {
            console.error("Error adding review:", error);
            // Display an error message
            alert("Failed to add review. Please try again.");
        });
    } else {
        // If the review input is empty, display a warning message
        alert("Please enter a review.");
    }
}
