function submitAnswers() {
  let total = 5;
  let score = 0;

  // Get User Input
  let q1 = document.forms['quizForm']['q1'].value;
  let q2 = document.forms['quizForm']['q2'].value;
  let q3 = document.forms['quizForm']['q3'].value;
  let q4 = document.forms['quizForm']['q4'].value;
  let q5 = document.forms['quizForm']['q5'].value;

  // Validation
  for (i = 1; i <= total; i++) {
    if (eval('q' + i) === null || eval('q' + i) === '') {
      alert('You missed question ' + i);
      return false;
    }
  }

  // Set Correct Answers
  let answers = ["b", "a", "d", "b", "d"];

  // Check Answers
  for (i = 1; i <= total; i++) {
    if (eval('q' + i) === answers[i - 1]) {
      score++;
    }
  }

  //Display Results
  let results = document.getElementById('results');
  results.innerHTML = '<h3>You scored <span>'+ score +'</span> out of <span>' + total + '</span></h3>';
  alert('You scored ' + score + ' out of ' + total);

  return false;
}