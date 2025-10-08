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

  // Get references to the tab links and form containers
  // jQuery selectors are powerful and often can combine the querySelector logic
  const $scrapTab = $('[role="scrap"]');       // Parent li/div for the tab
  const $manualTab = $('[role="manual"]');     // Parent li/div for the tab
  const $scrapTabLink = $scrapTab.find('a');   // The actual link inside the tab
  const $manualTabLink = $manualTab.find('a'); // The actual link inside the tab
  
  const $scrapForm = $('#scrap-form');
  const $manualForm = $('#manual-form');

  // --- Initial State ---
  // Ensure scrap form is visible and manual is hidden on page load
  // Use .show() and .hide() for visibility, which maps to style.display = 'block'/'none'
  $scrapForm.show();
  $manualForm.hide();
  // Ensure the scrap tab is active on load
  $scrapTab.addClass('active');
  $manualTab.removeClass('active');

  // --- Event Handlers ---
  
  // Add click event listener to the scrap tab link
  $scrapTabLink.on('click', function(event) {
    event.preventDefault(); // Prevent the default anchor link behavior

    // Update the active class for styling
    $scrapTab.addClass('active');
    $manualTab.removeClass('active');

    // Show the scrap form and hide the manual form
    $scrapForm.show();
    $manualForm.hide();
  });

  // Add click event listener to the manual tab link
  $manualTabLink.on('click', function(event) {
    event.preventDefault(); // Prevent the default anchor link behavior

    // Update the active class for styling
    $manualTab.addClass('active');
    $scrapTab.removeClass('active');

    // Show the manual form and hide the scrap form
    $manualForm.show();
    $scrapForm.hide();
  });
});
