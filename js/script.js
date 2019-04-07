let events = {
  myEvents: [],
  writeEvent(day, month, year, event, eventSpace) {
    if (eventSpace.value != "") {
      let data = {
        day: parseInt(day, 10),
        event: event,
        month: month,
        year: parseInt(year, 10)
      };
      let needPush = true;
      this.myEvents.forEach(item => {
        if (item.day == day) {
          this.myEvents[this.myEvents.indexOf(item)] = data;
          needPush = false;
        }
      });
      if (needPush) this.myEvents.push(data);
      ui.eventdayColor(1, eventSpace);
    } else {
      ui.eventdayColor(0, eventSpace);
    }
  },
  displayEvents() {
    let str = "";
    this.myEvents.forEach(item => {
      str +=
        Object.values(item)
          .toString()
          .replace(/,/g, " ") + "<br>";
    });
    return str;
  }
};

class Month {
  constructor(year, month, days, emtpyDays) {
    this.year = year;
    this.month = month;
    this.days = days;
    this.emtpyDays = emtpyDays;
    this.calendarSheet = document.createElement("div");
    this.monthHeader = document.createElement("div");
    this.daysSheet = document.createElement("div");
  }
  popupHide() {
    let popups = document.querySelectorAll(".popup");
    popups.forEach(item => {
      if (item.style.display == "block") {
        item.style.display = "none";
      }
    });
    // console.log(popups)
  }
  createEmtpyDays(place) {
    let emptDay = document.createElement("div");
    emptDay.classList.add("emptyday");
    return place.appendChild(emptDay);
  }
  createDay(place, number) {
    let daybox = document.createElement("div");
    daybox.classList.add("day");
    daybox.innerText = number;
    this.appendPopup(daybox);
    return place.appendChild(daybox);
  }
  renderEmtpyDays() {
    for (let i = 0; i < this.emtpyDays; i++) {
      this.createEmtpyDays(this.daysSheet);
    }
  }
  appendPopup(place) {
    let popup = document.createElement("div");
    let eventSpace = document.createElement("textarea");
    let saveEvent = document.createElement("a");
    saveEvent.innerHTML = "SAVE";
    saveEvent.classList.add("savebtn");
    popup.classList.add("popup");
    popup.appendChild(eventSpace);
    popup.appendChild(saveEvent);
    place.addEventListener("click", () => {
      this.popupHide();
      popup.style.display = "block";
    });
    saveEvent.addEventListener("click", e => {
      e.stopPropagation();
      this.popupHide();
      events.writeEvent(
        place.innerText,
        this.month,
        this.year,
        eventSpace.value,
        eventSpace
      );
    });
    return place.appendChild(popup);
  }
  renderDays() {
    let daybox = document.createElement("div");
    daybox.classList.add("day");
    this.renderEmtpyDays();
    for (let i = 0; i < this.days; i++) {
      this.createDay(this.daysSheet, i + 1);
    }
  }
  appendMonth() {
    this.renderDays();
    this.daysSheet.classList.add("month", this.month);
    this.calendarSheet.classList.add("Monthsheet");
    this.monthHeader.classList.add("monthheader");
    this.monthHeader.innerHTML = this.month;
    this.calendarSheet.appendChild(this.monthHeader);
    this.calendarSheet.appendChild(this.daysSheet);
    let slider = document.querySelector(".mSlider");
    slider.appendChild(this.calendarSheet);
  }
}
let ui = {
  sidebar: document.querySelector(".sidebar"),
  logobutton: document.querySelector("h1"),
  eventshow: document.querySelector(".eventshow"),
  sidebarShow() {
    if (parseInt(this.sidebar.style.left, 10) === -170) {
      this.sidebar.style.left = "0px";
      this.logobutton.innerHTML = "DATENOTE.IO";
      this.logobutton.style.marginRight = "10px";
      this.eventshow.style.display = "block";
      this.eventshow.innerHTML = events.displayEvents();
    } else {
      this.sidebar.style.left = "-170px";
      this.logobutton.innerHTML = "DN";
      this.logobutton.style.marginRight = "0px";
      this.eventshow.style.display = "none";
    }
  },
  eventdayColor(num, child) {
    if (num == 1) {
      child.parentNode.parentNode.style.backgroundColor = "lightgreen";
      child.parentNode.parentNode.style.color = "white";
    } else {
      child.parentNode.parentNode.style.backgroundColor = "aliceblue";
      child.parentNode.parentNode.style.color = "black";
    }
  }
};
// indian roots

const jan = new Month(2018, "January", 31, 5);

jan.appendMonth();

const feb = new Month(2018, "February", 28, 2);

feb.appendMonth();
const mar = new Month(2018, "March", 31, 4);

mar.appendMonth();
const apr = new Month(2018, "April", 30, 3);

apr.appendMonth();
const may = new Month(2018, "May", 31, 5);

may.appendMonth();
const jun = new Month(2018, "June", 30, 6);

jun.appendMonth();
const jul = new Month(2018, "July", 31, 4);

jul.appendMonth();
const aug = new Month(2018, "August", 31, 2);

aug.appendMonth();
const sep = new Month(2018, "September", 30, 5);

sep.appendMonth();
const oct = new Month(2018, "October", 31, 3);

oct.appendMonth();
const now = new Month(2018, "November", 30, 1);

now.appendMonth();
const dec = new Month(2018, "December", 31, 4);

dec.appendMonth();

ui.logobutton.addEventListener("click", () => {
  ui.sidebarShow();
});
