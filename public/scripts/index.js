const $ = jQuery
const $document = $(document)

$document.ready(() => {
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
      primary_release_year: '2019'
    },
    success: (data) => {
      console.log('data', data)
    },
    dataType: 'json'
  })
})