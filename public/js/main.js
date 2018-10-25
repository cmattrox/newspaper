$(document).on('click', '#submitbutton', function () {
    let thisId = $(this).attr('data-id')
    $.ajax({
      method: 'POST',
      url: '/dashboard/' + thisId,
      data: {
        body: $('#savenote').val()
      }
    })
      .then(function (data) {
        console.log(data)
      })
  
    $('#savenote').val('')
  })