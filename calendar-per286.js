const monthsByLang = {
  'en' : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  'es' : ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
};

const daysByLang = {
  'en' : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  'es' : ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
};

const calendar = document.querySelector("#calendar-per286");

function createCalendar(lang = "es", firstDay = "Monday"){
  
  // HEADER: 
  
  let header = document.createElement("div");
      header.clasList.add("calendar_header fs-3 d-flex align-items-center justify-content-center text-center p-2 bg-primary text-white rounded-top");
  calendar.appendChild(header);
  
  let btnPrevMonth = document.createElement("div");
      btnPrevMonth.id = "btnPrevMonth";
      btnPrevMonth.classList.add("col-2 btn");
      btnPrevMonth.innerHTML = "<i class="bi bi-chevron-left"></i>";
  header.appendChild(btnPrevMonth);
  
  let lblMonth = document.createElement("div");
      lblMonth.id = "lblMonth";
      lblMonth.classList.add("col-4");
  header.appendChild(lblMonth);
  
  let lblYear = document.createElement("div");
      lblYear.id = "lblYear";
      lblYear.classList.add("col-3");
  header.appendChild(lblYear);  
  
  let btnNextMonth = document.createElement("div");
      btnNextMonth.id = "btnPrevMonth";
      btnNextMonth.classList.add("col-2 btn");
      btnNextMonth.innerHTML = "<i class="bi bi-chevron-right"></i>";
  header.appendChild(btnNextMonth);
  
  // WEEK:
  
  let week = document.createElement("div");
      week.classList.add("calendar_week fs-5 bg-primary text-white text-center");
  calendar.appendChild(week);
  
  let months = monthsByLang[lang];
  let days = daysByLang[lang];
  
  let index = days.findIndex(day => day === firstDay);
  for(let i = index; i < (days.length + index); i++){
    j = i > 6 ? i - 7 : i;
    let dayy = document.createElement("div");
        dayy.innerHtml = days[j].substring(0,3) + "<span class='d-none d-xl-inline'>" + days[j].substring(3) + "</span>";
    week.appendChild(dayy);    
  }
  
  // BODY:
  
  let calendarBody = document.createElement("div");
      calendarBody.classList.add("calendar_body text-center");
      calendarBody.id = "calendar-body";
  calendar.appendChild(calendarBody);
  
  // FILL:
  
  let today = new Date();
  let day = today.getDate();
  let actualDay = today.getDate();
  let month = today.getMonth();
  let actualMonth = today.getMonth();
  let year = today.getYear();
  let actualYear = today.getYear();
  
  lblMonth.innerHTML = months[month];
  lblYear.innerHTML = year;
  
  btnPrevMonth.addEventListener("click", prevMonth);
  btnNextMonth.addEventListener("click", nextMonth);
  
  writeBody(month);
}

function writeBody(month){
  let count = 0;

  for(let i = dayOne(); i > 0 ; i--){
    let day = (diasTotalesMes(month-1) - (i - 1));
    calendarBody.innerHTML += '<div id="' + day + '/' + (month == 0 ? 12 + '/' + (year - 1) : month + '/' + year) + 
      '" class="day p-2 text-secondary text-muted d-flex flex-column fs-5">' + day + 
      '<div class="reservationIco text-white"><i class="bi bi-circle-fill"></i></div></div>';
    count++;
  }

  for(let day = 1; day<=totalDaysMonth(month);day++){
    if (day == diaActual && month == mesActual && anyo == anyoActual){
      calendarBody.innerHTML += '<div id="' + day + '/' + (month+1) + '/' + year + 
        '" class="day month_day p-2 d-flex flex-column fs-5 text-primary fw-bold">'+ day + 
        '<div class="reservationIco text-white"><i class="bi bi-circle-fill"></i></div></div>';
    } else {
      calendarBody.innerHTML += '<div id="' + day + '/' + (month+1) + '/' + year + '" class="day month_day p-2 d-flex flex-column fs-5">'+ day + 
        '<div class="reservationIco text-white"><i class="bi bi-circle-fill"></i></div></div>';
    }
    count++;
  }

  if(count%7 != 0){
    for(let day = 1; day <= 7 - (contador%7); day++){
      calendarBody.innerHTML += '<div id="' + day + '/' + ((month+2) == 13 ? 1 + '/' + (year + 1) : (month + 2 + '/' + year)) + 
        '" class="day p-2 text-secondary text-muted d-flex flex-column fs-5">' + day + 
        '<div class="reservationIco text-white"><i class="bi bi-circle-fill"></i></div></div>';
    }
  }
}

function totalDaysMonth(month){
  if(month == -1) month = 11;

  if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11){
    return 31;
  } else if (month == 3 || month == 5 || month == 8 || month == 10){
    return 30;
  } else if(month == 1){
    return isLeap() ? 29 : 28;
  }
}

function isLeap(){
  return ((year % 100 != 0 && year % 4 == 0) || year % 400 == 0);
}

function dayOne(){
  let dayOne = new Date(year, month, 1);
  return (dayOne.getDay() - 1) == -1 ? 6 : dayOne.getDay() - 1;
}

function prevMonth(){
  if(month != 0){
    month--;
  } else {
    month = 11;
    year--;
  }

  setNewDate();
}

function nextMonth(){
  if(month != 11){
    month++;
  } else {
    month = 0;
    year++;
  }

  setNewDate();
}

function setNewDate(){
  today.setFullYear(year, month, day);
  lblMonth.innerHTML = months[month];
  lblYear.innerHTML = year;
  body.innerHTML = "";
  writeBody(month);
}
