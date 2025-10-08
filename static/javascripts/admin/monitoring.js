$(document).ready(function () {
  $('#data-download-scrap').submit(function(e) {
    e.preventDefault();

    disableButtons();
    clearResult('download');
    clearResult('review');
    clearResult('load');
    showSpinner('download');

    $.ajax({
      url: "monitoring/retrieve",
      data: {
        year:  $('#year').val(),
        yearCompleted:  $('#year-completed').val()
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
      url: `monitoring/retrieve_manual?year=${$('#year').val()}&yearCompleted=${$('#year-completed').val()}&scrap=false`,
      data: JSON.stringify({
        objetivos_e_indicadores: $('#input-objetivos_e_indicadores').val(),
        objetivos_y_actividades: $('#input-objetivos_y_actividades').val()
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
      url: "monitoring/load",
      contentType:    'application/json; charset=utf-8',
      success: onLoadSuccess,
      error: onLoadError,
      complete: enableButtons
    });
  });
});
