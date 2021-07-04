const axios = require("axios");
const url =
  "https://webhooks.mongodb-realm.com/api/client/v2.0/app/thigplx-ofrhb/service/thiGPLXapi/incoming_webhook/questionAPI";
const generator = require("./testGenerator");
const heapSort = require("./heapSort");
const ansGenerator = require("./answerGenerator").answerGenerator;

exports.getQuestionByType = function (response, license, type) {
  var data = [];

  const source = [];
  switch (type) {
    case "Tạo đề":
      Array.prototype.push.apply(source, [
        axios.get(encodeURI(url + "?type=Khái niệm")),
        axios.get(encodeURI(url + "?type=Quy tắc")),
        axios.get(encodeURI(url + "?type=Tốc độ và khoảng cách")),
        axios.get(encodeURI(url + "?type=Văn hóa và đạo đức")),
        axios.get(encodeURI(url + "?type=Kĩ thuật lái xe")),
        axios.get(encodeURI(url + "?type=Biển báo")),
        axios.get(encodeURI(url + "?type=Sa hình")),
      ]);
      break;
    case "Khái niệm và quy tắc":
      Array.prototype.push.apply(source, [
        axios.get(encodeURI(url + "?type=Khái niệm")),
        axios.get(encodeURI(url + "?type=Quy tắc")),
        axios.get(encodeURI(url + "?type=Tốc độ và khoảng cách")),
      ]);
      break;
    default:
      Array.prototype.push.apply(source, [
        axios.get(encodeURI(url + "?type=" + type)),
      ]);
      break;
  }
  axios
    .all(source)
    .then(
      axios.spread((rep1, rep2, rep3, rep4, rep5, rep6, rep7, rep8) => {
        switch (type) {
          case "Tạo đề":
            generator.testGenerator(
              response,
              license,
              rep1, //Khai niem
              rep2, //Quy tac
              rep3, //Toc do va khoang cach
              rep4, //Van hoa va dao duc
              rep5, //Ki thuat lai xe
              rep6, //Bien bao
              rep7 //Sa hinh
            );
            break;
          case "Khái niệm và quy tắc":
            Array.prototype.push.apply(data, rep1.data);
            Array.prototype.push.apply(data, rep2.data);
            Array.prototype.push.apply(data, rep3.data);
            heapSort.sortByOrder(data);
            data.unshift(ansGenerator(data));
            response.send(data);
            break;
          default:
            Array.prototype.push.apply(data, rep1.data);
            heapSort.sortByOrder(data);
            data.unshift(ansGenerator(data));
            response.send(data);
            break;
          // code block
        }
      })
    )
    .catch((error) => {
      console.log(error);
    });
};
