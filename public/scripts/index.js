const $ = jQuery
const $document = $(document)

$document.ready(() => {
  $('.cSearch-form').on('submit', (e) => {
    const inputYear = $(e.currentTarget).find('.cSearch-input').val()

    e.preventDefault()
    e.stopPropagation()

    if (inputYear === '') {
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
  $resultContianer = $('.cResults')
  $.each(data.results, (i, e) => {
    if (i < 10) {
      const $movie = $('<div />').addClass('cResults-movie').text(e.title)
      $movie.appendTo($resultContianer)
    }
  })
}