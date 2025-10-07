$(document).ready(function () {
  $('#data-download-scrap').submit(function(e) {
    e.preventDefault();

    disableButtons();
    clearResult('download');
    clearResult('review');
    clearResult('load');
    showSpinner('download');

    $.ajax({
      url: "main-investments/retrieve",
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
      url: `main-investments/retrieve_manual?year=${$('#year').val()}&scrap=false`,
      data: JSON.stringify({
        inversiones_principales: $('#input-inversiones_principales').val()
      }),
      contentType: 'application/json; charset=utf-8',
      success: onDownloadSuccess,
      error: onDownloadError,
      complete: enableButtons
    });
  });

  $('#data-load').submit(function(e) {
    e.preventDefault();

    disableButtons();
    clearResult('load');
    showSpinner('load');

    $.ajax({
      url: "main-investments/load",
      contentType:    'application/json; charset=utf-8',
      success: onLoadSuccess,
      error: onLoadError,
      complete: enableButtons
    });
  });
});
