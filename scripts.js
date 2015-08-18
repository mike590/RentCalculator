var rooms = {}, rent = 2500, rentEl, roomCount, roomCountEl, personCount, slider, roomPercentage, roomsDisplay, totalRoomCost, perPersonCost, perRoomCost, roomPercent, personPercent, roomCost, personCost;

window.onload = function(){
  rentEl = document.querySelector("#rent");
  roomsDisplay = document.querySelector("#rooms_display");
  roomCountEl = document.querySelector("#room_count");
  slider = document.querySelector("#split");
  roomCost = document.querySelector("#roomCost");
  personCost = document.querySelector("#personCost");
  roomPercent = document.querySelector("#roomPercent");
  personPercent = document.querySelector("#personPercent");
  roomCount = parseInt(roomCountEl.value);
  roomCostPercentage = parseInt(slider.value)/100;
  totalRoomCost = rent * roomCostPercentage;
  perRoomCost = totalRoomCost/roomCount;
  perPersonCost = rent - totalRoomCost;
  drawRooms(roomCount);

  roomCountEl.addEventListener("change", function(e){
    roomCount = parseInt(roomCountEl.value);
    drawRooms(roomCount);
  });

  rentEl.addEventListener("change", function(e){
    // change to keyDown or something and setTimeout here so it waits 1-2 seconds after changing
    rent = parseInt(rentEl.value);
    totalRoomCost = rent * roomCostPercentage;

    drawRooms(roomCount);
  });

  slider.addEventListener("change", function(e){
    // change to keyDown or something and setTimeout here so it waits 1-2 seconds after changing
    roomCostPercentage = parseInt(slider.value)/100;
    totalRoomCost = rent * roomCostPercentage;
    roomPercent.textContent = "%" + (roomCostPercentage*100).toFixed(2);
    roomCost.textContent = "$" + totalRoomCost.toFixed(2);
    personPercent.textContent = "%" + (100 - roomCostPercentage*100).toFixed(2);
    personCost.textContent = "$" + (rent - totalRoomCost).toFixed(2); 

    drawRooms(roomCount);
  });  

}

function drawRooms(count){
  var totalPeople = 0;
  perRoomCost = totalRoomCost/roomCount;
  // if roomCount selected is less than previous roomCount, remove excess rooms from rooms 
  // object, and excess room elements
  for(var room in rooms){
    if(room > count-1){
      delete rooms[room];
      roomsDisplay.children[roomsDisplay.children.length - 1].remove();
    }
  }
  // Add up total occupancy, create new rooms (elements and in rooms object)
  // if rooms have been added
  for(var i=0; i<count; i++){
    if(!rooms.hasOwnProperty(i)){
      rooms[i] = {occupancy: 1};
      totalPeople++;
      // create div to hold info
      var div = document.createElement("div");
      div.className = "room";
      // create number input element with event listener to change occupancy for the room
      var occ = document.createElement("input");
      occ.id = i;
      occ.type = "number";
      occ.value = 1;
      occ.min = 1;
      occ.max = 3;
      occ.addEventListener("change", function(e){
        rooms[parseInt(this.id)]["occupancy"] = parseInt(this.value);

        drawRooms(roomCount);
      });
      div.appendChild(occ);
      // add it to the page
      roomsDisplay.appendChild(div);

    } else{
      totalPeople = totalPeople + rooms[i]["occupancy"];
    }
  }

  perPersonCost = (rent - totalRoomCost)/totalPeople;

  // remove all personCost/roomCost/totalCost elements in text part
  var removeEls = document.querySelectorAll(".personCost");
  while(removeEls[0]){
    removeEls[0].remove();
    var removeEls = document.querySelectorAll(".personCost");
  }
  removeEls = document.querySelectorAll(".roomCost");
  while(removeEls[0]){
    removeEls[0].remove();
    var removeEls = document.querySelectorAll(".roomCost");
  }
  removeEls = document.querySelectorAll(".totalCost");
  while(removeEls[0]){
    removeEls[0].remove();
    var removeEls = document.querySelectorAll(".totalCost");
  }
  // iterate over rooms, correcting amount of person elements and adding total costs
  for(var room in rooms){
    
    // animate bars
    // var roomGroup = document.querySelector("#room" + (parseInt(room)+1);
    // var roomSVG = roomGroup.querySelector;
    // var people = rooms[room]["occupancy"];
    // for(var i=1; i<people+1; i++){
    //   var person
    // }

    // text stuff
    var div = roomsDisplay.children[room];
    // add the correct amount of personCost elements
    for(var i = 0; i < rooms[room]["occupancy"]; i++){
      var p1 = document.createElement("p");
      p1.className = "personCost";
      p1.textContent = "One Person: $" + perPersonCost.toFixed(2);
      div.appendChild(p1);
    }
    // create room cost element
    var p2 = document.createElement("p");
    p2.className = "roomCost";
    p2.textContent = "One Room: $" + perRoomCost.toFixed(2);
    div.appendChild(p2);
    // create total cost element
    var p3 = document.createElement("p");
    p3.className = "totalCost";
    p3.textContent = "Total Cost: $" + (perRoomCost + perPersonCost * rooms[room]["occupancy"]).toFixed(2);
    div.appendChild(p3);



  }
}
// turn these three parameters to arrays, and accept the values for ell the Els being changed
function transform(el, hFinal, yFinal){
  var h = parseInt(el.getAttribute("height"));
  var hDelta = hFinal - h;
  // increment is found by dividing delta by frames/run throughs. for 1/3 second: 
  // interval repeats every 16 milliseconds for 60 fps/run throughs
  // 60/hDelta = 1 second, so 20/hDelta = 1/3 second
  var hIncr = hDelta/20;
  var y = parseInt(el.getAttribute("y"));
  var yDelta = yFinal - y;
  var yIncr = yDelta/20;
  var counter = 0;
  
  var i = setInterval(function(){
    if(counter===20){
      clearInterval(i);
    } else{
      el.setAttribute("height", (h+hIncr));
      el.setAttribute("y", (y+yIncr));
      h = h + hIncr;
      y = y + yIncr;
      counter++
      console.log(hIncr);
    }  
  }, 16);

}



