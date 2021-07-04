exports.answerGenerator = function (data) {
  let result = { answer: [] };
  for (let i = 0; i < data.length; i++) {
    switch (data[i].answer.length) {
      case 2:
        if (data[i].answer[0][1] == true) {
          Array.prototype.push.apply(result.answer, ["A"]);
        } else if (data[i].answer[1][1] == true) {
          Array.prototype.push.apply(result.answer, ["B"]);
        }
        break;
      case 3:
        if (data[i].answer[0][1] == true) {
          Array.prototype.push.apply(result.answer, ["A"]);
        } else if (data[i].answer[1][1] == true) {
          Array.prototype.push.apply(result.answer, ["B"]);
        } else if (data[i].answer[2][1] == true) {
          Array.prototype.push.apply(result.answer, ["C"]);
        }
        break;
      case 4:
        if (data[i].answer[0][1] == true) {
          Array.prototype.push.apply(result.answer, ["A"]);
        } else if (data[i].answer[1][1] == true) {
          Array.prototype.push.apply(result.answer, ["B"]);
        } else if (data[i].answer[2][1] == true) {
          Array.prototype.push.apply(result.answer, ["C"]);
        } else if (data[i].answer[3][1] == true) {
          Array.prototype.push.apply(result.answer, ["D"]);
        }
    }
  }

  return result;
};
