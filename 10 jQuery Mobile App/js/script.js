$(document).one('pageinit', function() {
  // Display runs
  showRuns();

  // Add Handler
  $('#submitAdd').on('tap', addRun);

  // Edit Handler
  $('#submitEdit').on('tap', editRun);

  // Delete Handler
  $('#stats').on('tap', '#deleteLink', deleteRun);

  // Set Current Handler
  $('#stats').on('tap', '#editLink', setCurrent);

  // Clear Handler
	$('#clearRuns').on('tap', clearRuns);

  /**
   * Show all runs on homepage
   */
  function showRuns() {
    // get runs object
    let runs = getRunsObject();

    // Check if empty
    if (runs != '' && runs != null) {
      for (let i = 0; i < runs.length; i++) {
        $('#stats').append(`<li class="ui-body-inherit ui-li-static"><strong>Date: </strong>${runs[i]['date']}<br><strong>Distance: </strong>${runs[i]['miles']}m<div class="controls"><a href="#edit" id="editLink" data-miles="${runs[i]['miles']}" data-date="${runs[i]['date']}">Edit</a> | <a href="#" id="deleteLink" data-miles="${runs[i]['miles']}" data-date="${runs[i]['date']}" onclick="return confirm('Are You Sure?')">Delete</a></div></li>`);
      }
      $('#home').bind('pageinit', function() {
        $('#stats').listview('refresh');
      });
    } else {
      $('#stats').html('<p>You have no logged runs.</p>');
    }
  }

  /**
   * Add run
   */
  function addRun() {
    // Get form values
    let miles = $('#addMiles').val();
    let date = $('#addDate').val();

    // Create 'run' object
    let run = {
      date: date,
      miles: parseFloat(miles),
    };

    let runs = getRunsObject();

    // Add run to runs array
    runs.push(run);

    alert('Run Added');

    // Set stringified object to localStorage
    localStorage.setItem('runs', JSON.stringify(runs));

    // Redirect
    window.location.href = 'index.html';

    return false;
  }

  /**
   * Edit run
   */
  function editRun() {
    // Get current data
    currentMiles = localStorage.getItem('currentMiles');
    currentDate = localStorage.getItem('currentDate');

    // Get form values
    let miles = $('#editMiles').val();
    let date = $('#editDate').val();

    let runs = getRunsObject();

    // Loop through runs
    for (let i = 0; i < runs.length; i++) {
      if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
        runs.splice(i, 1);
      }
      localStorage.setItem('runs', JSON.stringify(runs));
    }

    // Create 'run' object
    let update_run = {
      date: date,
      miles: parseFloat(miles),
    };

    // Add run to runs array
    runs.push(update_run);

    alert('Run Added');

    // Set stringified object to localStorage
    localStorage.setItem('runs', JSON.stringify(runs));

    // Redirect
    window.location.href = 'index.html';

    return false;
  }

  /**
   * Clear run
   */
  function clearRuns() {
    localStorage.removeItem('runs');
		$('#stats').html('<p>You have no logged runs</p>');
  }

  /**
   * Delete run
   */
  function deleteRun() {
    // Set ls items
    localStorage.setItem('currentMiles', $(this).data('miles'));
    localStorage.setItem('currentDate', $(this).data('date'));

    // Get current data
    currentMiles = localStorage.getItem('currentMiles');
    currentDate = localStorage.getItem('currentDate');

    // Get form values
    let miles = $('#editMiles').val();
    let date = $('#editDate').val();

    let runs = getRunsObject();

    // Loop through runs
    for (let i = 0; i < runs.length; i++) {
      if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
        runs.splice(i, 1);
      }
      localStorage.setItem('runs', JSON.stringify(runs));
    }

    alert('Run Deleted');

    // Redirect
    window.location.href = 'index.html';

    return false;
  }

  /**
   * Get the run object
   */
  function getRunsObject() {
    // Declare runs array
    let runs = new Array();
    // Get current runs from localStorage
    let currentRuns = localStorage.getItem('runs');

    // Check localStorage
    if (currentRuns != null) {
      // Set to runs
      runs = JSON.parse(currentRuns);
    }

    // Return sorted runs object
    return runs.sort(function(a, b) { return new Date(b.date) - new Date(a.date) });
  }

  /**
   * Set the current clicked miles and date
   */
  function setCurrent() {
    // Set ls items
    localStorage.setItem('currentMiles', $(this).data('miles'));
    localStorage.setItem('currentDate', $(this).data('date'));

    // Insert form fields
    $('#editMiles').val(localStorage.getItem('currentMiles'));
    $('#editDate').val(localStorage.getItem('currentDate'));
  }
});