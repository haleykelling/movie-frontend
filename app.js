const movieID = 2
const movieURL = `http://localhost:3000/movies/${movieID}`
const upvotesURL = `http://localhost:3000/upvotes`
const reviewURL = `http://localhost:3000/reviews`
const movieName = document.querySelector('#movie-name')
const movieImage = document.querySelector('#movie-image')
const movieUpvotes = document.querySelector('#movie-upvotes')
const upvote = document.querySelector('#upvote')
const reviewForm = document.querySelector('#review-form')
const movieReviews = document.querySelector('#movie-reviews')

upvote.addEventListener('click', upvoteMovie)
reviewForm.addEventListener('submit', event => {
    event.preventDefault();
    addReview();
})

fetch(movieURL)
    .then(response => response.json())
    .then(showMovie)

function showMovie(movie){
    movieName.textContent = movie.name 
    movieImage.src = movie.image_url
    movieUpvotes.textContent = movie.upvotes_count
    
    movie.reviews.forEach(showReview)
}

function showReview(review){
    const li = document.createElement('li')
    li.textContent = review.content
    movieReviews.append(li)
}

function upvoteMovie(){
    movieUpvotes.textContent = +movieUpvotes.textContent + 1
    const upvotesData = {
        upvote: {movie_id: movieID}
    }

    fetch(upvotesURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(upvotesData)
    })
}

function addReview(){
    const formData = new FormData(reviewForm)
    const content = formData.get('content')
    const reviewData = {
        content,
        movie_id: movieID
    }
    
    showReview(reviewData)

    fetch(reviewURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })
}

