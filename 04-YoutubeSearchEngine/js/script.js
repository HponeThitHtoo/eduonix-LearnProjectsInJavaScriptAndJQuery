// Searchbar Handler
$(function () {
  let searchField = $("#query");
  let icon = $("#search-btn");

  // Focus Event Handler
  $(searchField).on("click", function () {
    $(this).animate(
      {
        width: "100%",
      },
      400
    );

    $(icon).animate(
      {
        right: "10px",
      },
      400
    );
  });

  // Blur Event Handler
  $(searchField).on("blur", function () {
    if (searchField.val() == "") {
      $(searchField).animate(
        {
          width: "45%",
        },
        400
      );
      $(icon).animate(
        {
          right: "360px",
        },
        400
      );
    }
  });

  $("#search-form").submit(function (e) {
    e.preventDefault();
  });
});

function search() {
  // Clear Results
  $("#results").html("");
  $("#buttons").html("");

  // Get Form Input
  let q = $("#query").val();

  // Run GET Request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      part: "snippet, id",
      q: q,
      type: "video",
      key: "",
    },
    function (data) {
      let nextPageToken = data.nextPageToken;
      let prevPageToken = data.prevPageToken;

      // Log Data
      console.log(data);

      $.each(data.items, function (i, item) {
        // Get Output
        let output = getOutput(item);

        // Display Results
        $("#results").append(output);
      });

      let buttons = getButtons(prevPageToken, nextPageToken, q);

      // Display Buttons
      $("#buttons").append(buttons);
    }
  );
}

// Next Page Function
function nextPage() {
  let token = $("#next-button").data("token");
  let q = $("#next-button").data("query");

  // Clear Results
  $("#results").html("");
  $("#buttons").html("");

  // Get Form Input
  // let q = $('#query').val();

  // Run GET Request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      part: "snippet, id",
      q: q,
      pageToken: token,
      type: "video",
      key: "",
    },
    function (data) {
      let nextPageToken = data.nextPageToken;
      let prevPageToken = data.prevPageToken;

      // Log Data
      console.log(data);

      $.each(data.items, function (i, item) {
        // Get Output
        let output = getOutput(item);

        // Display Results
        $("#results").append(output);
      });

      let buttons = getButtons(prevPageToken, nextPageToken, q);

      // Display Buttons
      $("#buttons").append(buttons);
    }
  );
}

// Prev Page Function
function prevPage() {
  let token = $("#prev-button").data("token");
  let q = $("#prev-button").data("query");

  // Clear Results
  $("#results").html("");
  $("#buttons").html("");

  // Get Form Input
  // let q = $('#query').val();

  // Run GET Request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      part: "snippet, id",
      q: q,
      pageToken: token,
      type: "video",
      key: "AIzaSyCHNgxbUjKcRkLbU8UE_rE6BP5i4TrMbec",
    },
    function (data) {
      let nextPageToken = data.nextPageToken;
      let prevPageToken = data.prevPageToken;

      // Log Data
      console.log(data);

      $.each(data.items, function (i, item) {
        // Get Output
        let output = getOutput(item);

        // Display Results
        $("#results").append(output);
      });

      let buttons = getButtons(prevPageToken, nextPageToken, q);

      // Display Buttons
      $("#buttons").append(buttons);
    }
  );
}

// Build Output
function getOutput(item) {
  let videoId = item.id.videoId;
  let title = item.snippet.title;
  let description = item.snippet.description;
  let thumb = item.snippet.thumbnails.high.url;
  let channelTitle = item.snippet.channelTitle;
  let videoDate = item.snippet.publishedAt;

  // Build Output String
  let output = `
    <li>
      <div class="list-left">
        <img src="${thumb}">
      </div>
      <div class="list-right">
        <h3><a data-fancybox href="http://www.youtube.com/embed/${videoId}">${title}</a></h3>
        <small>By <span class="cTitle">${channelTitle}</span> on ${videoDate}</small>
        <p>${description}</p>
      </div>
    </li>
    <div class="clearfix"></div>
  `;

  return output;
}

// Build the buttons
function getButtons(prevPageToken, nextPageToken, q) {
  let btnOutput;
  if (!prevPageToken) {
    btnOutput = `
      <div class="button-container">
        <button id="next-button" class="paging-button" data-token="${nextPageToken}" data-query="${q}" onclick="nextPage();">Next Page</button>
      </div>
    `;
  } else {
    btnOutput = `
      <div class="button-container">
        <button id="prev-button" class="paging-button" data-token="${prevPageToken}" data-query="${q}" onclick="prevPage();">Prev Page</button>
        <button id="next-button" class="paging-button" data-token="${nextPageToken}" data-query="${q}" onclick="nextPage();">Next Page</button>
      </div>
    `;
  }
  return btnOutput;
}
