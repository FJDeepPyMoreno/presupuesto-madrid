$(document).ready(function () {
  $('#data-download-scrap').submit(function(e) {
    e.preventDefault();

    disableButtons();
    clearResult('download');
    clearResult('review');
    clearResult('load');
    showSpinner('download');

    $.ajax({
      url: "general/retrieve",
      data: {
        year:  $('#year').val()
      },
      contentType: 'application/json; charset=utf-8',
      success: onDownloadSuccess,
      error: onDownloadError,
      complete: enableButtons
    });
  });
  
  $('#data-download-manual').submit(function(e) {
    e.preventDefault();

    disableButtons();
    clearResult('download');
    clearResult('review');
    clearResult('load');
    showSpinner('download');

    $.ajax({
      type: 'POST',
      url: `general/retrieve_manual?year=${$('#year').val()}&scrap=false`,
      data: JSON.stringify({
        ingresos: $('#input-ingresos').val(),
        gastos: $('#input-gastos').val(),
        inversiones: $('#input-inversiones').val()
      }),
      contentType: 'application/json; charset=utf-8',
      success: onDownloadSuccess,
      error: onDownloadError,
      complete: enableButtons
    });
  });

  $('#data-review').submit(function(e) {
    e.preventDefault();

    disableButtons();
    clearResult('review');
    clearResult('load');
    showSpinner('review');

    $.ajax({
      url: "general/review",
      contentType: 'application/json; charset=utf-8',
      success: onReviewSuccess,
      error: onReviewError,
      complete: enableButtons
    });
  });

  $('#data-load').submit(function(e) {
    e.preventDefault();

    disableButtons();
    clearResult('load');
    showSpinner('load');

    $.ajax({
      url: "general/load",
      contentType:    'application/json; charset=utf-8',
      success: onLoadSuccess,
      error: onLoadError,
      complete: enableButtons
    });
  });
});
