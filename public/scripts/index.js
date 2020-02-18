const $ = jQuery
const $document = $(document)

$document.ready(() => {
  $('.cSearch-form').on('submit', (e) => {
    const inputYear = $(e.currentTarget).find('.cSearch-input').val()

    e.preventDefault()
    e.stopPropagation()

    $('.cResults').empty()

    if (inputYear === '') {
      const $noResults = $('<div />').addClass('cResults-empty').text('Please Enter a Year')
      $noResults.appendTo($('.cResults'))
      return
    }

    this.getResults(inputYear)
  })
})

function getResults(year) {
  $.ajax({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie',
    data: {
      api_key:'da62a5d685a5d7690a4f192f5400cdcb',
      language: 'en-US',
      sort_by: 'popularity.desc',
      adult: false,
      include_video: false,
      page: 1,
      primary_release_year: year
    },
    success: (data) => {
      this.displayResults(data)
    },
    dataType: 'json'
  })
}

function displayResults(data) {
  console.log('Results', data.results)
  const $resultContianer = $('.cResults')

  $.each(data.results, (i, e) => {
    if (i < 10) {
      const $movie = $('<div />').addClass('cResults-movie')
      const $poster = $('<img />').addClass('cResults-movie--poster').attr('src', `http://image.tmdb.org/t/p/w342//${e.poster_path}`)
      const $title = $('<div />').addClass('cResults-movie--title').text(e.title)

      const date = this.displayDateString(e.release_date)
      const $releaseDate = $('<div />').addClass('cResults-movie--date').text(date)

      $poster.appendTo($movie)
      $title.appendTo($movie)
      $releaseDate.appendTo($movie)
      $movie.appendTo($resultContianer)
    }
  })
}

function displayDateString(date) {
  const splitDate = date.split('-')
  const dateObj = new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
  const options = { month: 'long', day: 'numeric', year: 'numeric'}
  return dateObj.toLocaleDateString('en-US', options)
}