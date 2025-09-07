$(document).ready(function () {
  $('#data-download-scrap').submit(function(e) {
    e.preventDefault();

    disableButtons();
    clearResult('download');
    clearResult('review');
    clearResult('load');
    showSpinner('download');

    $.ajax({
      url: "execution/retrieve",
      data: {
        month: $('#month').val(),
        year:  $('#year').val(),
        scrap: true,
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
      url: `execution/retrieve_manual?month=${$('#month').val()}&year=${$('#year').val()}&scrap=false`,
      data: JSON.stringify({
        ingresos: $('#input-ingresos').val(),
        gastos: $('#input-gastos').val(),
        inversiones: $('#input-inversiones').val(),
        ingresosEliminacionesBruto: $('#input-ingresos-eliminaciones-bruto').val(),
        gastosEliminacionesBruto: $('#input-gastos-eliminaciones-bruto').val(),        
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
      url: "execution/review",
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
      url: "execution/load",
      contentType:    'application/json; charset=utf-8',
      success: onLoadSuccess,
      error: onLoadError,
      complete: enableButtons
    });
  });
});
