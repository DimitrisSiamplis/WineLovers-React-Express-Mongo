export function dateFormater(date) {
  var dateStr =
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("00" + date.getDate()).slice(-2) +
    "/" +
    date.getFullYear() +
    "-" +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2);
  return dateStr;
}

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function differenceInDays(date) {
  var date1 = new Date(date);
  var date2 = new Date();
  var Difference_In_Time = date2.getTime() - date1.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return Math.round(Difference_In_Days);
}

export function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function diffInHoursFunc(date) {
  var diff = new Date().valueOf() - new Date(date).valueOf();
  var diffInHours = diff / 1000 / 60 / 60;
  return Math.round(diffInHours);
}

export function diffInMinutesFunc(date) {
  var diff = new Date().valueOf() - new Date(date).valueOf();
  var diffInHours = diff / 1000 / 60 ;
  return Math.round(diffInHours);
}

export function diffInSecFunc(date) {
  var diff = new Date().valueOf() - new Date(date).valueOf();
  var diffInHours = diff / 1000  ;
  return Math.round(diffInHours);
}